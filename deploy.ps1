# Get current date in YYYY-MM-DD format
$date = Get-Date -Format "yyyy-MM-dd"
$commitMessage = "production-update-$date"

# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    
    # Git operations
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git add .
    git commit -m $commitMessage
    
    Write-Host "Pushing to repository..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host "Deployment complete!" -ForegroundColor Green
} else {
    Write-Host "Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
} 