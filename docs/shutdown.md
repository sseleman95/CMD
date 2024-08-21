# Shutdown

It is not mandatory that you rely on the command prompt in order to shut down Windows in different ways. Shutdown routines can also be initiated via a script (batch file) which immediately runs the desired commands without a CMD call-up. One can easily create these types of files with the Windows Text Editor notepad, save them as a *.bat file and launch them via mouse click.

```bash
@echo off

msg * Hola deceas reiniciar
msg * Estas seguro
cls

shutdown -r -f -t 05
exit
```

> Note: The command prompt in Windows 10 supports copy and paste. You can copy the commands from this article (key combination: [Ctrl] + [C]) and then place them in the entry window via paste (key combination: [Ctrl] + [V]). Because the running program could be closed without your requesting it – resulting in the loss of your data – you should first close any important programs and back up your data.

* shutdown /s  Shut down PC immediately
* shutdown /a  Abort shutdown
* shutdown /r  Restart computer
* shutdown /l  Log off current user
* shutdown /f  Force shutdown: forces the running application to close (the user receives no advance warning)
* shutdown /s /t 20  Shuts down local PC in 20 seconds (time specification with “/t-Parameter” is freely selectable)
* shutdown /r /m \\Computername  Restarts a remote PC (preparation may be required: assignment of access rights for remote control, change of Firewall settings)
* shutdown /r /m \\Computername /c “comment”  Restarts a remotely-operated PC (the text behind the “/c-Parameter” appears in a blue text box on the screen of the addressed target PC)
