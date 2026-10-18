@echo off
echo ===================================================
echo   OSAKA VOICEBRIDGE AI - Impact Osaka Hackathon 2026
echo   "One city. Every language. No one left behind."
echo ===================================================
echo.
echo [1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "Osaka VoiceBridge - Backend" cmd /k "cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting React + Vite Frontend on http://localhost:5173 ...
start "Osaka VoiceBridge - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers launched successfully!
echo Open your browser to: http://localhost:5173
echo.
pause
