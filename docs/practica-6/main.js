//1. Crear un Arreglo de Productos:
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalón", precio: 25, stock: 8 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Sombrero", precio: 10, stock: 20 },
  { nombre: "Vestido", precio: 30, stock: 15 },
];

//2. Agregar Productos al Carrito:
let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) {
  for (let producto of productos) {
    if (producto.nombre === productoNombre) {
      if (producto.stock >= cantidad) {
        carrito.push({
          nombre: productoNombre,
          cantidad: cantidad,
          precio: producto.precio,
        });

        producto.stock -= cantidad;
        console.log(
          `* ${cantidad} ${productoNombre}(s) agregado(s) al carrito.`
        );
        console.log(productos);
        console.log(carrito);
        console.log("***************************");
      } else {
        console.log(
          `No hay suficiente stock del producto "${productoNombre}".`
        );
        return;
      }
    }
  }
}

function eliminarDelCarrito(productoNombre, cantidad) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === productoNombre) {
      if (carrito[i].cantidad > cantidad) {
        carrito[i].cantidad -= cantidad;
        console.log(
          `* ${cantidad} ${productoNombre}(s) eliminado(s) del carrito.`
        );
      } else {
        carrito.splice(i, 1); // Eliminar el producto del carrito
        console.log(`* ${productoNombre} eliminado completamente del carrito.`);
      }
      
      // Aumentar el stock del producto eliminado en la lista de productos
      for (let producto of productos) {
        if (producto.nombre === productoNombre) {
          producto.stock += cantidad;
          break;
        }
      }

      console.log(productos);
      console.log(carrito);
      console.log("***************************");
      return; // Salir de la función después de procesar
    }
  }
  console.log(`El producto "${productoNombre}" no se encuentra en el carrito.`);
}


//3. Calcular el Total del Carrito:
function calcularTotal() {
  let total = 0;
  for (let item of carrito) {
    total += item.precio * item.cantidad;
  }

  return total;
}

let imprimirTotal = calcularTotal();
//console.log(`Venta Total: $${imprimirTotal}`);

// 4.Aplicar Descuentos:
function aplicarDescuento(total) {
  if (total > 100) {
    return total * 0.9;
  }

  return total;
}

let imprimirDescuento = aplicarDescuento(imprimirTotal);
//console.log(`Venta con Descuento del 10%: $${imprimirDescuento}`);

//5. Simular el Proceso de Compra
function procesarCompra() {
  console.log("Procesando compra...");
  setTimeout(function () {
    let total = calcularTotal();
    total = aplicarDescuento(total);
    console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
  }, 3000);
}

function mostrarCuentaRegresiva() {
  let tiempoRestante = 3; // Tiempo en segundos

  function cuentaRegresiva() {
    if (tiempoRestante > 0) {
      console.log(`Compra confirmada en ${tiempoRestante}...`);
      tiempoRestante--;
      setTimeout(cuentaRegresiva, 1000); // Llamar a la función nuevamente después de 1 segundo
    } else {
      console.log("¡Compra confirmada!");
    }
  }

  cuentaRegresiva(); // Iniciar la cuenta regresiva
}


//6. Ejecuta el Código:
agregarAlCarrito("Sombrero", 10);
agregarAlCarrito("Zapatos", 3);
agregarAlCarrito("Sombrero", 10);
agregarAlCarrito("Zapatos", 8);
procesarCompra();
mostrarCuentaRegresiva();