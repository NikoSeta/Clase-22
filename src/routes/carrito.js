
let carrito = []

function verCarrito(req, res){
    res.render('carrito', {carrito:carrito})
}

module.exports = {
    verCarrito
}