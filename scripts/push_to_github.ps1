# ==============================================================================
# DBMS Level 3: Push Repository to GitHub Helper Script
# Usage: .\scripts\push_to_github.ps1 -RepoUrl "https://github.com/<your-username>/<repo-name>.git"
# ==============================================================================

param (
    [string]$RepoUrl
)

Write-Host "=== PES University DBMS Level 3 - GitHub Remote Setup ===" -ForegroundColor Cyan

if (-not $RepoUrl) {
    $RepoUrl = Read-Host "Enter your GitHub Repository URL (e.g., https://github.com/username/smart-it-service-desk.git)"
}

if (-not $RepoUrl) {
    Write-Host "Error: No repository URL provided. Aborting." -ForegroundColor Red
    exit 1
}

# Check if origin already exists
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    Write-Host "Updating existing origin remote to: $RepoUrl" -ForegroundColor Yellow
    git remote set-url origin $RepoUrl
} else {
    Write-Host "Adding remote origin: $RepoUrl" -ForegroundColor Green
    git remote add origin $RepoUrl
}

# Rename branch to main if needed
git branch -M main

Write-Host "`nPushing main branch to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully pushed to GitHub! Repository is live at: $RepoUrl" -ForegroundColor Green
} else {
    Write-Host "`nPush failed. Please ensure you are authenticated with GitHub and have write permissions." -ForegroundColor Yellow
}

