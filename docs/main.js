const d = document;
const $productosUL = d.querySelector("#productos");
const $carritoUL = d.querySelector("#carrito");
const $totalP = d.querySelector("#total");
const $loader = d.querySelector("#loader");

// Inicializar productos y carrito
let productos = [];
let carrito = [];

// Función para cargar productos desde la Fake Store API
async function cargarProductos() {
  $loader.style.display = "block"; // Mostrar el loader mientras se cargan los productos
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Error al cargar productos de la API");

    const data = await response.json();

    // Agregar stock simulado a los productos
    productos = data.map((producto) => ({
      ...producto,
      stock: Math.floor(Math.random() * 20) + 1, // Generar stock entre 1 y 20
    }));

    renderizarProductos(); // Mostrar productos en el DOM
  } catch (error) {
    console.error("Hubo un error al cargar los productos:", error);
  } finally {
    $loader.style.display = "none"; // Ocultar el loader
  }
}

// Función para renderizar los productos en el DOM
function renderizarProductos() {
  $productosUL.innerHTML = ""; // Limpiar el contenido previo

  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.classList.add("producto");

    li.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>Precio: $${producto.price}</p>
      <p>Stock: ${producto.stock}</p>
    `;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id, 1);
      renderizarCarrito();
    });

    li.appendChild(botonAgregar);
    $productosUL.appendChild(li);
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto, cantidad) {
  const producto = productos.find((p) => p.id === idProducto);
  if (!producto || producto.stock < cantidad) {
    alert("Stock insuficiente.");
    return;
  }

  const productoEnCarrito = carrito.find((p) => p.id === idProducto);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ id: producto.id, nombre: producto.title, precio: producto.price, cantidad });
  }

  producto.stock -= cantidad; // Reducir el stock disponible
  renderizarProductos(); // Actualizar productos en el DOM
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(idProducto, cantidad) {
  const index = carrito.findIndex((item) => item.id === idProducto);
  if (index !== -1) {
    const productoEnCarrito = carrito[index];

    if (productoEnCarrito.cantidad > cantidad) {
      productoEnCarrito.cantidad -= cantidad; // Reducir la cantidad
    } else {
      carrito.splice(index, 1); // Eliminar si la cantidad es 0
    }

    // Restaurar el stock del producto en la lista
    const producto = productos.find((prod) => prod.id === idProducto);
    if (producto) producto.stock += cantidad;

    renderizarCarrito();
    renderizarProductos();
  }
}

// Función para renderizar el carrito
function renderizarCarrito() {
  $carritoUL.innerHTML = ""; // Limpiar contenido previo

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(item.id, 1); // Eliminar una unidad del producto
    });

    li.appendChild(botonEliminar);
    $carritoUL.appendChild(li);
  });

  $totalP.textContent = `Total: $${calcularTotal().toFixed(2)}`;
}

// Función para calcular el total del carrito
function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// Función para simular la compra con un loader de 2 segundos
function simularCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de procesar la compra.");
    return;
  }

  const loaderContainer = d.querySelector("#loader-container");
  const loader = d.querySelector("#loader");

  // Configurar el estilo del loader dinámicamente
  loader.style.width = "50px";
  loader.style.height = "50px";
  loader.style.border = "6px solid rgba(0, 0, 0, 0.1)"; // Fondo suave
  loader.style.borderLeft = "6px solid #3498db"; // Azul principal
  loader.style.borderRadius = "50%"; // Círculo perfecto
  loader.style.margin = "10px auto";
  loader.style.animation = "spin 1s linear infinite"; // Animación dinámica

  // Definir la animación directamente en JavaScript
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Mostrar el loader
  loaderContainer.style.display = "block";

  setTimeout(() => {
    // Ocultar el loader después de 2 segundos
    loaderContainer.style.display = "none";
    alert("¡Compra procesada exitosamente!");

    // Vaciar el carrito y actualizar la interfaz
    carrito = [];
    renderizarCarrito();
  }, 2000);
}


// Evento para simular la compra
const $botonSimularCompra = d.createElement("button");
$botonSimularCompra.textContent = "Procesar Compra";
$botonSimularCompra.addEventListener("click", simularCompra);
d.body.appendChild($botonSimularCompra);

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  renderizarCarrito();
});
