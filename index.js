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
            window.location.href = 'forms.html';
        });
    }
};

const calculateTotal = () => {
    let total = allProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    let totalOfProducts = allProducts.reduce((acc, curr) => acc + curr.quantity, 0);

    valorTotal.textContent = `$${total.toFixed(2)}`;
    countProducts.textContent = totalOfProducts;
};



//################################//
//################################//
//################################//
//################################//
//################################//


function validateEmail(input) {
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validar formato de correo electrónico

    if (!valid) {
        input.nextElementSibling.textContent = 'Ingrese un correo electrónico válido';
    } else {
        input.nextElementSibling.textContent = '';
    }
}

function validateForm() {
    let isValid = true;

    // Obtener los elementos del formulario
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const correo = document.getElementById('correo');
    const localidad = document.getElementById('localidad').value;
    const tarjeta = document.getElementById('tarjeta').value;

    // Limpiar mensajes de error
    document.getElementById('nombreError').textContent = '';
    document.getElementById('apellidoError').textContent = '';
    document.getElementById('correoError').textContent = '';
    document.getElementById('localidadError').textContent = '';
    document.getElementById('tarjetaError').textContent = '';

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

    // Validar correo electrónico
    validateEmail(correo);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
        isValid = false;
    }

    // Validar largo de la localidad (mínimo 3 caracteres)
    if (localidad.length < 3) {
        document.getElementById('localidadError').textContent = 'La localidad debe tener al menos 3 caracteres';
        isValid = false;
    }

    // Validar número de tarjeta (16 dígitos)
    const tarjetaRegex = /^\d{16}$/;
    if (!tarjetaRegex.test(tarjeta)) {
        document.getElementById('tarjetaError').textContent = 'El número de tarjeta debe tener 16 dígitos';
        isValid = false;
    }

    return isValid;
}