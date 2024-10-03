// Global variables
let cartItems = [];

// Load cart items from local storage on page load
window.onload = function() {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
        cartItems = storedCartItems;
        updateCartDisplay();
    }
};

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cartItems.push(product);
        updateCartDisplay();
        saveCartToLocalStorage(); // Save to local storage
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <span class="item-name">${item.name}</span><br>
                <span class="item-quantity">Quantity: ${item.quantity}</span>
            </div>
        `;
        cartItemsContainer.appendChild(li);
    });
    document.getElementById('cart-count').innerText = cartItems.length;
}

// Function to clear the cart
function clearCart() {
    cartItems = [];
    updateCartDisplay();
    localStorage.removeItem('cartItems'); // Clear from local storage
    alert("Cart cleared!"); // Notify user
}

// Function to save cart items to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function for navigation to the home page
function goToHome() {
    window.location.href = 'index.html'; // Change this to your home page URL
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        // Collect form values
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const productName = document.getElementById('product-name').value;
        const quantity = document.getElementById('quantity').value;

        // Prepare order details
        const orderDetails = {
            name,
            address,
            phone,
            productName,
            quantity
        };

        // Send order details to the server
        fetch('http://localhost:3000/send-email', { // Update URL if hosted differently
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => {
            if (response.ok) {
                alert('Order placed successfully! An email has been sent to the seller.');
                clearCart(); // Clear the cart after placing the order
                goToHome(); // Redirect to home
            } else {
                alert('There was an issue placing your order. Please try again.');
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    });
});
