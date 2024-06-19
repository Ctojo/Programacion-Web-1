const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowproduct = document.querySelector('.row-product');
const productList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

let allProducts = [];

productList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: parseFloat(product.querySelector('p').textContent.slice(1))
        };

        const index = allProducts.findIndex(prod => prod.title === infoProduct.title);

        if (index !== -1) {
            allProducts[index].quantity++;
        } else {
            allProducts.push(infoProduct);
        }

        updateCart();
    }
});

const updateCart = () => {
    showHTML();
    calculateTotal();
};

rowproduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        // Eliminar el producto del arreglo
        allProducts = allProducts.filter(product => product.title !== title);

        showHTML();
        calculateTotal();
    }
});

const showHTML = () => {
    rowproduct.innerHTML = '';

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${product.price.toFixed(2)}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;

        rowproduct.appendChild(containerProduct);
    });

    // Añadir el botón de comprar si hay productos en el carrito
    if (allProducts.length > 0) {
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Comprar';
        buyButton.classList.add('btn-buy');
        rowproduct.appendChild(buyButton);

        // Agregar evento de clic para redirigir al formulario
        buyButton.addEventListener('click', () => {
            window.location.href = 'formulario.html';
        });
    }
};

const calculateTotal = () => {
    let total = allProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    let totalOfProducts = allProducts.reduce((acc, curr) => acc + curr.quantity, 0);

    valorTotal.textContent = `$${total.toFixed(2)}`;
    countProducts.textContent = totalOfProducts;
};




// Funciones de validación del formulario
function validateName(input) {
    const value = input.value;
    const valid = /^[a-zA-Z\s]*$/.test(value); // Validar solo letras y espacios

    // Mostrar error si hay caracteres no permitidos
    if (!valid) {
        input.nextElementSibling.textContent = 'Solo se permiten letras y espacios';
    } else {
        input.nextElementSibling.textContent = '';
    }
}

function checkNameSurnameEquality() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();

    if (nombre.toLowerCase() === apellido.toLowerCase()) {
        document.getElementById('apellidoError').textContent = 'El nombre y el apellido no pueden ser iguales';
        return false;
    }
    return true;
}

function validateCBU(input) {
    const value = input.value.trim();
    const valid = /^\d{22}$/.test(value); // CBU debe tener exactamente 22 dígitos

    if (!valid) {
        input.nextElementSibling.textContent = 'El CBU debe contener exactamente 22 dígitos numéricos';
    } else {
        input.nextElementSibling.textContent = '';
    }
}

// Evento de envío del formulario
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío automático del formulario

    let isValid = true;

    // Obtener los elementos del formulario
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const localidad = document.getElementById('localidad');
    const tarjeta = document.getElementById('tarjeta');
    const cbu = document.getElementById('cbu');

    // Limpiar mensajes de error
    document.getElementById('nombreError').textContent = '';
    document.getElementById('apellidoError').textContent = '';
    document.getElementById('localidadError').textContent = '';
    document.getElementById('tarjetaError').textContent = '';
    document.getElementById('cbuError').textContent = '';

    // Validar nombre
    if (!/^[a-zA-Z\s]{3,}$/.test(nombre.value)) {
        document.getElementById('nombreError').textContent = 'El nombre debe tener al menos 3 caracteres y solo letras y espacios';
        isValid = false;
    }

    // Validar apellido
    if (!/^[a-zA-Z\s]{3,}$/.test(apellido.value)) {
        document.getElementById('apellidoError').textContent = 'El apellido debe tener al menos 3 caracteres y solo letras y espacios';
        isValid = false;
    }

    // Validar que el nombre y el apellido no sean iguales
    if (!checkNameSurnameEquality()) {
        isValid = false;
    }

    // Validar localidad
    if (!/^[a-zA-Z\s]{3,}$/.test(localidad.value)) {
        document.getElementById('localidadError').textContent = 'La localidad debe tener al menos 3 caracteres y solo letras y espacios';
        isValid = false;
    }

    // Validar número de tarjeta (16 dígitos)
    const tarjetaRegex = /^\d{16}$/;
    if (!tarjetaRegex.test(tarjeta.value)) {
        document.getElementById('tarjetaError').textContent = 'El número de tarjeta debe tener 16 dígitos';
        isValid = false;
    }

    // Validar CBU (exactamente 22 dígitos numéricos)
    validateCBU(cbu);
    if (cbu.value.trim().length !== 22 || !/^\d{22}$/.test(cbu.value.trim())) {
        isValid = false;
    }

    // Mostrar mensaje de compra realizada si el formulario es válido
    if (isValid) {
        alert('¡Compra realizada con éxito!');
        // Aquí podrías hacer alguna acción adicional, como enviar los datos a un servidor o redirigir a otra página
    }
});