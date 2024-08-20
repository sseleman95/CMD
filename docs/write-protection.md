# To erase profile of the PC

To erase profile of the PC

```bash
diskpart
list disk
select disk #
attributes disk clear readonly
```

> Note: (# es el número de unidad USB que está recibiendo error de protección
contra escritura y que debe estár conectada a PC)
