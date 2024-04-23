async function fetchedData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to calculate discount percentage
function calculateDiscountPercentage(price, compareAtPrice) {
  if (!compareAtPrice || compareAtPrice <= price) {
    return 0;
  }

  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

// To Get Product Details
function renderProductDetails(products) {
  let searchResultsEl = document.getElementById("searchResults");
  searchResultsEl.innerHTML = "";
  products.forEach((product) => {
    const discountPercentage = calculateDiscountPercentage(
      product.price,
      product.compare_at_price
    );

    let PrdctEt = document.createElement("div");

    PrdctEt.classList.add("card");

    let pBackgroundE1 = document.createElement("div");

    // Update the image source
    pBackgroundE1.style.backgroundImage = `URL(${product.image})`;
    // Add the mouseover and mouseout events
    pBackgroundE1.addEventListener("mouseover", function () {
      // Change the image source to the new image
      this.style.backgroundImage = `URL(${product.second_image})`;
    });
    pBackgroundE1.addEventListener("mouseout", function () {
      // Change the image source back to the original image
      this.style.backgroundImage = `URL(${product.image})`;
    });

    pBackgroundE1.classList.add("card-background-container");
    pBackgroundE1.classList.add("image");

    PrdctEt.appendChild(pBackgroundE1);

    //to toggle badge_text dynamically
    if (product.badge_text !== null) {
      let ParaE1 = document.createElement("p");
      ParaE1.textContent = `${
        product.badge_text !== null ? `${product.badge_text}` : ""
      }`;
      ParaE1.classList.add("badge");
      pBackgroundE1.appendChild(ParaE1);
    }

    let divHeadingE1 = document.createElement("div");
    divHeadingE1.classList.add("div-heading-container");

    let headingE1 = document.createElement("h4");
    headingE1.textContent = `${product.title}`;
    headingE1.classList.add("card-heading");
    divHeadingE1.appendChild(headingE1);

    let headingE2 = document.createElement("h6");
    headingE2.textContent = `${product.vendor}`;
    headingE2.classList.add("span");
    divHeadingE1.appendChild(headingE2);

    PrdctEt.appendChild(divHeadingE1);

    let pFooterE1 = document.createElement("div");
    pFooterE1.classList.add("card-footer-container");

    let ParaE2 = document.createElement("p");
    ParaE2.classList.add("price");
    ParaE2.textContent = `${product.price}.00`;
    pFooterE1.appendChild(ParaE2);

    let ParaE3 = document.createElement("p");
    ParaE3.classList.add("discount");
    ParaE3.textContent = `${product.compare_at_price}.00`;
    pFooterE1.appendChild(ParaE3);

    let ParaE4 = document.createElement("p");
    ParaE4.classList.add("offers");
    ParaE4.textContent = `${discountPercentage}% Off`;
    pFooterE1.appendChild(ParaE4);

    PrdctEt.appendChild(pFooterE1);

    let addE1 = document.createElement("div");

    let addbuttonEl = document.createElement("button");
    addbuttonEl.classList.add("add");
    addbuttonEl.textContent = "Add to Cart";
    addE1.appendChild(addbuttonEl);

    PrdctEt.appendChild(addE1);

    searchResultsEl.appendChild(PrdctEt);
  });
}

// Function to view products based on category "Men","Women", "Kids"
function onClick(category) {
  fetchedData().then((data) => {
    let products = {};

    //if statement is used to get specific category  and render product details  in step 22
    if (category === "Men") {
      products = data.categories[0];
      let { category_products } = products;

      renderProductDetails(category_products);
    } else if (category === "Women") {
      products = data.categories[1];
      let { category_products } = products;

      renderProductDetails(category_products);
    } else {
      products = data.categories[2];
      let { category_products } = products;

      renderProductDetails(category_products);
    }
  });
}

// Initial load - show Men's products by default
onClick("Men");
