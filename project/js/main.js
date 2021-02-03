const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// }

let getRequest = (url) => {
  return new Promise((resolve, reject) => {
      if (url) {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status !== 200) {
                console.log('Error');
              } else {
                resolve(xhr.responseText);
              }
            }
          };
          xhr.send();
      } else {
          reject('Error! Вы не передали url');
      }
  });
};
// ------------------------------------------------

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    // this._goods = [];
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods();

    // this.#getProducts().then((data) => {
    //   console.log(data);
    //   this.#goods = [...data];
    //   this.#render();
    // });
  }

  sum() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //   })
  // }
  #fetchGoods() {
    getRequest(`${API}catalogData.json`).then((data) => {
        this.#goods = JSON.parse(data);
        this.#render();
    }).catch((error) => {
        console.log(error);
    });
}
  #getProducts() {
    return fetch(`${API}catalogData.json`)
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img; // this.img = product.img || 'https://placehold.it/200x150';
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}
const productList = new ProductList();
