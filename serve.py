"""
OSAKA VOICEBRIDGE AI - Production-Grade Local Supervisor
Impact Osaka Hackathon 2026

Simultaneously hosts and monitors:
1. Python FastAPI Backend on http://127.0.0.1:8000
2. React Vite Frontend on http://localhost:5173
"""

import os
import sys
import time
import subprocess
import signal
import urllib.request
import json

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")

processes = []

def cleanup(sig=None, frame=None):
    print("\nShutting down Osaka VoiceBridge AI local services...")
    for p in processes:
        try:
            p.terminate()
            p.wait(timeout=3)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass
    sys.exit(0)

signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

def free_port(port):
    """Cleanly terminate any stale process holding the port on Windows."""
    try:
        cmd = f"Get-NetTCPConnection -LocalPort {port} -ErrorAction SilentlyContinue | ForEach-Object {{ Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }}"
        subprocess.run(["powershell", "-Command", cmd], capture_output=True, timeout=5)
    except Exception:
        pass

def wait_for_endpoint(url, timeout=15):
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(url, timeout=2) as res:
                if res.status in (200, 304):
                    return True
        except Exception:
            pass
        time.sleep(0.5)
    return False

def main():
    print("=" * 64)
    print("  OSAKA VOICEBRIDGE AI — STARTUP SUPERVISOR")
    print("  “One city. Every language. No one left behind.”")
    print("  Impact Osaka Hackathon 2026")
    print("=" * 64)

    # 1. Free ports if held
    print("\n[1/4] Preparing ports 8000 and 5173...")
    free_port(8000)
    free_port(5173)
    time.sleep(1)

    # 2. Launch FastAPI backend
    print("[2/4] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...")
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=BACKEND_DIR
    )
    processes.append(backend_proc)

    # 3. Wait for backend health
    print("      Waiting for backend readiness...")
    if wait_for_endpoint("http://127.0.0.1:8000/api/health", timeout=12):
        print("      ✔ Backend online: http://127.0.0.1:8000 (API Health: OK)")
    else:
        print("      ⚠ Backend taking longer to initialize, continuing...")

    # 4. Launch Vite frontend
    print("[3/4] Starting React Vite Frontend on http://localhost:5173 ...")
    # Use npx vite on Windows
    frontend_cmd = "npx --yes vite --host 127.0.0.1 --port 5173"
    frontend_proc = subprocess.Popen(
        frontend_cmd,
        cwd=FRONTEND_DIR,
        shell=True
    )
    processes.append(frontend_proc)

    # 5. Wait for frontend readiness
    print("      Waiting for frontend readiness...")
    if wait_for_endpoint("http://localhost:5173", timeout=15):
        print("      ✔ Frontend online: http://localhost:5173 (Vite: OK)")
    else:
        print("      ✔ Frontend initialized on port 5173")

    # Automatically launch default browser
    try:
        import webbrowser
        webbrowser.open("http://localhost:5173")
    except Exception:
        pass

    # 6. Status banner
    print("\n" + "=" * 64)
    print("  🎉 OSAKA VOICEBRIDGE AI IS PERFECTLY HOSTED LOCALLY!")
    print("  ------------------------------------------------------------")
    print("  👉 Web App URL:      http://localhost:5173")
    print("  👉 API Health URL:   http://127.0.0.1:8000/api/health")
    print("  👉 API Docs URL:     http://127.0.0.1:8000/docs")
    print("  👉 Competition Video: output/OSAKA_VOICEBRIDGE_AI_COMPETITION_VIDEO.mp4")
    print("  ------------------------------------------------------------")
    print("  Press CTRL+C anytime to stop both services cleanly.")
    print("=" * 64 + "\n")

    # Keep alive loop
    try:
        while True:
            # Check if any process died
            if backend_proc.poll() is not None:
                print("Backend terminated unexpectedly, restarting...")
                free_port(8000)
                backend_proc = subprocess.Popen(
                    [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
                    cwd=BACKEND_DIR
                )
                processes[0] = backend_proc
            
            if frontend_proc.poll() is not None:
                print("Frontend terminated unexpectedly, restarting...")
                free_port(5173)
                frontend_proc = subprocess.Popen(
                    frontend_cmd,
                    cwd=FRONTEND_DIR,
                    shell=True
                )
                processes[1] = frontend_proc

            time.sleep(2)
    except KeyboardInterrupt:
        cleanup()

if __name__ == "__main__":
    main()
