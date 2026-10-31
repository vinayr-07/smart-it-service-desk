@echo off
setlocal
cd /d "%~dp0"

echo ==============================================================================
echo   PES UNIVERSITY - DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
echo   DBMS Experiential Learning Level 3: Smart IT Service Desk
echo   Team: Vinay R (PES1UG24CS353) and Prateek Hachadad (PES1UG24CS340)
echo ==============================================================================
echo.

:: 1. CHECK NODE.JS REQUIREMENT
where node >nul 2>&1
if errorlevel 1 (
    echo [MISSING REQUIREMENT] Node.js is NOT installed or not in PATH!
    echo Node.js is required to run the Next.js web application.
    echo Please download and install Node.js v18 or newer from: https://nodejs.org
    echo After installing, restart this script.
    echo.
    pause
    exit /b 1
)

:: 2. AUTO-INSTALL MISSING NPM PACKAGES
if not exist node_modules (
    echo [SETUP] node_modules not found. Installing dependencies via npm install...
    echo Please wait while packages are installed...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed. Please check your internet connection.
        pause
        exit /b 1
    )
    echo [SETUP] All dependencies installed successfully.
    echo.
)

:: 3. NOTIFY DATABASE MODE
echo [SYSTEM STATUS]
echo - Node.js: OK
echo - Database Engine: Resilient Multi-Model (Live MySQL/Neo4j OR Embedded Engine)
echo.

:: 4. START NEXT.JS APP
echo [1/2] Launching Next.js development server...
start "Smart Service Desk Server" cmd /k "call npm run dev"

echo [2/2] Waiting for server to initialize...
ping 127.0.0.1 -n 6 >nul

echo Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo ==============================================================================
echo   Application started successfully! Local URL: http://localhost:3000
echo   Keep the 'Smart Service Desk Server' window open while using the app.
echo ==============================================================================
echo.
pause
