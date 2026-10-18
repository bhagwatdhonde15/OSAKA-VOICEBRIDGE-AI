# OSAKA VOICEBRIDGE AI - PowerShell Startup Script
# Impact Osaka Hackathon 2026
# "One city. Every language. No one left behind."

Write-Host "===================================================" -ForegroundColor Red
Write-Host "  OSAKA VOICEBRIDGE AI - Impact Osaka Hackathon 2026" -ForegroundColor Yellow
Write-Host "  'One city. Every language. No one left behind.'" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Red
Write-Host ""

$root = $PSScriptRoot

Write-Host "[1/2] Launching Python FastAPI Backend on http://127.0.0.1:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "[2/2] Launching React Vite Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host ""
Write-Host "Services are initializing in separate windows." -ForegroundColor White
Write-Host "Navigate to http://localhost:5173 in your browser to test VoiceBridge AI." -ForegroundColor Cyan
