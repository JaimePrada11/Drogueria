class ProductoDTO {
    constructor(imagen, nombre, descripcion, precio, stock, lote, fechaVencimiento, categoriaNombre, sku, fechaEntrada) {
        this._imagen = imagen;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._precio = precio;
        this._stock = stock;
        this._lote = lote;
        this._fechaVencimiento = fechaVencimiento;
        this._categoriaNombre = categoriaNombre;
        this._sku = sku;
        this._fechaEntrada = fechaEntrada;
    }

    getImagen(){
        return this._imagen;
    }

    setImagen(newImagen){
        this._imagen = newImagen;
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

    get sku() {
        return this._sku;
    }

    set sku(newSku) {
        this._sku = newSku;
    }

    get fechaEntrada() {
        return this._fechaEntrada;
    }

    set fechaEntrada(newFechaEntrada) {
        this._fechaEntrada = newFechaEntrada;
    }
}

module.exports = { ProductoDTO };
