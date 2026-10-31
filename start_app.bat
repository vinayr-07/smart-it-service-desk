@echo off
setlocal enabledelayedexpansion
title Smart IT Service Desk - DBMS Level 3 Runner
color 0B

echo ==============================================================================
echo   PES UNIVERSITY - DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
echo   DBMS Experiential Learning Level 3: Smart IT Service Desk
echo   Team: Vinay R (PES1UG24CS353) & Prateek Hachadad (PES1UG24CS340)
echo ==============================================================================
echo.

:: Ensure we are running from project root directory
cd /d "%~dp0"

:: 1. Check if Node.js is installed
where node >nul 2>&1
if errorlevel 1 (
    color 0C
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js v18 or newer from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: 2. Check if dependencies are installed
if not exist "node_modules\" (
    echo [SETUP] First-time setup detected (node_modules missing).
    echo Installing npm dependencies, please wait...
    call npm install
    if errorlevel 1 (
        color 0C
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
    echo [SETUP] Dependencies installed successfully.
    echo.
)

:: 3. Start Next.js Development Server in background window
echo [1/2] Starting Next.js Server on port 3000 (npm run dev)...
start "Smart Service Desk Server" cmd /k "color 0A && cd /d ""%~dp0"" && npm run dev"

:: 4. Wait for server to boot up
echo [2/2] Waiting for local server to initialize...
timeout /t 5 /nobreak >nul

:: 5. Open Web Application in Default Browser
echo Launching application in browser: http://localhost:3000 ...
start http://localhost:3000

echo.
echo ==============================================================================
echo   Application is now running!
echo   - Web URL:    http://localhost:3000
echo   - Evaluation: http://localhost:3000/db-demo
echo.
echo   NOTE: Keep the 'Smart Service Desk Server' window open while using the app.
echo   You can safely close this launcher window now.
echo ==============================================================================
echo.
pause
