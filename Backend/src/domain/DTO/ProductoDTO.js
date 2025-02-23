class ProductoDTO {
    constructor(nombre, descripcion, precio, stock, lote, fechaVencimiento, categoriaNombre) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.lote = lote;
        this.fechaVencimiento = fechaVencimiento;
        this.categoriaNombre = categoriaNombre;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(newNombre) {
        this._nombre = newNombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(newDescripcion) {
        this._descripcion = newDescripcion;
    }

    get precio() {
        return this._precio;
    }

    set precio(newPrecio) {
        this._precio = newPrecio;
    }

    get stock() {
        return this._stock;
    }

    set stock(newStock) {
        this._stock = newStock;
    }

    get lote() {
        return this._lote;
    }

    set lote(newLote) {
        this._lote = newLote;
    }

    get fechaVencimiento() {
        return this._fechaVencimiento;
    }

    set fechaVencimiento(newFechaVencimiento) {
        this._fechaVencimiento = newFechaVencimiento;
    }

    get categoriaNombre() {
        return this._categoriaNombre;
    }

    set categoriaNombre(newCategoriaNombre) {
        this._categoriaNombre = newCategoriaNombre;
    }
}

module.exports = { ProductoDTO };
