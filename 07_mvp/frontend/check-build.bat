@echo off
echo === VERIFICANDO BUILD ===
cd /d "%~dp0"
call npm run build
echo === BUILD COMPLETO ===
