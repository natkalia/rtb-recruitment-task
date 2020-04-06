'use strict';

const url = './banner.json';

// fetch and parse json data to get 3 random offers
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // get array of 3 random not-repeating indexes based on number of offers in json
    let indexStore = [];
    const createIndexStore = () => {
      for (let i = 0; i < 3; i++) {
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
    // use 3 random not-repeating indexes to get 3 different products for banner
    const productStore = [];
    indexStore.forEach(i => productStore.push(data.offers[i]));
    return productStore;
  })
  .then((products) => renderProducts(products))
  .catch((error) => new Error(error));

const renderProducts = products => {
  // iterate over fetched data to generate banner html code
  products.forEach((product, index) => {
    const html = `
    <div class='slide' id='slide-${index + 1}'>
      <div class='image-box'>
        <img class='image' src='${product.imgURL}' alt='product'/>
      </div>
      <span class='name'>${product.name}</span>
      <span class='price'>${product.price} ${product.currency}</span>
      <a class='button' href='#'>Check</a>
    </div>
    `;
    document.querySelector('.slider').insertAdjacentHTML('beforeend', html);
  });
  // set first slide as active
  document.querySelectorAll('.slide')[0].classList.add('active');
  // start animation for slider
  setInterval(animateSlides, 2000);
};

const animateSlides = () => {
  const totalSlides = document.querySelectorAll('.slide').length;
  const activeSlide = document.querySelector('.slide.active');
  const activeSlideId = activeSlide.getAttribute('id');
  // get next slide from id of active slide
  let nextSlideNumber = Number(activeSlideId.slice(6)) + 1;
  // reset slider to start
  nextSlideNumber > totalSlides ? nextSlideNumber = 1 : null;
  // remove and set active class to correct slides
  activeSlide.classList.remove('active');
  document.getElementById(`slide-${nextSlideNumber}`).className += ' active';
};
