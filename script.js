let cart = [];
let orders = [];
let directOrderItems = [];

let categoryFoods = {
    "Non-Veg Starters": [
        { name: "Chicken 65", price: "₹220" },
        { name: "Chicken Tikka", price: "₹260" },
        { name: "Chicken Manchurian", price: "₹240" },
        { name: "Chicken Wings", price: "₹280" },
        { name: "Mutton Kebab", price: "₹320" }
    ],

    "Veg Starters": [
        { name: "Gobi Manchurian", price: "₹180" },
        { name: "Paneer Tikka", price: "₹220" },
        { name: "Veg Spring Rolls", price: "₹160" },
        { name: "Chilli Paneer", price: "₹210" },
        { name: "Mushroom 65", price: "₹190" }
    ],

    "Soups": [
        { name: "Tomato Soup", price: "₹120" },
        { name: "Sweet Corn Soup", price: "₹140" },
        { name: "Hot & Sour Soup", price: "₹150" },
        { name: "Chicken Soup", price: "₹170" },
        { name: "Manchow Soup", price: "₹160" }
    ],

    "Fish & Sea food": [
        { name: "Fish Fry", price: "₹280" },
        { name: "Prawn Fry", price: "₹320" },
        { name: "Fish Curry", price: "₹300" },
        { name: "Chilli Fish", price: "₹290" },
        { name: "Garlic Prawns", price: "₹340" }
    ],

    "Main Course": [
        { name: "Butter Chicken", price: "₹280" },
        { name: "Paneer Butter Masala", price: "₹220" },
        { name: "Chicken Curry", price: "₹260" },
        { name: "Veg Curry", price: "₹180" },
        { name: "Chicken Biryani", price: "₹280" },
        { name: "Mutton Biryani", price: "₹350" },
        { name: "Veg Biryani", price: "₹200" },
        { name: "Mushroom Biryani", price: "₹220" }
    ],

    "Noodles": [
        { name: "Veg Noodles", price: "₹160" },
        { name: "Chicken Noodles", price: "₹200" },
        { name: "Egg Noodles", price: "₹180" },
        { name: "Schezwan Noodles", price: "₹190" },
        { name: "Mushroom Noodles", price: "₹180" }
    ],

    "Salads": [
        { name: "Green Salad", price: "₹100" },
        { name: "Fruit Salad", price: "₹130" },
        { name: "Chicken Salad", price: "₹180" },
        { name: "Paneer Salad", price: "₹160" },
        { name: "Russian Salad", price: "₹150" }
    ],

    "Desserts": [
        { name: "Gulab Jamun", price: "₹100" },
        { name: "Ice Cream", price: "₹120" },
        { name: "Brownie", price: "₹150" },
        { name: "Fruit Custard", price: "₹130" },
        { name: "Rasmalai", price: "₹140" }
    ]
};


function showCategory(category) {
    let section = document.getElementById("categorySection");
    let title = document.getElementById("categoryTitle");
    let items = document.getElementById("categoryItems");

    title.innerText = category;
    items.innerHTML = "";

    categoryFoods[category].forEach(function(food) {

        items.innerHTML += `
            <div class="category-item">

                <div>
                    <p class="category-item-name">
                        ${food.name}
                    </p>

                    <p class="category-item-price">
                        ${food.price}
                    </p>
                </div>

                <button
                    class="custom-button category-add-button"
                    onclick="addToCart('${food.name}')">

                    Add to Cart

                </button>

            </div>
        `;
    });

    section.classList.add("show");

    section.scrollIntoView({
        behavior: "smooth"
    });
}


function closeCategory() {
    document.getElementById("categorySection")
        .classList.remove("show");
}


function addToCart(item) {
    let existingItem = cart.find(function(cartItem) {
        return cartItem.name === item;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: item,
            quantity: 1
        });
    }

    updateCartCount();

    alert(item + " added to cart!");
}


function updateCartCount() {
    let totalQuantity = 0;

    cart.forEach(function(item) {
        totalQuantity += item.quantity;
    });

    document.getElementById("cartCount").innerText = totalQuantity;
}


function openCart() {
    document.getElementById("cartModal").style.display = "flex";
    displayCart();
}


function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}


function displayCart() {
    let cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function(item, index) {

        let food = null;

        for (let category in categoryFoods) {

            let found = categoryFoods[category].find(function(foodItem) {
                return foodItem.name === item.name;
            });

            if (found) {
                food = found;
                break;
            }
        }

        let price = food ? food.price : "";

        cartItems.innerHTML += `
            <div class="cart-item">

                <div>
                    <p class="cart-item-name">
                        ${item.name}
                    </p>

                    <p class="cart-item-price">
                        ${price}
                    </p>
                </div>

                <div class="cart-controls">

                    <button
                        class="quantity-button"
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span class="quantity-number">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-button"
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });
}


function increaseQuantity(index) {
    cart[index].quantity++;

    updateCartCount();
    displayCart();
}


function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCartCount();
    displayCart();
}


function removeFromCart(index) {
    cart.splice(index, 1);

    updateCartCount();
    displayCart();
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    closeCart();

    setTimeout(function() {
        openOrderForm(true);
    }, 200);
}


function openOrderForm(fromCart = false) {
    document.getElementById("orderForm").style.display = "flex";

    let directFields =
        document.getElementById("directOrderFields");

    let cartFields =
        document.getElementById("cartAddItemSection");

    if (fromCart) {

        directFields.style.display = "none";
        cartFields.style.display = "block";

        displayCheckoutOrder();

    } else {

        directFields.style.display = "block";
        cartFields.style.display = "none";

        displayDirectOrderItems();
    }
}


function closeOrderForm() {
    document.getElementById("orderForm").style.display = "none";

    document.getElementById("orderMessage").innerText = "";
}


function showFoodItems() {
    let category =
        document.getElementById("foodCategory").value;

    let foodItem =
        document.getElementById("foodItem");

    foodItem.innerHTML =
        '<option value="">Select Food Item</option>';

    if (category === "") {
        foodItem.style.display = "none";
        return;
    }

    categoryFoods[category].forEach(function(food) {

        foodItem.innerHTML += `
            <option value="${food.name}">
                ${food.name} - ${food.price}
            </option>
        `;
    });

    foodItem.style.display = "block";
}


function addDirectOrderItem() {
    let category =
        document.getElementById("foodCategory").value;

    let food =
        document.getElementById("foodItem").value;

    let quantity =
        parseInt(document.getElementById("quantity").value);

    if (category === "" || food === "") {
        alert("Please select category and food item.");
        return;
    }

    if (quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }

    let existingItem = directOrderItems.find(function(item) {
        return item.name === food;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        directOrderItems.push({
            name: food,
            quantity: quantity
        });
    }

    displayDirectOrderItems();

    document.getElementById("foodCategory").value = "";

    document.getElementById("foodItem").innerHTML =
        '<option value="">Select Food Item</option>';

    document.getElementById("foodItem").style.display = "none";

    document.getElementById("quantity").value = "1";
}


function displayDirectOrderItems() {
    let list =
        document.getElementById("directOrderList");

    if (directOrderItems.length === 0) {
        list.innerHTML = "";
        return;
    }

    list.innerHTML = "<h3>Your Order</h3>";

    directOrderItems.forEach(function(item, index) {

        list.innerHTML += `
            <div class="direct-order-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <button
                    type="button"
                    onclick="removeDirectOrderItem(${index})">

                    Remove

                </button>

            </div>
        `;
    });
}


function removeDirectOrderItem(index) {
    directOrderItems.splice(index, 1);

    displayDirectOrderItems();
}


function showCartFoodItems() {
    let category =
        document.getElementById("cartFoodCategory").value;

    let foodItem =
        document.getElementById("cartFoodItem");

    foodItem.innerHTML =
        '<option value="">Select Food Item</option>';

    if (category === "") {
        foodItem.style.display = "none";
        return;
    }

    categoryFoods[category].forEach(function(food) {

        foodItem.innerHTML += `
            <option value="${food.name}">
                ${food.name} - ${food.price}
            </option>
        `;
    });

    foodItem.style.display = "block";
}


function addCartOrderItem() {
    let category =
        document.getElementById("cartFoodCategory").value;

    let food =
        document.getElementById("cartFoodItem").value;

    let quantity =
        parseInt(document.getElementById("cartQuantity").value);

    if (category === "" || food === "") {
        alert("Please select category and food item.");
        return;
    }

    if (quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }

    let existingItem = cart.find(function(item) {
        return item.name === food;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: food,
            quantity: quantity
        });
    }

    updateCartCount();

    displayCheckoutOrder();

    document.getElementById("cartFoodCategory").value = "";

    document.getElementById("cartFoodItem").innerHTML =
        '<option value="">Select Food Item</option>';

    document.getElementById("cartFoodItem").style.display = "none";

    document.getElementById("cartQuantity").value = "1";
}


function displayCheckoutOrder() {
    let checkoutOrder =
        document.getElementById("checkoutOrder");

    if (cart.length === 0) {
        checkoutOrder.innerHTML = "";
        return;
    }

    checkoutOrder.innerHTML = "<h3>Your Order</h3>";

    cart.forEach(function(item, index) {

        checkoutOrder.innerHTML += `
            <div class="checkout-order-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <button
                    type="button"
                    onclick="removeCheckoutItem(${index})">

                    Remove

                </button>

            </div>
        `;
    });
}


function removeCheckoutItem(index) {
    cart.splice(index, 1);

    updateCartCount();

    displayCheckoutOrder();

    if (cart.length === 0) {
        closeOrderForm();
        openCart();
    }
}


function placeOrder() {
    let name =
        document.getElementById("customerName").value.trim();

    let phone =
        document.getElementById("customerPhone").value.trim();

    let address =
        document.getElementById("customerAddress").value.trim();

    if (name === "" || phone === "" || address === "") {

        document.getElementById("orderMessage").style.color = "red";

        document.getElementById("orderMessage").innerText =
            "Please fill all the details.";

        return;
    }

    let orderItems;

    if (cart.length > 0) {

        orderItems = cart.map(function(item) {
            return item.name + " x " + item.quantity;
        });

    } else {

        if (directOrderItems.length === 0) {

            document.getElementById("orderMessage").style.color = "red";

            document.getElementById("orderMessage").innerText =
                "Please add at least one item.";

            return;
        }

        orderItems = directOrderItems.map(function(item) {
            return item.name + " x " + item.quantity;
        });
    }

    let newOrder = {
        id: orders.length + 1,
        items: orderItems,
        customer: name,
        phone: phone,
        address: address,
        status: "Order Placed"
    };

    orders.push(newOrder);

    cart = [];
    directOrderItems = [];

    updateCartCount();

    document.getElementById("orderMessage").style.color = "green";

    document.getElementById("orderMessage").innerText =
        "Order Placed Successfully!";

    setTimeout(function() {

        closeOrderForm();

        displayOrders();

        document.getElementById("customerName").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("customerAddress").value = "";

        document.getElementById("foodCategory").value = "";

        document.getElementById("foodItem").innerHTML =
            '<option value="">Select Food Item</option>';

        document.getElementById("foodItem").style.display = "none";

        document.getElementById("quantity").value = "1";

        document.getElementById("cartFoodCategory").value = "";

        document.getElementById("cartFoodItem").innerHTML =
            '<option value="">Select Food Item</option>';

        document.getElementById("cartFoodItem").style.display = "none";

        document.getElementById("cartQuantity").value = "1";

        document.getElementById("directOrderList").innerHTML = "";

        document.getElementById("checkoutOrder").innerHTML = "";

        document.getElementById("orderMessage").innerText = "";

    }, 1500);
}


function openMyOrders() {
    document.getElementById("myOrdersModal").style.display = "flex";

    displayOrders();
}


function closeMyOrders() {
    document.getElementById("myOrdersModal").style.display = "none";
}


function displayOrders() {
    let ordersList =
        document.getElementById("ordersList");

    if (orders.length === 0) {

        ordersList.innerHTML =
            "<p>No orders placed yet.</p>";

        return;
    }

    ordersList.innerHTML = "";

    orders.forEach(function(order) {

        ordersList.innerHTML += `
            <div class="order-item">

                <h5>
                    Order #${order.id}
                </h5>

                <p>
                    <strong>Items:</strong>
                    ${order.items.join(", ")}
                </p>

                <p>
                    <strong>Name:</strong>
                    ${order.customer}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${order.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${order.address}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="order-status">
                        ${order.status}
                    </span>
                </p>

            </div>
        `;
    });
}


window.addEventListener("click", function(event) {

    if (event.target === document.getElementById("cartModal")) {
        closeCart();
    }

    if (event.target === document.getElementById("myOrdersModal")) {
        closeMyOrders();
    }

    if (event.target === document.getElementById("orderForm")) {
        closeOrderForm();
    }

});
