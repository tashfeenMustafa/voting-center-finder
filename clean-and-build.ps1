# Clean and Build Script for Election Finder
# Run this script to clean the out directory and rebuild

Write-Host "Cleaning build directory..." -ForegroundColor Yellow

# Try multiple methods to remove the out directory
$outPath = Join-Path $PSScriptRoot "out"

if (Test-Path $outPath) {
    Write-Host "Attempting to remove out directory..." -ForegroundColor Yellow
    
    # Method 1: Standard removal
    Remove-Item -Path $outPath -Recurse -Force -ErrorAction SilentlyContinue
    
    # Method 2: If still exists, try with robocopy
    if (Test-Path $outPath) {
        Write-Host "Trying alternative cleanup method..." -ForegroundColor Yellow
        $tempDir = Join-Path $env:TEMP "empty-temp-$(Get-Random)"
        New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
        robocopy $tempDir $outPath /MIR /R:0 /W:0 /NFL /NDL /NJH /NJS 2>&1 | Out-Null
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item -Path $outPath -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    # Check if still exists
    if (Test-Path $outPath) {
        Write-Host "WARNING: Could not remove out directory. It may be locked by:" -ForegroundColor Red
        Write-Host "  - File Explorer window" -ForegroundColor Red
        Write-Host "  - VS Code or another editor" -ForegroundColor Red
        Write-Host "  - Antivirus software" -ForegroundColor Red
        Write-Host "  - Windows Search Indexer" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please:" -ForegroundColor Yellow
        Write-Host "  1. Close all File Explorer windows" -ForegroundColor Yellow
        Write-Host "  2. Close VS Code if open" -ForegroundColor Yellow
        Write-Host "  3. Wait 10-20 seconds" -ForegroundColor Yellow
        Write-Host "  4. Run this script again" -ForegroundColor Yellow
        Write-Host ""
        $continue = Read-Host "Continue with build anyway? (y/n)"
        if ($continue -ne "y") {
            exit 1
        }
    } else {
        Write-Host "Successfully removed out directory!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Building static files..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Build completed successfully! Static files are in the 'out' directory." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Build failed. If you got an EBUSY error, follow the steps above." -ForegroundColor Red
}


