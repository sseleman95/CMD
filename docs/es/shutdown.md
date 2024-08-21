# Shutdown

No es obligatorio confiar en el símbolo del sistema para apagar Windows de diferentes maneras. Las rutinas de apagado también se pueden iniciar a través de un script (archivo por lotes) que ejecuta inmediatamente los comandos deseados sin una llamada CMD. Se pueden crear fácilmente este tipo de archivos con el bloc de notas del Editor de texto de Windows, guardarlos como un archivo *.bat y ejecutarlos con un clic del mouse.

```bash
@echo off

msg * Hola deceas reiniciar
msg * Estas seguro
cls

shutdown -r -f -t 05
exit
```

> Note: El símbolo del sistema en Windows 10 admite copiar y pegar . Puede copiar los comandos de este artículo (combinación de teclas: [Ctrl] + [C]) y luego colocarlos en la ventana de entrada pegándolos (combinación de teclas: [Ctrl] + [V]). Debido a que el programa en ejecución podría cerrarse sin que usted lo solicite, lo que provocaría la pérdida de sus datos, primero debe cerrar todos los programas importantes y hacer una copia de seguridad de sus datos.


* shutdown /s   Apague la PC inmediatamente
* shutdown /a 	Abortar apagado
* shutdown /r 	Reiniciar la computadora
* shutdown /l 	Cerrar sesión del usuario actual
* shutdown /f 	Forzar apagado: fuerza el cierre de la aplicación en ejecución (el usuario no recibe ninguna advertencia previa)
* shutdown /s /t 20  Apaga el PC local en 20 segundos (la especificación de tiempo con “/t-Parameter” se puede seleccionar libremente)
* shutdown /r /m \\nombreEquipo  Reinicia una PC remota (es posible que se requiera preparación: asignación de derechos de acceso para control remoto, cambio de configuración del Firewall)
* shutdown /r /m \\NombreEquipo /c “comentario”  Reinicia una PC operada de forma remota (el texto detrás del “/c-Parámetro” aparece en un cuadro de texto azul en la pantalla de la PC de destino direccionada)
