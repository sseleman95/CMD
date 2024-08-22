# Edit File Attributes

The Attrib command is a command that is available from MS-DOS 3.0 to the Microsoft Windows 10 operating system, including all versions of Windows for servers.

Using Attrib in our day to day, the most common attributes that we will need to add or remove to our files are the following:

* R or Read-only attribute: it will allow us to define which file can only be seen but cannot be written or modified.
* A or File attribute: it allows the Microsoft Backup program or other backup programs to know which files they have to back up.
* H or Hidden file attribute: it makes files invisible to users.

We can also use the switches:

* /S - It is used to process files in all directories of the specified path.
* /D - It is also used to process folders.

```bash
@echo off

attrib -s -h -r -a /s /d

msg *attributes successfully modified...
cls

exit
```

> Note: There are additional options for the Attrib command that we will not mention, you can consult the Attrib command syntax in your version of Microsoft Windows for all available options. Depending on the version of Microsoft Windows the available Attrib options may vary.
