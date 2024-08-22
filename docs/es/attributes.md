# Editar Atributos de Archivo

El comando Attrib es un comando que está disponible desde MS-DOS 3.0 hasta el sistema operativo Microsoft Windows 10, incluyendo todas las versiones de Windows para servidores.

Usando Attrib en nuestro día a día, los atributos más comunes que necesitaremos añadir o quitar a nuestros archivos son los siguientes:

* R o Atributo de solo lectura: nos permitirá definir qué archivo solo se podrá ver pero no se podrá escribir ni modificar.
* A o Atributo de archivo: permite al programa Microsoft Backup u otros programas de backup saber qué archivos tienen que respaldar.
* H o Atributo de archivo oculto: hace que los archivos sean invisibles para los usuarios.

También podemos utilizar los modificadores:

* /S - Se utiliza para procesar archivos en todos los directorios de la ruta especificada.
* /D - Se utiliza también para procesar carpetas.

```bash
@echo off

attrib -s -h -r -a /s /d

msg *atributos modificados exitosamente...
cls

exit
```

> Note: Existen opciones adicionales para el comando Attrib que no mencionaremos, podéis consultar la sintaxis del comando Attrib en vuestra versión de Microsoft Windows para obtener todas las opciones disponibles. Dependiendo de la versión de Microsoft Windows las opciones disponibles de  Attrib pueden variar.
