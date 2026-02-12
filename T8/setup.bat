 @echo off
title Criar Estrutura de Pastas - Landing Page Kunhinguika
color 0A
echo ================================================
echo    A CRIAR ESTRUTURA DE PASTAS...
echo ================================================
echo.

REM Criar pasta principal
mkdir landing-page-kunhinguika 2>nul
cd landing-page-kunhinguika

REM Criar pastas principais
mkdir src 2>nul
mkdir public 2>nul
mkdir tools 2>nul

REM Criar subpastas dentro de src
cd src
mkdir styles 2>nul
mkdir scripts 2>nul
mkdir assets 2>nul
mkdir partials 2>nul

REM Criar subpastas dentro de scripts
cd scripts
mkdir modules 2>nul
cd ..

REM Criar subpastas dentro de assets
cd assets
mkdir img 2>nul
mkdir fonts 2>nul
mkdir video 2>nul
cd ..

REM Voltar para a pasta raiz
cd ..

echo.
echo ================================================
echo    ✅ ESTRUTURA DE PASTAS CRIADA COM SUCESSO!
echo ================================================
echo.
echo Pastas criadas:
echo landing-page-kunhinguika/
echo   ├── src/
echo   │    ├── styles/
echo   │    ├── scripts/
echo   │    ├── assets/
echo   │    │    ├── img/
echo   │    │    ├── fonts/
echo   │    │    └── video/
echo   │    ├── partials/
echo   │    └── scripts/modules/
echo   ├── public/
echo   └── tools/
echo.
pause