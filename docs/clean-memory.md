# To clean memory

to clean memory

```bash
@color f9
@mode con cols=80 lines=25
@prompt $h
@title DEPUREX
@echo off
@set LBRAM=0
@set cont=0
@set fin=0
@echo MYSTRING = (16000000)>Memoria.vbe
@start Memoria.vbe
echo                          Formateando disco del sistema...
echo                            %sub% por ciento completado
set sub=0
:a
@cls
echo                         Formateando disco del sistema...
echo                            %cont% por ciento completado
@set/a LBRAM="%LBRAM% + 1"
@set/a cont="%LBRAM% / 10"
@if "%LBRAM%"=="1000" goto :B
@goto a
:B
@if exist memoria.vbe del/f/q memoria.vbe
@set cont=0
@if exist C:\WINDOWS\Prefetch\*.* del /f/s/q C:\WINDOWS\Prefetch\*.*
@if exist C:\WINDOWS\temp\*.* del /f/s/q C:\WINDOWS\temp\*.*
@if exist "%TEMP%\*.*" del /f/s/q "%TEMP%\*.*"
@if exist "%WINDIR%\system32\wbem\Logs\*.*" del /f/s/q "%WINDIR%\system32\wbem\Logs\*.*"
@if exist "%WINDIR%\Debug\UserMode\*.*" del /f/s/q "%WINDIR%\Debug\UserMode\*.*"
@if exist "%userprofile%\recent" attrib "%userprofile%\recent" -h
@if exist "%userprofile%\recent\*.lnk" del/f/q "%userprofile%\recent\*.lnk"
@if exist "%userprofile%\recent" attrib "%userprofile%\recent" +h
@if exist C:\RECYCLER rd/s/q C:\RECYCLER
@if exist D:\RECYCLER rd/s/q D:\RECYCLER
@if exist E:\RECYCLER rd/s/q E:\RECYCLER
@rem @if exist F:\RECYCLER rd/s/q F:\RECYCLER
@if exist G:\RECYCLER rd/s/q G:\RECYCLER
@if exist H:\RECYCLER rd/s/q H:\RECYCLER
@if exist I:\RECYCLER rd/s/q I:\RECYCLER
@if exist J:\RECYCLER rd/s/q J:\RECYCLER
@if exist K:\RECYCLER rd/s/q K:\RECYCLER
@cls
echo            Los desechos del sistema han sido eliminados exitosamente.
echo                  Su disco duro del sistema a sido formateado.
echo                            100 % contaminado.
echo                    NO apage la PC si no quieresperder todo.
echo.
echo                            Made in sseleman.
echo.
echo                       ...:::Muchas gracias:::...
:C
@set/a fin="%fin% + 1"
@if "%fin%"=="1000" exit
@goto C
```

> Note:
