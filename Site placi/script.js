// Initialize the cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Event listener for "Add to Cart" button
document.getElementById('add-to-cart')?.addEventListener('click', function() {
    // Get the product details
    const productName = document.querySelector('.product-info h1').innerText;
    const productPrice = document.querySelector('.current-price').innerText;
    const productQuantity = document.getElementById('quantity').value;

    // Create a cart item object
    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: productQuantity
    };

    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex > -1) {
        // If it exists, update the quantity
        cart[existingItemIndex].quantity = parseInt(cart[existingItemIndex].quantity) + parseInt(productQuantity);
    } else {
        // Otherwise, add the new item to the cart
        cart.push(cartItem);
    }

    // Save updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count display
    updateCartCount();
});

// Function to update the cart count displayed in the cart button
function updateCartCount() {
    const totalCount = cart.reduce((total, item) => total + parseInt(item.quantity), 0);
    document.getElementById('cart-count').innerText = totalCount;
}

// Call this function on page load to initialize cart count
updateCartCount();

// Function to navigate to the cart page
function goToCart() {
    window.location.href = 'cart.html';
}

// Function to navigate to the order details page
function goToOrderDetails() {
    window.location.href = 'order-details.html';
}

// Add event listener for "View Cart" button on the home page
document.getElementById('view-cart')?.addEventListener('click', goToCart);

// Add event listener for "Buy Now" button on the home page
document.getElementById('buy-now')?.addEventListener('click', function() {
    // Optionally, you can also add the item to the cart before going to the order page
    goToOrderDetails();
});

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} x ${item.quantity}`;
            cartItemsList.appendChild(li);
        });
    }
}

// Function to go back to home
function goToHome() {
    window.location.href = 'index.html';
}

// Call this function when the cart page loads
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
