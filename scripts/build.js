const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, 'out');

console.log('🔨 Starting build process...\n');

// Aggressive cleanup with multiple strategies
function cleanupOutDirectory() {
  if (!fs.existsSync(outDir)) {
    return true; // Already clean
  }

  console.log('📁 Cleaning existing out directory...');
  
  // Strategy 1: Direct deletion with retries
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 2 });
      console.log('✅ Successfully removed out directory\n');
      return true;
    } catch (error) {
      if (attempt < 5) {
        const waitTime = attempt * 200; // Increasing wait time
        console.log(`⏳ Attempt ${attempt} failed, waiting ${waitTime}ms before retry...`);
        // Simple synchronous wait
        const start = Date.now();
        while (Date.now() - start < waitTime) {}
      } else {
        // Strategy 2: Try renaming
        if (error.code === 'EBUSY' || error.code === 'EPERM') {
          console.log('⚠️  Trying to rename locked directory...');
          const timestamp = Date.now();
          const backupDir = path.join(projectRoot, `out.backup.${timestamp}`);
          
          try {
            fs.renameSync(outDir, backupDir);
            console.log(`✅ Renamed locked directory to: out.backup.${timestamp}\n`);
            console.log('💡 You can delete the backup later when nothing is using it.\n');
            return true;
          } catch (renameError) {
            console.error('\n❌ Could not clean or rename the out directory.');
            console.error('   It is locked by another process.\n');
            console.error('🔧 Please run this PowerShell command to unlock it:\n');
            console.error(`   Remove-Item -Path "${outDir}" -Recurse -Force\n`);
            console.error('Or manually:');
            console.error('   1. Close all File Explorer windows');
            console.error('   2. Close VS Code');
            console.error('   3. Wait 10 seconds');
            console.error('   4. Run the PowerShell command above\n');
            return false;
          }
        } else {
          console.error(`❌ Error: ${error.message}`);
          return false;
        }
      }
    }
  }
  
  return false;
}

// Clean up the directory
if (!cleanupOutDirectory()) {
  process.exit(1);
}

// Run Next.js build
console.log('🚀 Running Next.js build...\n');
try {
  execSync('next build', { 
    stdio: 'inherit',
    cwd: projectRoot 
  });
  
  // Verify build output
  const indexHtml = path.join(outDir, 'index.html');
  const notFoundHtml = path.join(outDir, '404.html');
  
  if (fs.existsSync(indexHtml)) {
    console.log('\n✅ Build completed successfully!');
    
    // Ensure 404.html exists for proper static hosting
    const notFoundDir = path.join(outDir, '_not-found');
    if (!fs.existsSync(notFoundHtml) && fs.existsSync(notFoundDir)) {
      const notFoundIndex = path.join(notFoundDir, 'index.html');
      if (fs.existsSync(notFoundIndex)) {
        fs.copyFileSync(notFoundIndex, notFoundHtml);
        console.log('✅ Created 404.html for proper error handling');
      }
    }
    
    // Also ensure index.html works at root (some servers need this)
    const indexDir = path.join(outDir, 'index');
    if (fs.existsSync(indexDir)) {
      const indexDirHtml = path.join(indexDir, 'index.html');
      if (fs.existsSync(indexDirHtml) && !fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexDirHtml, indexHtml);
      }
    }
    
    console.log(`📦 Static files are in: ${outDir}`);
    console.log('\n💡 To test locally:');
    console.log('   npm run serve');
    console.log('   Or: cd out && python -m http.server 8080');
  } else {
    console.error('\n❌ Build completed but index.html not found.');
    console.error('   Check the build output above for errors.');
    process.exit(1);
  }
} catch (error) {
  console.error('\n❌ Build failed. See errors above.');
  process.exit(1);
}
