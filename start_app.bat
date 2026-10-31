@echo off
setlocal
cd /d "%~dp0"

echo ==============================================================================
echo   PES UNIVERSITY - DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
echo   DBMS Experiential Learning Level 3: Smart IT Service Desk
echo   Team: Vinay R (PES1UG24CS353) and Prateek Hachadad (PES1UG24CS340)
echo ==============================================================================
echo.

if not exist node_modules (
    echo [SETUP] Installing dependencies...
    call npm install
)

echo [1/2] Starting Next.js development server...
start "Smart Service Desk Server" cmd /k "call npm run dev"

echo [2/2] Waiting for server to initialize...
ping 127.0.0.1 -n 6 >nul

echo Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo ==============================================================================
echo   Application started! Local URL: http://localhost:3000
echo   Keep the 'Smart Service Desk Server' window open while using the app.
echo ==============================================================================
echo.
pause
