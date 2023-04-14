var libro1 = { titulo: "¿Sueñan los androides con ovejas electricas?", autor: "Philip K. Dick", precio:"500" , imagen: "img/CSS\302166_portada_suenan-los-androides-con-ovejas-electricas_philip-k-dick_201906201221.jpg"};
var libro2 = { titulo: "Big Fish", autor: "Daniel Wallace", precio: "5000" , imagen: "img/CSS\D_NQ_NP_824290-MLA31017918512_062019-V.jpg"};
var libro3 = { titulo: "La ciudad y los perros", autor: "Mario Vargas Llosa", precio:"5000",imagen: "img/CSS\descarga.jpg"};


agregarLibroAlContenedor(libro1);
agregarLibroAlContenedor(libro2);
agregarLibroAlContenedor(libro3);


function agregarLibroAlContenedor(libro) {

    var tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-libro";

    
    var titulo = document.createElement("h2");
    titulo.textContent = libro.titulo;
    var autor = document.createElement("p");
    autor.textContent = "Autor: " + libro.autor;
    var descripcion = document.createElement("p");
    descripcion.textContent = libro.descripcion;


    tarjeta.appendChild(titulo);
    tarjeta.appendChild(autor);
    tarjeta.appendChild(descripcion);

    
    var contenedorLibros = document.getElementById("contenedor-libros");
    contenedorLibros.appendChild(tarjeta);
}


let librosDisponibles = [libro1, libro2, libro3];

function mostrarLibros() {
    let contenedorLibros = document.getElementById("contenedor-libros");

    librosDisponibles.forEach(libro => {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = libro.imagen;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = libro.titulo;

        let autor = document.createElement("p");
        autor.classList.add("card-text");
        autor.textContent = libro.autor;

        let precio = document.createElement("p");
        precio.classList.add("card-text");
        precio.textContent = "$" + libro.precio;

        let agregarAlCarrito = document.createElement("button");
        agregarAlCarrito.classList.add("btn", "btn-primary");
        agregarAlCarrito.textContent = "Agregar al carrito";
        agregarAlCarrito.addEventListener("click", () => {
            agregarLibroAlCarrito(libro);
        });

        cardBody.appendChild(titulo);
        cardBody.appendChild(autor);
        cardBody.appendChild(precio);
        cardBody.appendChild(agregarAlCarrito);

        card.appendChild(img);
        card.appendChild(cardBody);

        contenedorLibros.appendChild(card);
    });
}

mostrarLibros();
let carritoDeCompras = [];

function agregarLibroAlCarrito(libro) {
    let libroExistente = carritoDeCompras.find(l => l.titulo === libro.titulo);

    if (libroExistente) {
        libroExistente.cantidad++;
    } else {
        carritoDeCompras.push({ ...libro, cantidad: 1 });
    }

    mostrarCarritoDeCompras();

}

function mostrarCarritoDeCompras() {
    let tablaCarrito = document.getElementById("tabla-carrito");
    tablaCarrito.innerHTML = "";

    let total = 0;

    carritoDeCompras.forEach(libro => {
        let fila = document.createElement("tr");

        let imagen = document.createElement("td");
        imagen.innerHTML = `<img src="${libro.imagen}" style="width: 50px;">`;

        let titulo = document.createElement("td");
        titulo.textContent = libro.titulo;

        let autor = document.createElement("td");
        autor.textContent = libro.autor;

        let cantidad = document.createElement("td");
        cantidad.textContent = libro.cantidad;

        let precio = document.createElement("td");
        precio.textContent = "$" + libro.precio;

        let subtotal = document.createElement("td");
        subtotal.textContent = "$" + libro.precio * libro.cantidad;

        total += libro.precio * libro.cantidad;

        fila.appendChild(imagen);
        fila.appendChild(titulo);
        fila.appendChild(autor);
        fila.appendChild(cantidad);
        fila.appendChild(precio);
        fila.appendChild(subtotal);

        tablaCarrito.appendChild(fila);
    });

    let filaTotal = document.createElement("tr");

    let tdVacio = document.createElement("td");
    tdVacio.setAttribute("colspan")

    let botonComprar = document.getElementById("boton-comprar");
    botonComprar.addEventListener("click", comprarLibros);

    function comprarLibros() {
        if (carritoDeCompras.length === 0) {
            alert("Tu carrito de compras está vacío");
            return;
        }

        let confirmacion = confirm(`¿Estás seguro que deseas comprar estos libros por un total de $${total}?`);

        if (confirmacion) {
            alert("¡Gracias por tu compra!");
            carritoDeCompras = [];
            mostrarCarritoDeCompras();
        }
    }

    function eliminarLibroDelCarrito(libro) {
        carritoDeCompras = carritoDeCompras.filter(l => l.titulo !== libro.titulo);
        mostrarCarritoDeCompras();
    }

    function mostrarCarritoDeCompras() {
        let tablaCarrito = document.getElementById("tabla-carrito");
        tablaCarrito.innerHTML = "";

        let total = 0;

        carritoDeCompras.forEach(libro => {
            let fila = document.createElement("tr");

            let imagen = document.createElement("td");
            imagen.innerHTML = `<img src="${libro.imagen}" style="width: 50px;">`;

            let titulo = document.createElement("td");
            titulo.textContent = libro.titulo;

            let autor = document.createElement("td");
            autor.textContent = libro.autor;

            let cantidad = document.createElement("td");
            cantidad.textContent = libro.cantidad;

            let precio = document.createElement("td");
            precio.textContent = "$" + libro.precio;

            let subtotal = document.createElement("td");
            subtotal.textContent = "$" + libro.precio * libro.cantidad;

            let botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btn", "btn-danger");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                eliminarLibroDelCarrito(libro);
            });

            total += libro.precio * libro.cantidad;

            fila.appendChild(imagen);
            fila.appendChild(titulo);
            fila.appendChild(autor);
            fila.appendChild(cantidad);
            fila.appendChild(precio);
            fila.appendChild(subtotal);
            fila.appendChild(botonEliminar);

            tablaCarrito.appendChild(fila);
        });

        let filaTotal = document.createElement("tr");

        let tdVacio = document.createElement("td");
        tdVacio.setAttribute("colspan", "5");
        filaTotal.appendChild(tdVacio);

        let totalLabel = document.createElement("td");
        totalLabel.textContent = "Total:";

        let totalValor = document.createElement("td");
        totalValor.textContent = "$" + total;

        filaTotal.appendChild(totalLabel);
        filaTotal.appendChild(totalValor);

        tablaCarrito.appendChild(filaTotal);
    }