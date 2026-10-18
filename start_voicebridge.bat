@echo off
title Osaka VoiceBridge AI Supervisor
cd /d "%~dp0"

echo ======================================================================
echo   OSAKA VOICEBRIDGE AI - Impact Osaka Hackathon 2026
echo   "One city. Every language. No one left behind."
echo ======================================================================
echo.

echo [1/3] Clearing stale processes on ports 8000 and 5173...
powershell -Command "Get-NetTCPConnection -LocalPort 8000,5173 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }" >nul 2>&1

echo [2/3] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "Osaka VoiceBridge - Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

echo [3/3] Starting React Vite Frontend on http://localhost:5173 ...
start "Osaka VoiceBridge - Frontend (Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Waiting 3 seconds for services to initialize...
timeout /t 3 /nobreak >nul

echo Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ======================================================================
echo   OSAKA VOICEBRIDGE AI IS RUNNING LOCALLY!
echo   ------------------------------------------------------------------
echo   Web Application: http://localhost:5173
echo   FastAPI Swagger: http://127.0.0.1:8000/docs
echo   Health Check:    http://127.0.0.1:8000/api/health
echo   Video Asset:     output\OSAKA_VOICEBRIDGE_AI_COMPETITION_VIDEO.mp4
echo ======================================================================
echo.
echo Keep the backend and frontend terminal windows open.
pause
