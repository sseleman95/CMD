# Scan Directory

The TREE command will allow us to get a list of the folder structure of a specific disk drive or path.

The syntax of this command is very simple, we will write TREE and then the path we want to list. The TREE command has only two modifiers.

/F - It will show us the files contained in each of the folders in the tree we list
/A - It will use ASCII codes instead of extended characters to create the directory listing.

```bash
@echo off

tree /f /a > lista.txt

pause
```
