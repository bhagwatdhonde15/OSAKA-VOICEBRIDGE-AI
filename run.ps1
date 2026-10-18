# OSAKA VOICEBRIDGE AI - PowerShell Startup Supervisor
# Impact Osaka Hackathon 2026
# "One city. Every language. No one left behind."

$root = $PSScriptRoot

Write-Host "======================================================================" -ForegroundColor Magenta
Write-Host "  OSAKA VOICEBRIDGE AI — Impact Osaka Hackathon 2026" -ForegroundColor Yellow
Write-Host "  'One city. Every language. No one left behind.'" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Magenta
Write-Host ""

Write-Host "[1/4] Clearing stale processes on ports 8000 and 5173..." -ForegroundColor Gray
Get-NetTCPConnection -LocalPort 8000,5173 -ErrorAction SilentlyContinue | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
}
Start-Sleep -Seconds 1

Write-Host "[2/4] Launching Python FastAPI Backend on http://127.0.0.1:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\backend'; python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "[3/4] Launching React Vite Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\frontend'; npm run dev"

Write-Host "[4/4] Waiting for services to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Open default browser
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "======================================================================" -ForegroundColor Magenta
Write-Host "  🎉 OSAKA VOICEBRIDGE AI IS RUNNING LOCALLY!" -ForegroundColor Green
Write-Host "  ------------------------------------------------------------------" -ForegroundColor Gray
Write-Host "  Web Application:   http://localhost:5173" -ForegroundColor White
Write-Host "  FastAPI Swagger:   http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "  Health Endpoint:   http://127.0.0.1:8000/api/health" -ForegroundColor White
Write-Host "  Competition Video: output\OSAKA_VOICEBRIDGE_AI_COMPETITION_VIDEO.mp4" -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Keep the spawned PowerShell windows open to maintain local services." -ForegroundColor Cyan
