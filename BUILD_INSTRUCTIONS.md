# Building Static Files - Step by Step Guide

## Problem
If you encounter `EBUSY: resource busy or locked` error, the `out` directory is locked by another process.

## Solution Steps

### Step 1: Close Processes Locking the Directory
1. **Close File Explorer windows** that might be open in the `out` directory
2. **Close any code editors** (VS Code, etc.) that might have the `out` folder open
3. **Wait a few seconds** for antivirus scans to complete (if running)
4. **Close any terminal windows** that might be accessing files in `out`

### Step 2: Manually Delete the `out` Directory (if needed)
If the directory is still locked, try one of these methods:

**Option A: Using PowerShell (Recommended)**
```powershell
# Navigate to the project directory
cd "E:\Work\Election Commission App\Code\election-finder"

# Remove the out directory (use quotes for paths with spaces)
Remove-Item -Path ".\out" -Recurse -Force -ErrorAction SilentlyContinue
```

**Option B: Using File Explorer**
1. Open File Explorer
2. Navigate to `E:\Work\Election Commission App\Code\election-finder`
3. If you see the `out` folder, try to delete it manually
4. If it says "file is in use", close all programs and try again

**Option C: Restart if necessary**
- If nothing works, restart your computer (this will release all file locks)

### Step 3: Build the Static Files
Once the `out` directory is unlocked or deleted:

```powershell
# Make sure you're in the project directory
cd "E:\Work\Election Commission App\Code\election-finder"

# Run the build command
npm run build
```

### Step 4: Verify the Build
After the build completes successfully:
1. Check that the `out` directory was created
2. The static HTML files should be in the `out` folder
3. You can open `out/index.html` in a browser to test

## Quick Reference Commands

```powershell
# Navigate to project
cd "E:\Work\Election Commission App\Code\election-finder"

# Clean and rebuild (one-liner)
Remove-Item -Path ".\out" -Recurse -Force -ErrorAction SilentlyContinue; npm run build

# Or just build (Next.js will handle cleanup if possible)
npm run build
```

## After Making Code Changes

1. **Make your code changes** in the source files
2. **Run the build command**: `npm run build`
3. **If you get the EBUSY error**, follow Steps 1-2 above to unlock/delete the `out` directory
4. **Run the build again**: `npm run build`

## Troubleshooting

- **Still getting EBUSY error?** 
  - Check Task Manager for any Node.js processes and end them
  - Close all VS Code windows
  - Restart your terminal/PowerShell
  
- **Build succeeds but files are old?**
  - Make sure you saved all your changes
  - Delete the `out` folder and rebuild
  
- **Want to preview the static site?**
  - You can use a simple HTTP server: `npx serve out`
  - Or open `out/index.html` directly in a browser


