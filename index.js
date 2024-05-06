const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowproduct = document.querySelector('.row-product');
const prouductList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

let allProducts = [];

prouductList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: parseFloat(product.querySelector('p').textContent.slice(1))
        };

        const index = allProducts.findIndex(prod => prod.title === infoProduct.title);

        if(index !== -1){
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
    if(e.target.classList.contains('icon-close')){
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
};

const calculateTotal = () => {
    let total = allProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    let totalOfProducts = allProducts.reduce((acc, curr) => acc + curr.quantity, 0);

    valorTotal.textContent = `$${total.toFixed(2)}`;
    countProducts.textContent = totalOfProducts;
};
