import * as noUiSlider from "nouislider";

const products = [
  {
    id: "1",
    name: "Натуральна черепиця",
    price: 300,
    color: "red",
    type: "natur",
    brand: "akvizol",
    src: "./img/krovlya/cherepica.jpeg",
  },
  {
    id: "2",
    name: "Композит",
    price: 500,
    color: "brown",
    type: "komposit",
    brand: "katepal",
    src: "./img/krovlya/komposit-korichnev.jpeg",
  },
  {
    id: "3",
    name: "Композит",
    price: 500,
    color: "red",
    type: "komposit",
    brand: "icopal",
    src: "./img/krovlya/kompozit-krasniy.jpeg",
  },
  {
    id: "4",
    name: "Композит",
    price: 200,
    color: "green",
    type: "komposit",
    brand: "ico",
    src: "./img/krovlya/komposit-zeleniy.jpeg",
  },
  {
    id: "5",
    name: "Металочерепиця",
    price: 1000,
    color: "black",
    type: "metal",
    brand: "certainteed",
    src: "./img/krovlya/metal01.jpg",
  },
  {
    id: "6",
    name: "Металочерепиця",
    price: 200,
    color: "black",
    type: "metal",
    brand: "icopal",
    src: "./img/krovlya/metal02.jpg",
  },
  {
    id: "7",
    name: "Бітумна черепиця",
    price: 400,
    color: "black",
    type: "bitum",
    brand: "katepal",
    src: "./img/krovlya/bitum01.jpg",
  },
  {
    id: "8",
    name: "Бітумна черепиця",
    price: 600,
    color: "brown",
    type: "bitum",
    brand: "icopal",
    src: "./img/krovlya/bitum02.jpg",
  },
  {
    id: "9",
    name: "Бітумна черепиця",
    price: 700,
    color: "red",
    type: "bitum",
    brand: "akvizol",
    src: "./img/krovlya/bitum03.jpg",
  },
  {
    id: "10",
    name: "Бітумна черепиця",
    price: 1200,
    color: "green",
    type: "bitum",
    brand: "icopal",
    src: "./img/krovlya/bitum04.jpg",
  },
  {
    id: "10",
    name: "Бітумна черепиця",
    price: 1200,
    color: "brown",
    type: "bitumt",
    brand: "icopal",
    src: "./img/krovlya/bitum05.jpg",
  },
  {
    id: "10",
    name: "Бітумна черепиця",
    price: 1200,
    color: "black",
    type: "bitum",
    brand: "icopal",
    src: "./img/krovlya/bitum06.jpg",
  },
  {
    id: "10",
    name: "Бітумна черепиця",
    price: 800,
    color: "brown",
    type: "bitum",
    brand: "icopal",
    src: "./img/krovlya/bitum07.jpg",
  },
  {
    id: "10",
    name: "Бітумна черепиця",
    price: 900,
    color: "blue",
    type: "bitum",
    brand: "icopal",
    src: "./img/krovlya/bitum08.jpg",
  },
];

function createTemplates(data) {
  const items = data.map((item) => {
    return `
        <div class="krovlya__body-item card-item">
            <div class="card-item__image-ibg"><img krovlya/src=${item.src} alt="img"krovlya/></div>
            <div class="card-item__content">
            <h2 class="card-item__title">${item.name}</h2>
            <div class="card-item__footer">
                <span class="card-item__price">${item.price} грн</span>
                <button data-popup="#popup-catalog" class="card-item__button button">Купити</button>
            </div>
            </div>
        </div>`;

  });

  return items.join("");
}

const $wrapper = document.querySelector(".krovlya__body-items");

if ($wrapper) {
  $wrapper.innerHTML = createTemplates(products);
}

function filterProducts(products, filters, priceMin, priceMax, wrapper) {
  let filterProducts = products;

  if (filters) {
    const filtersName = Object.keys(filters);

    for (let i = 0; i < filtersName.length; i++) {
      if (filters[filtersName[i]].length > 0) {
        filterProducts = filterProducts.filter((item) =>
          filters[filtersName[i]].includes(item[filtersName[i]])
        );
      }
    }
  }

  if (priceMin && priceMax) {
    filterProducts = filterProducts.filter(
      (item) =>
        Number(item.price) >= Number(priceMin) &&
        Number(item.price) <= Number(priceMax)
    );
  }

  wrapper.innerHTML = createTemplates(filterProducts);
}

const $filterForm = document.getElementById("filter-krovlya");

function applyFilter(form) {
  if (!form) {
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const colors = [];
    const types = [];
    const brands = [];
    const priceMin = form.querySelector("input[name=minPrice]").value;
    const priceMax = form.querySelector("input[name=maxPrice]").value;

    const $checboxBrand = form
      .querySelector(".filter-brand")
      .querySelectorAll("input[type=checkbox]:checked");

    const $checboxColor = form
      .querySelector(".filter-color")
      .querySelectorAll("input[type=checkbox]:checked");

    const $checboxType = form
      .querySelector(".filter-material")
      .querySelectorAll("input[type=checkbox]:checked");

    for (let i = 0; i < $checboxBrand.length; i++) {
      brands.push($checboxBrand[i].value);
    }
    for (let i = 0; i < $checboxColor.length; i++) {
      colors.push($checboxColor[i].value);
    }

    for (let i = 0; i < $checboxType.length; i++) {
      types.push($checboxType[i].value);
    }

    const filters = {};

    if (brands.length >= 1) {
      filters.brand = brands;
    }

    if (colors.length >= 1) {
      filters.color = colors;
    }

    if (types.length >= 1) {
      filters.type = types;
    }

    filterProducts(products, filters, priceMin, priceMax, $wrapper);


  });
}

function clearFilters(form, wrapper, data) {
  if (!form) {
    return;
  }

  const $clearButton = form.querySelector(".clear-filters");
  const range = form.querySelector("[data-range-item]");

  $clearButton.addEventListener("click", () => {
    range.noUiSlider.reset();

    wrapper.innerHTML = createTemplates(data);
  });
}

clearFilters($filterForm, $wrapper, products);

applyFilter($filterForm);

// const $closeFilter = document.querySelector(".close-filter");
// if ($closeFilter) {
//   document.getElementById('close-filter').onclick = function () {
//     document.getElementById('filter-krovlya').classList.remove('filter-open');
//     document.querySelector('html').classList.remove('lock');
//   }

// }