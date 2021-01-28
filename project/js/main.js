const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = 'http://unsplash.it/150/150?random&gravity=center') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src="${img}" alt="">
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const newRenderProducts = (list) => {
    list.forEach(product => {
        document.querySelector('.products').insertAdjacentHTML('afterbegin', renderProduct(product.title, product.price));
    });
};

newRenderProducts(products);
