# Escanear Directorio

El comando TREE nos permitirá obtener un listado de la estructura de carpetas de una unidad de disco o ruta específica.

La sintaxis de este comando es muy sencilla, escribiremos TREE y luego la ruta que queremos listar. El comando TREE tiene solo dos modificadores.

/F - Nos mostrará los archivos contenidos en cada una de las carpetas del árbol que listamos
/A - Utilizará códigos ASCII en lugar de caracteres extendidos para crear el listado de directorios.

```bash
@echo off

tree /f /a > lista.txt

pause
```
