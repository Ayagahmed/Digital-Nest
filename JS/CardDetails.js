const productId = new URLSearchParams(window.location.search).get("id");

const product_image  = document.getElementById("product-image");
const product_title = document.getElementById("product-title");
const product_description = document.getElementById("product-description");
const product_price = document.getElementById("product-price");
const product_rating = document.getElementById("product-rating");
const product_category = document.getElementById("product-category");
const Product_Anchor = document.getElementById("Product-Anchor");


    
function PrintCardDetails()
{
    fetchProducts(products =>
    {
        const product = products.find(i => i.id == productId);
        console.log('Product Details:', product);
        product_image.src = product.image;
        product_title.innerHTML = product.name; 
        product_description.innerHTML = product.description;
        product_price.innerHTML = "$" + product.price
        product_rating.innerHTML = product.rating;
        product_category.innerHTML = product.category;
        Product_Anchor.href = product.image; 
    }
    )
}

document.addEventListener('DOMContentLoaded',PrintCardDetails());