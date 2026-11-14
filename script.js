
// =====================================
// AGROCONNECT - FRONTEND JAVASCRIPT
// =====================================


// DEMO PRODUCT DATA

const products = [

    {
        id: 1,
        name: "Fresh Organic Vegetables",
        category: "Agriculture",
        location: "Jorhat, Assam",
        price: 45,
        unit: "kg",
        tag: "Fresh harvest",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 2,
        name: "Traditional Bamboo Basket",
        category: "Bamboo & Wood",
        location: "Majuli, Assam",
        price: 350,
        unit: "piece",
        tag: "Handcrafted",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 3,
        name: "Homemade Bakery Box",
        category: "Food",
        location: "Guwahati, Assam",
        price: 280,
        unit: "box",
        tag: "Small batch",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 4,
        name: "Handwoven Textile",
        category: "Textiles",
        location: "Sualkuchi, Assam",
        price: 1200,
        unit: "piece",
        tag: "Traditional craft",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 5,
        name: "Handmade Wooden Décor",
        category: "Handmade",
        location: "Golaghat, Assam",
        price: 650,
        unit: "piece",
        tag: "Made by hand",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 6,
        name: "Fresh Farm Produce",
        category: "Agriculture",
        location: "Nagaon, Assam",
        price: 70,
        unit: "kg",
        tag: "Farm direct",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85"
    }

];


// MARKETPLACE

const productGrid = document.getElementById("productGrid");

const searchInput = document.getElementById("searchInput");

const emptyMessage = document.getElementById("emptyMessage");

const productCount = document.getElementById("productCount");


let selectedCategory = "All";


function displayProducts() {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.location.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });


    productGrid.innerHTML = "";


    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-tag">
                    ${product.tag}
                </span>

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category.toUpperCase()}
                    · ${product.location.toUpperCase()}
                </div>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <span>
                        From <strong>₹${product.price} / ${product.unit}</strong>
                    </span>

                    <span>View details ↗</span>

                </div>

            </div>

        `;

        productGrid.appendChild(card);

    });


    emptyMessage.style.display =
        filteredProducts.length === 0 ? "block" : "none";

    productCount.textContent =
        `${filteredProducts.length} PRODUCTS`;

}


// SEARCH

searchInput.addEventListener("input", displayProducts);


// CATEGORY FILTER

document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        displayProducts();

    });

});


// AUTHENTICATION MODAL

const authModal = document.getElementById("authModal");

let selectedRole = "seller";

let authMode = "register";


function openAuth(mode = "register", role = "seller") {

    authMode = mode;

    if (role === "seller" || role === "buyer") {
        selectedRole = role;
    }

    updateAuthForm();

    authModal.classList.add("open");

    document.body.style.overflow = "hidden";

}


function closeAuth() {

    authModal.classList.remove("open");

    document.body.style.overflow = "";

}


function selectRole(role) {

    selectedRole = role;

    document.getElementById("sellerRole")
        .classList.toggle("selected", role === "seller");

    document.getElementById("buyerRole")
        .classList.toggle("selected", role === "buyer");

    updateAuthForm();

}


function updateAuthForm() {

    const isLogin = authMode === "login";

    document.getElementById("authHeading").textContent =
        isLogin ? "Welcome back" : "Create account";

    document.getElementById("authDescription").textContent =
        isLogin
        ? "Log in to continue your AgroConnect journey."
        : "Tell us who you are — this helps us set up the right tools.";

    document.getElementById("submitBtn").textContent =
        isLogin ? "Log in ↗" : `Create ${selectedRole} account ↗`;

    document.getElementById("switchLabel").textContent =
        isLogin ? "New to AgroConnect?" : "Already have an account?";

    document.getElementById("switchButton").textContent =
        isLogin ? "Create account" : "Log in";


    // Hide registration-only fields during login

    document.getElementById("nameField").style.display =
        isLogin ? "none" : "grid";

    document.getElementById("locationField").style.display =
        isLogin ? "none" : "grid";

    document.getElementById("fullName").required = !isLogin;

    document.getElementById("location").required = !isLogin;


    document.getElementById("sellerRole").disabled = isLogin;

    document.getElementById("buyerRole").disabled = isLogin;

}


function switchAuthMode() {

    authMode = authMode === "login" ? "register" : "login";

    updateAuthForm();

}


// AUTH FORM SUBMISSION

document.getElementById("authForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("fullName").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const location = document.getElementById("location").value;


    if (password.length < 6) {

        showToast("Password must contain at least 6 characters.");

        return;

    }


    if (authMode === "register") {

        console.log("Demo registration:", {
            name,
            email,
            location,
            role: selectedRole
        });

        closeAuth();

        showToast(`Welcome ${name}! Demo registration submitted.`);

    } else {

        console.log("Demo login submitted:", email);

        closeAuth();

        showToast("Demo login submitted successfully.");

    }

    this.reset();

});


// TOAST MESSAGE

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// CLOSE MODAL BY CLICKING OUTSIDE

authModal.addEventListener("click", function(event) {

    if (event.target === authModal) {

        closeAuth();

    }

});


// ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeAuth();

    }

});


// MOBILE NAVIGATION

function toggleMenu() {

    document.querySelector(".navbar").classList.toggle("menu-open");

}


// INITIALIZE

displayProducts();
