@echo off
cd /d "%~dp0.."
call npm.cmd run dev -- --port 5173 --host 127.0.0.1 > vite-dev.log 2>&1
