// Retrieve products from localStorage or initialize as an empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

const ActionButton = document.getElementById('ActionButton');
const productForm = document.getElementById('productForm');
const productsTable = document.getElementById('productsTable').querySelector('tbody');

// Create or Update Product
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const productId = parseInt(document.getElementById('productId').value);
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = document.getElementById('productPrice').value;
    const quantity = document.getElementById('productQuantity').value;
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').value;
    ActionButton.innerHTML="Add Product";


     if (productId !== -1) {
        // Update existing product
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = { id: productId, name, category, price,quantity, description, image };
        }
    } 
    else {
        // Create new product
        const newProduct = {
            id: Date.now(),
            name,
            category,
            price,
            quantity,
            description,
            image
        };
        
        products.push(newProduct);
    }

    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Clear the form
    productForm.reset();   
    document.getElementById("productId").value = -1;

    // Render the updated product list
    renderProductList();
});

// Delete Product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderProductList();
}

// Edit Product
function editProduct(id) {
    const product = products.find(product => product.id === id);
    
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImage').value = product.image;
    ActionButton.innerHTML="Save";

    // Store the product ID in a hidden field or adjust this according to your form structure
    const existingProductId = productForm.querySelector('input[name="existingProductId"]');
    if (existingProductId) {
        existingProductId.value = product.id;
    }
}

// Render Product List in Table
function renderProductList() {
    productsTable.innerHTML = ''; // Clear the current list

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.description}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>
                <a href="#">
                <button class="btn btn-primary" onclick="editProduct(${product.id})" >Edit</button>
                </a>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productsTable.appendChild(row);
    });
}

// Initial render
renderProductList();
