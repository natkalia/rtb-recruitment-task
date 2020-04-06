'use strict';

const url = './banner.json';

// fetch  and parse json data to get 4 random offers
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // get array of 4 random not-repeating indexes based on number of offers in json
    let indexStore = [];
    const createIndexStore = () => {
      for (let i = 0; i < 4; i++) {
        indexStore.push(Math.floor(Math.random() * data.offers.length));
      }
      return indexStore;
    };
    const hasDuplicates = indexStore => {
      return new Set(indexStore).size !== indexStore.length;
    };
    // create new index store when script begins and if duplicates
    while (!indexStore.length || hasDuplicates(indexStore)) {
      indexStore.length = 0;
      createIndexStore();
    }
    // use 4 random not-repeating indexes to get 4 different products for banner
    const productStore = [];
    indexStore.forEach(i => productStore.push(data.offers[i]));
    return productStore;
  })
  .then((products) => renderProducts(products))
  .catch((error) => new Error(error));

const renderProducts = products => {
  // iterate over fetched data to generate banner html code
  products.forEach((product, index) => {
    let html = `
    <div class='product' id='product-${index + 1}'>
      <div class='image-box'>
        <img class='image' src='${product.imgURL}' alt='product'/>
      </div>
      <span class='price'>${product.price} ${product.currency}</span>
    </div>
    `;
    document
      .querySelector('.products-box')
      .insertAdjacentHTML('beforeend', html);
  });
 // set first slide as activ
  document.querySelectorAll('.product')[0].className += ' active';
  // start animation for borders
  setInterval(animateBorders, 2000);
};

const animateBorders = () => {
  const totalProducts = document.querySelectorAll('.product').length;
  const activeProduct = document.querySelector('.product.active');
  const activeProductId = activeProduct.getAttribute('id');
  // get next product from id of active product
  let nextProductNumber = Number(activeProductId.slice(8)) + 1;
  // reset animation to start
  nextProductNumber > totalProducts ?  nextProductNumber = 1 : null;
  // remove and set active class to correct products
  activeProduct.classList.remove('active');
  document.getElementById(`product-${nextProductNumber}`).className += ' active';
};
