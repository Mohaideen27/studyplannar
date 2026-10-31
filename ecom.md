# ShopSphere — Complete Full-Stack E-commerce Project
### A beginner-friendly, portfolio-ready project using React, Django REST Framework, and SQLite

We'll build this project step by step, starting from the fundamentals and progressing toward a complete application that you can run locally, understand, demonstrate in interviews, and upload to GitHub.

Since you're a fresher, the goal isn't just to copy code that works. **The goal is to understand why each part exists, how the frontend communicates with the backend, how the database stores information, and how the entire shopping process works.**

I'll divide the project into multiple parts so that each section is manageable. We'll build a working application rather than attempting to write thousands of lines of code in one response.

---

# 1. Understanding the project

## What is ShopSphere?

ShopSphere is a full-stack online shopping application.

Imagine a customer visiting your website to purchase a book.

The customer can:

1. Browse available books.
2. Search for a particular book.
3. Filter books by category and price.
4. Open a product to view its details.
5. Add products to a shopping cart.
6. Register an account and log in.
7. Enter shipping information.
8. Place an order.
9. View previous orders.
10. Track the status of an order.

You will also create an administrative interface for managing products and inventory.

This project demonstrates that you understand both frontend and backend development.

### What will the finished application look like?



These images are design references, not screenshots of an application we've built. We'll create our own implementation.

## 2. Technologies we'll use

We'll use the technologies you proposed, with a few practical decisions to keep the project beginner-friendly.

| Technology | Purpose | Why we need it |
|---|---|---|
| HTML | Page structure | Organizes page content |
| CSS | Styling | Makes the application visually appealing |
| JavaScript | Programming language | Implements frontend behavior |
| React | Frontend library | Builds reusable UI components |
| React Router | Frontend navigation | Moves between pages without full reloads |
| Axios | HTTP client | Sends requests to the backend |
| Tailwind CSS | Styling framework | Helps create a consistent design |
| Python | Backend language | Implements server-side logic |
| Django | Backend framework | Handles models, authentication, and server infrastructure |
| Django REST Framework | API development | Exposes backend functionality through HTTP APIs |
| SQLite | Database | Stores users, products, carts, and orders |
| Git and GitHub | Version control | Tracks changes and showcases your project |
| Postman | API testing | Tests backend endpoints independently of React |

### What about Redux?

We'll initially use React's built-in state management and Context API for the shopping cart and authentication state.

We'll introduce Redux Toolkit if you want to demonstrate it specifically or if the application's state management becomes more complex.

**Why not use every technology immediately?**

As a beginner, you should first understand React state, props, API requests, and Django REST Framework. Adding Redux before understanding these fundamentals can make the project unnecessarily difficult.

We can still include Redux Toolkit as an optional enhancement later.

---

# 3. Understanding how the application works

Before writing code, let's understand the architecture.



Our application will have three main layers.

### Layer 1: Frontend — React

This is what customers see and interact with.

Examples:

- Product listing page
- Search bar
- Product details page
- Shopping cart
- Login and registration forms
- Checkout page
- Order history page

React is responsible for displaying information and collecting user input.

However, **React is not the authority for prices, inventory, permissions, or order totals**. Those decisions must be validated by the backend.

### Layer 2: Backend — Django REST Framework

The backend processes requests and applies the application's business rules.

For example, when a customer places an order, Django must:

1. Verify that the customer is authenticated.
2. Validate the requested products and quantities.
3. Retrieve the actual prices from the database.
4. Check whether sufficient stock exists.
5. Calculate the total amount.
6. Create the order and its order items.
7. Update inventory.
8. Return the result to React.

The backend must do these checks even if React already performed similar validations.

### Layer 3: Database — SQLite

The database stores persistent information.

For example:

- Product: "Python Programming"
- Price: ₹499
- Available stock: 20
- Customer account
- Cart items
- Order details
- Order history

SQLite is suitable for this learning project because Django supports it by default. We can consider PostgreSQL later if you want to deploy a more production-oriented version.

---

# 4. The complete project roadmap

We'll develop ShopSphere in stages. Each stage builds on the previous one.

| Part | What we'll build | What you'll learn |
|---|---|---|
| 1 | Project setup and architecture | Virtual environments, React setup, project structure |
| 2 | Django models and database | Models, migrations, relationships, ORM |
| 3 | Product APIs | Serializers, views, URLs, CRUD, search and filtering |
| 4 | React frontend foundation | Components, props, state, routing |
| 5 | Product listing and details | Axios, API integration, loading and error states |
| 6 | Shopping cart | Cart state, quantities, price calculations |
| 7 | Authentication | Registration, login, logout, permissions |
| 8 | Checkout and orders | Validation, database transactions, inventory |
| 9 | Order history | User-specific data and order details |
| 10 | Admin product management | Create, update, delete products, manage stock |
| 11 | Testing and security | API tests, authorization, edge cases |
| 12 | Final polish and deployment | Responsive design, GitHub README, deployment preparation |

We will also build a consistent user interface, handle errors, and test the complete shopping flow.

**Important:** We should get a small working version running first. Then we'll add features incrementally, testing each stage before moving to the next.

---

# PART 1 — Set Up the Project

In this part, we'll prepare your development environment and create the initial frontend and backend projects.

By the end, you'll have:

- A React frontend running in your browser.
- A Django backend running locally.
- Django REST Framework installed.
- SQLite configured.
- A clear folder structure for the project.
- A basic API endpoint that React can communicate with later.

## Step 1. Install the required software

Make sure you have the following installed.

| Software | Purpose |
|---|---|
| Python 3.12 or another compatible supported version | Django backend |
| Node.js LTS | React development environment |
| Visual Studio Code | Code editor |
| Git | Version control |
| Postman | API testing |

Download the software from the official websites:

- Python: [Python Downloads](https://www.python.org/downloads/?utm_source=chatgpt.com)
- Node.js: [Node.js Downloads](https://nodejs.org/en/download/?utm_source=chatgpt.com)
- VS Code: [Visual Studio Code](https://code.visualstudio.com/?utm_source=chatgpt.com)
- Git: [Git Downloads](https://git-scm.com/downloads?utm_source=chatgpt.com)
- Postman: [Postman Downloads](https://www.postman.com/downloads/?utm_source=chatgpt.com)

You don't need to install SQLite separately for this project. Django will use SQLite through Python's built-in SQLite support.

### Verify your installations

Open your terminal or command prompt and execute:

```bash
python --version
```

On some systems, you may need:

```bash
python3 --version
```

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

Check Git:

```bash
git --version
```

Each command should display an installed version.

**Beginner concept:** A terminal lets you execute commands on your computer. We'll use it to install libraries, start servers, run database migrations, and test our application.

---

## Step 2. Create the main project folder

Create a directory named `shopsphere`.

Open your terminal and navigate to the location where you want to keep your projects.

Execute:

```bash
mkdir shopsphere
cd shopsphere
```

Your project will eventually have the following structure:

```text
shopsphere/
│
├── backend/
│   ├── manage.py
│   ├── config/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

Don't worry if these folders don't exist yet. We'll create them during the following steps.

### Why separate frontend and backend?

The frontend and backend are different applications.

The frontend runs in the browser and uses React.

The backend runs on your computer or a server and uses Django.

Keeping them in separate folders makes it easier to develop, test, and deploy them independently.

---

## Step 3. Create the Django backend

First, enter the main project folder.

Create a directory for Django:

```bash
mkdir backend
cd backend
```

### 3.1 Create a Python virtual environment

Run:

```bash
python -m venv venv
```

If your system uses `python3`, run:

```bash
python3 -m venv venv
```

A virtual environment provides an isolated place to install Python packages for this project.

For example, another project might require a different Django version. Virtual environments help keep those dependencies separate.

### 3.2 Activate the virtual environment

**Windows — Command Prompt:**

```bat
venv\Scripts\activate.bat
```

**Windows — PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

**macOS or Linux:**

```bash
source venv/bin/activate
```

After activation, your terminal will generally display `(venv)` before the command prompt.

If PowerShell blocks activation, you can use Command Prompt or configure PowerShell according to your organization's security requirements.

### 3.3 Install Django and Django REST Framework

With the virtual environment activated, execute:

```bash
python -m pip install Django djangorestframework django-cors-headers Pillow
```

Let's understand what each package does.

| Package | Purpose |
|---|---|
| `Django` | Backend framework |
| `djangorestframework` | Provides tools for creating REST APIs |
| `django-cors-headers` | Allows the React development server to communicate with Django across different origins |
| `Pillow` | Supports image processing for uploaded product images |

Why install `django-cors-headers`?

During development, React might run at `localhost:5173`, while Django runs at `localhost:8000`. Because these are different origins, the browser can block frontend requests unless Django allows the appropriate cross-origin requests.

We'll configure this package correctly in a later step.

### 3.4 Save the dependencies

Execute:

```bash
python -m pip freeze > requirements.txt
```

This creates a file containing the installed Python package versions.

When someone downloads your project, they can install the recorded dependencies with:

```bash
pip install -r requirements.txt
```

For a professional project, we'll eventually ensure the dependency list contains only the packages the application needs.

---

## Step 4. Create the Django project

While inside the `backend` directory, execute:

```bash
django-admin startproject config .
```

Notice the period (`.`) at the end.

It tells Django to create the project in the current directory rather than creating another nested directory.

Your structure should now look like this:

```text
backend/
│
├── venv/
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── manage.py
└── requirements.txt
```

### What do these files mean?

**`manage.py`**

This is the command-line entry point for managing your Django project.

We'll use it to start the server, create applications, run migrations, and execute tests.

**`config/settings.py`**

Contains the project's configuration, including installed applications, database settings, middleware, and security settings.

**`config/urls.py`**

Defines the URL routes Django should recognize.

**`config/asgi.py` and `config/wsgi.py`**

Provide entry points for application servers that run Django.

You don't need to understand every detail of these files immediately. For now, remember that `settings.py` configures Django and `urls.py` defines its URL routing.

---

## Step 5. Create the Django applications

Django projects can contain multiple applications, each responsible for a specific part of the system.

We'll organize ShopSphere into these applications:

| Django application | Responsibility |
|---|---|
| `products` | Product catalog, categories, search, filtering |
| `cart` | Shopping cart and cart items |
| `orders` | Checkout, order creation, order history |

Authentication will initially use Django's built-in user system.

This separation makes the project easier to understand and maintain.

Execute the following commands from the `backend` directory:

```bash
python manage.py startapp products
python manage.py startapp cart
python manage.py startapp orders
```

Your directory structure will now include:

```text
backend/
│
├── config/
├── products/
│   ├── models.py
│   ├── views.py
│   ├── tests.py
│   └── ...
│
├── cart/
│   ├── models.py
│   ├── views.py
│   └── ...
│
├── orders/
│   ├── models.py
│   ├── views.py
│   └── ...
│
├── manage.py
└── requirements.txt
```

Each application has its own files for defining models, views, tests, and other functionality.

For example, `products/models.py` will contain the database models for products and categories.

---

## Step 6. Configure Django

Open `backend/config/settings.py`.

Find the `INSTALLED_APPS` list.

Add the following entries:

```python
INSTALLED_APPS = [
    # Django built-in applications
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party applications
    "rest_framework",
    "corsheaders",

    # ShopSphere applications
    "products",
    "cart",
    "orders",
]
```

Keep the existing Django entries. The example above shows the complete list you should have at this stage.

### Configure CORS

In the same file, locate `MIDDLEWARE`.

Add `"corsheaders.middleware.CorsMiddleware"` near the beginning, before Django's `CommonMiddleware`:

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",

    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

Preserve any other middleware already present in your file.

For local development, add this setting near the bottom of `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

This allows requests from the specified React development origins.

**Security note:** CORS is not an authentication mechanism. It controls which browser origins can make cross-origin requests. We'll configure authentication and permissions separately. We should not use unrestricted CORS settings as a shortcut.

### Configure SQLite

Django's default project settings already use SQLite.

Find `DATABASES` in `settings.py`. It should resemble:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

You can leave this configuration unchanged.

Django will create the database file when the database setup commands are run.

---

## Step 7. Initialize the database

Django includes several built-in applications that need database tables, including authentication and the administrative interface.

Run:

```bash
python manage.py migrate
```

Django will apply the initial database migrations.

A migration is a versioned change that tells Django how to create or modify database structures.

For example, when we create our `Product` model later, we'll generate a migration that describes the corresponding database table.

Run the following command to verify the project:

```bash
python manage.py check
```

If everything is configured correctly, Django should report:

```text
System check identified no issues (0 silenced).
```

Now start the backend:

```bash
python manage.py runserver
```

Open this address in your browser:

`http://127.0.0.1:8000/`

You should see Django's development welcome page.

**Keep this terminal running.** We'll use another terminal for the React frontend.

---

# PART 2 — Create the React Frontend

Now we'll create the user interface for ShopSphere.

We'll use **React + Vite**. Vite provides a development server and a straightforward way to create modern React applications.

## Step 8. Create the React project

Open a second terminal.

Navigate to the main `shopsphere` directory, not the `backend` directory.

For example:

```bash
cd shopsphere
```

If you're already inside `backend`, use:

```bash
cd ..
```

Create the frontend:

```bash
npm create vite@latest frontend -- --template react
```

If prompted to install Vite's scaffolding package, confirm.

Next:

```bash
cd frontend
npm install
```

Install the libraries we'll use:

```bash
npm install axios react-router-dom
```

These libraries provide the following functionality:

| Library | Purpose |
|---|---|
| React | Build the interface |
| React DOM | Render React components in the browser |
| Vite | Run the development server and bundle the application |
| Axios | Communicate with Django |
| React Router | Navigate between pages |

We'll add Tailwind CSS once the basic application is running. This allows you to understand the initial React structure before adding another layer of tooling.

### Start the frontend

Execute:

```bash
npm run dev
```

Vite will display a local URL, usually:

`http://localhost:5173/`

Open that URL in your browser.

You should see the default Vite and React starter page.

Congratulations! You now have two separate applications:

- Django running at `http://127.0.0.1:8000/`
- React running at `http://localhost:5173/`

Keep both terminals running during development.

---

## Step 9. Understand the React project structure

Your frontend folder should resemble this:

```text
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

Let's understand the important files.

### `main.jsx`

This is the entry point of the React application. It mounts your React component into the HTML page.

### `App.jsx`

This contains the main application component.

We'll eventually use React Router here to define the application's pages.

### `App.css` and `index.css`

These files contain CSS styles.

We can use them for basic styling before integrating Tailwind CSS.

### `package.json`

This file describes the JavaScript project's dependencies and available commands.

For example:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Your actual file may contain additional configuration. Keep the generated configuration unless you have a reason to change it.

---

# PART 3 — Build Your First React Page

Before connecting React to Django, let's create a simple ShopSphere landing page.

This will introduce you to React components, JSX, and rendering data.

## Step 10. Create the initial application

Open `frontend/src/App.jsx`.

Replace its contents with:

```jsx
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">ShopSphere</h1>

        <nav>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
        </nav>
      </header>

      <main className="hero">
        <p className="eyebrow">YOUR EVERYDAY SHOPPING DESTINATION</p>

        <h2>Find products you'll love.</h2>

        <p className="hero-description">
          Discover great products, explore categories, and enjoy
          a simple shopping experience.
        </p>

        <button
          className="primary-button"
          onClick={() => {
            alert("Welcome to ShopSphere!");
          }}
        >
          Explore Products
        </button>
      </main>

      <footer className="footer">
        <p>ShopSphere — A full-stack e-commerce project.</p>
      </footer>
    </div>
  );
}

export default App;
```

### Understand the code

**1. What is a component?**

```jsx
function App() {
  return (
    <div>
      <h1>ShopSphere</h1>
    </div>
  );
}
```

A React component is a reusable piece of user interface.

Here, `App` is a function component that returns JSX.

JSX is a syntax extension that allows you to write markup-like code inside JavaScript.

**2. What does `return` do?**

It returns the interface that React should render.

**3. What does `className` mean?**

In JSX, we use `className` rather than the HTML attribute `class`.

For example:

```jsx
<h1 className="logo">ShopSphere</h1>
```

This allows CSS to target the element:

```css
.logo {
  font-size: 28px;
}
```

**4. What is `onClick`?**

It is a React event handler.

When the user clicks the button, the supplied function runs:

```jsx
onClick={() => {
  alert("Welcome to ShopSphere!");
}}
```

This is a simple demonstration. Later, the button will navigate to the product listing page.

---

## Step 11. Style the page

Open `frontend/src/App.css` and replace its contents with:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f8fafc;
  color: #172033;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 8%;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  margin: 0;
  color: #4f46e5;
  font-size: 26px;
}

.navbar nav {
  display: flex;
  gap: 24px;
}

.navbar a {
  color: #374151;
  text-decoration: none;
  font-size: 15px;
}

.navbar a:hover {
  color: #4f46e5;
}

.hero {
  flex: 1;
  padding: 100px 8%;
  text-align: center;
}

.eyebrow {
  color: #4f46e5;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 2px;
}

.hero h2 {
  margin: 20px 0;
  font-size: clamp(36px, 5vw, 60px);
  line-height: 1.15;
}

.hero-description {
  max-width: 600px;
  margin: 0 auto 30px;
  color: #64748b;
  font-size: 17px;
  line-height: 1.8;
}

.primary-button {
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.primary-button:hover {
  background: #4338ca;
}

.footer {
  padding: 24px;
  background: white;
  text-align: center;
  color: #64748b;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 600px) {
  .navbar {
    padding: 18px 5%;
    flex-wrap: wrap;
    gap: 16px;
  }

  .navbar nav {
    gap: 14px;
  }

  .hero {
    padding: 70px 5%;
  }
}
```

Now open `frontend/src/index.css`.

Remove any existing starter styles that conflict with this layout and add:

```css
html {
  min-width: 320px;
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}
```

Save the files.

Vite should refresh the browser automatically.

You now have your first ShopSphere page.

### Why are we building this before the product page?

Because it establishes a foundation for understanding:

- Components
- JSX
- CSS
- Event handlers
- Responsive design

We'll introduce more advanced React concepts when they become necessary.

---

# PART 4 — Understand and Build the Product Database

Now we'll move to the most important backend concept: **how product information is stored and returned through an API**.

We'll begin with the product catalog because nearly every other e-commerce feature depends on it.

For example:

- The product listing page needs products.
- Product details need a specific product.
- The shopping cart needs product prices and availability.
- Checkout needs reliable product information.

Let's build this foundation properly.

## Step 12. Design the database

We'll start with two models: `Category` and `Product`.

A model is a Python class that Django uses to represent data stored in the database.

### Category model

A category groups similar products.

Examples:

- Books
- Electronics
- Clothing

Our category model will contain:

| Field | Type | Purpose |
|---|---|---|
| `id` | Integer | Unique identifier |
| `name` | String | Category name |
| `description` | Text | Optional description |

### Product model

Our product model will contain:

| Field | Type | Purpose |
|---|---|---|
| `id` | Integer | Unique identifier |
| `name` | String | Product name |
| `description` | Text | Product description |
| `price` | Decimal | Product price |
| `image` | Image | Optional uploaded image |
| `stock_quantity` | Integer | Available inventory |
| `category` | Foreign key | Associated category |
| `created_at` | Date/time | Creation timestamp |

### How are these tables related?

One category can contain multiple products.

For example:

```text
Category: Books
    |
    |---- Product: Python Programming
    |
    |---- Product: Django for Beginners
    |
    |---- Product: JavaScript Essentials
```

This is called a **one-to-many relationship**.

In Django, we represent this relationship using `ForeignKey`.

A product belongs to one category, while a category can be associated with many products.

---

## Step 13. Create the Category and Product models

Open:

`backend/products/models.py`

Replace its contents with:

```python
from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products"
    )

    name = models.CharField(
        max_length=200
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True
    )

    stock_quantity = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
```

Let's understand the important fields.

### `CharField`

```python
name = models.CharField(max_length=200)
```

Stores short text, such as a product name.

`max_length=200` limits the length of the value.

### `TextField`

```python
description = models.TextField()
```

Stores longer text, such as product descriptions.

### `DecimalField`

```python
price = models.DecimalField(
    max_digits=10,
    decimal_places=2
)
```

Stores a decimal number, such as `499.00`.

We use decimal values rather than binary floating-point numbers for prices to avoid common floating-point precision problems.

**Important:** A production payment system should also handle currency explicitly and use a payment provider's required amount format. This project will use one currency, INR, initially.

### `ForeignKey`

```python
category = models.ForeignKey(
    Category,
    on_delete=models.PROTECT,
    related_name="products"
)
```

This associates each product with a category.

We use `PROTECT` so that a category cannot be deleted while products still reference it. An administrator must reassign or remove those products first.

### `PositiveIntegerField`

```python
stock_quantity = models.PositiveIntegerField(default=0)
```

Stores a nonnegative inventory quantity.

We will also enforce inventory rules when processing orders. Database field types alone do not implement the entire purchasing workflow.

### `ImageField`

```python
image = models.ImageField(
    upload_to="products/",
    blank=True,
    null=True
)
```

Allows a product to have an optional uploaded image.

Django will store the image file separately from the database record and store its path in the database.

For the first version, you can use products without uploaded images. We'll configure image uploads and media serving later.

### Why do we define `__str__()`?

```python
def __str__(self):
    return self.name
```

It controls the human-readable representation of a model instance.

Instead of displaying something like `Product object (1)` in Django's administration interface, Django can display the product name.

---

## Step 14. Create the database tables

Open your terminal in the `backend` directory.

Run:

```bash
python manage.py makemigrations products
```

You should see Django report that it created a migration for the product models.

Now execute:

```bash
python manage.py migrate
```

### What just happened?

There are two separate commands here.

**`makemigrations`**

Django examines your model definitions and generates a migration file describing the database changes.

**`migrate`**

Django applies those changes to the database.

Think of migrations as a version history of your database structure.

Whenever you modify your models later, you'll generally need to generate and apply migrations again.

---

## Step 15. Create the product serializer

Django models represent database records. But React cannot directly receive a Python model object over HTTP.

We need to convert model data into a format that can be transmitted over the network.

We'll use JSON.

For example, a product might be represented as:

```json
{
  "id": 1,
  "name": "Python Programming",
  "description": "A beginner-friendly programming book.",
  "price": "499.00",
  "stock_quantity": 20,
  "category": 1
}
```

Django REST Framework uses **serializers** to convert model data into API-friendly representations and validate incoming data.

Open:

`backend/products/serializers.py`

This file doesn't exist by default, so create it.

Add:

```python
from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category

        fields = [
            "id",
            "name",
            "description",
        ]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
            "stock_quantity",
            "category",
            "category_name",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]
```

### Understanding `ModelSerializer`

```python
class ProductSerializer(serializers.ModelSerializer):
```

`ModelSerializer` automatically generates many serializer fields from your Django model.

Without it, you'd need to define many fields and their validation rules manually.

### Understanding `category_name`

```python
category_name = serializers.CharField(
    source="category.name",
    read_only=True
)
```

Our product model stores the category's ID as a foreign key.

However, the frontend might also want to display the category name.

This field allows the API to return both:

```json
{
  "category": 1,
  "category_name": "Books"
}
```

This makes the API more convenient for React.

### Why is `category_name` read-only?

The category name comes from the related category record. The product API should not treat it as a separate field that can change the category's name.

The `category` field is responsible for associating a product with its category.

---

# PART 5 — Build Your First REST API

Now we'll expose product data through HTTP endpoints.

## Step 16. Create the product API views

Open:

`backend/products/views.py`

Replace its contents with:

```python
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Product
from .serializers import ProductSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.select_related(
            "category"
        ).order_by("-created_at")

        search = self.request.query_params.get(
            "search"
        )

        if search:
            queryset = queryset.filter(
                name__icontains=search
            )

        category_id = self.request.query_params.get(
            "category"
        )

        if category_id:
            queryset = queryset.filter(
                category_id=category_id
            )

        min_price = self.request.query_params.get(
            "min_price"
        )

        if min_price:
            queryset = queryset.filter(
                price__gte=min_price
            )

        max_price = self.request.query_params.get(
            "max_price"
        )

        if max_price:
            queryset = queryset.filter(
                price__lte=max_price
            )

        ordering = self.request.query_params.get(
            "ordering"
        )

        allowed_orderings = {
            "price",
            "-price",
            "name",
            "-created_at",
        }

        if ordering in allowed_orderings:
            queryset = queryset.order_by(ordering)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related(
        "category"
    )

    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
```

### What is a view?

A Django REST Framework view receives an HTTP request and determines what response should be returned.

Our first view is:

```python
class ProductListView(generics.ListAPIView):
```

It retrieves a list of products.

Our second view is:

```python
class ProductDetailView(generics.RetrieveAPIView):
```

It retrieves a single product.

These generic views handle much of the standard request-processing logic for us.

### What does `get_queryset()` do?

It determines which products should be returned.

Initially:

```python
queryset = Product.objects.select_related(
    "category"
).order_by("-created_at")
```

This retrieves products ordered by creation time, newest first.

`select_related("category")` helps avoid additional database queries when serializing each product's category information.

### How does search work?

Consider this code:

```python
queryset = queryset.filter(
    name__icontains=search
)
```

`icontains` performs a case-insensitive partial match.

If the search term is `python`, it can match names such as:

- Python Programming
- Learn Python in 30 Days
- Advanced Python Techniques

The frontend doesn't need to download all products and search through them itself. It can send the search term to the backend.

### How do filtering and sorting work?

We support these query parameters:

| Parameter | Example | Purpose |
|---|---|---|
| `search` | `?search=python` | Search product names |
| `category` | `?category=1` | Filter by category ID |
| `min_price` | `?min_price=100` | Set the minimum price |
| `max_price` | `?max_price=1000` | Set the maximum price |
| `ordering` | `?ordering=price` | Sort by ascending price |

For example:

```text
/api/products/?search=python&min_price=100&max_price=1000
```

This returns products matching the search term with prices between 100 and 1000, inclusive.

The `ordering` parameter accepts only the explicitly allowed fields, rather than allowing arbitrary ordering expressions.

**A note about production readiness:** This is a good first implementation. Later, we'll improve validation for malformed query parameters, add pagination, and write automated API tests.

---

## Step 17. Configure the product URLs

We have created the models, serializers, and views. Django still needs to know which URL should invoke each view.

Create:

`backend/products/urls.py`

Add:

```python
from django.urls import path

from .views import ProductDetailView, ProductListView


urlpatterns = [
    path(
        "",
        ProductListView.as_view(),
        name="product-list"
    ),

    path(
        "<int:pk>/",
        ProductDetailView.as_view(),
        name="product-detail"
    ),
]
```

Let's understand the routes.

The empty path represents the product list because we'll include these URLs under `/api/products/`.

The detail path:

```python
"<int:pk>/"
```

matches a URL containing an integer.

For example:

```text
/api/products/1/
```

Django passes the integer `1` to the detail view as the primary key, or `pk`.

Now open:

`backend/config/urls.py`

Replace its contents with:

```python
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/products/",
        include("products.urls")
    ),
]
```

Our product endpoints are now:

| HTTP method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products/` | Retrieve all products |
| GET | `/api/products/1/` | Retrieve product with ID 1 |
| GET | `/api/products/?search=python` | Search products |
| GET | `/api/products/?category=1` | Filter by category |
| GET | `/api/products/?min_price=100&max_price=1000` | Filter by price |
| GET | `/api/products/?ordering=price` | Sort by ascending price |

The detail endpoint expects an existing product ID. If the product doesn't exist, DRF returns a `404 Not Found` response.

Notice that we haven't implemented product creation, editing, or deletion through these endpoints yet. We'll implement those operations through a restricted administrative interface and, later, optional management APIs.

---

## Step 18. Register the models in Django Admin

We need a convenient way to add products to our database.

Instead of manually inserting records into SQLite, we'll use Django's built-in administrative interface.

Open:

`backend/products/admin.py`

Add:

```python
from django.contrib import admin

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "stock_quantity",
        "created_at",
    )

    list_filter = ("category",)
    search_fields = ("name", "description")
    ordering = ("-created_at",)
```

This configures the administration interface to display useful product information and provide search and filtering controls.

### Create an administrator account

Run this command from the backend directory:

```bash
python manage.py createsuperuser
```

Django will ask for a username, email address, and password. Follow the prompts.

Start the server if it isn't already running:

```bash
python manage.py runserver
```

Open:

`http://127.0.0.1:8000/admin/`

Log in with the administrator credentials you created.

You should now see the Categories and Products sections.

### Add sample data

First, create a category:

```text
Name: Books
Description: Books for learning programming and technology.
```

Then create another category:

```text
Name: Electronics
Description: Electronic accessories and devices.
```

Create some products in the Products section.

For example:

| Name | Category | Price | Stock |
|---|---|---:|---:|
| Python Programming | Books | 499.00 | 20 |
| Django for Beginners | Books | 599.00 | 15 |
| JavaScript Essentials | Books | 399.00 | 25 |
| Wireless Mouse | Electronics | 799.00 | 10 |
| USB-C Hub | Electronics | 1499.00 | 8 |

Enter descriptions for the products as well.

For now, you can leave their images empty. We'll implement image handling in a later part.

**Why are we adding sample data manually?**

Our API needs real database records to return meaningful results.

The admin interface lets us create those records without building the product management frontend first.

This is a normal development workflow: create the backend data structures, populate them with sample data, and test the API before integrating the frontend.

---

## Step 19. Test your first API

Open this address in your browser:

`http://127.0.0.1:8000/api/products/`

You should receive a JSON response containing your products.

The exact fields and IDs will depend on the records you created. A simplified response might look like this:

```json
[
  {
    "id": 1,
    "name": "Python Programming",
    "description": "A beginner-friendly programming book.",
    "price": "499.00",
    "image": null,
    "stock_quantity": 20,
    "category": 1,
    "category_name": "Books",
    "created_at": "2026-10-31T06:00:00Z"
  }
]
```

The timestamp above is illustrative; your actual response will contain the record's creation time.

Now test a product detail endpoint:

`http://127.0.0.1:8000/api/products/1/`

If product ID 1 exists, the API should return its details.

Try searching:

`http://127.0.0.1:8000/api/products/?search=python`

Try filtering by price:

`http://127.0.0.1:8000/api/products/?min_price=400&max_price=800`

Try sorting:

`http://127.0.0.1:8000/api/products/?ordering=price`

If these requests work, you've built your first working Django REST API!

### What have you accomplished?

You've implemented the core backend workflow:

```text
HTTP Request
     |
     v
Django URL Router
     |
     v
API View
     |
     v
Django ORM
     |
     v
SQLite Database
     |
     v
Product Model
     |
     v
Product Serializer
     |
     v
JSON Response
```

This is one of the most important concepts in Django REST Framework.

Let's summarize each part:

- **URL router:** Determines which view handles the request.
- **View:** Processes the request and selects the required data.
- **ORM:** Queries the database using Python.
- **Model:** Defines the structure of stored data.
- **Serializer:** Converts the data into JSON-compatible values.
- **Response:** Sends the result back to the client.

You should understand this flow before moving on to more complicated features such as authentication and checkout.

---

# PART 6 — Connect React to Django

This is where your project starts behaving like a real full-stack application.

Until now, React has displayed a static page, and Django has returned product information independently.

Now we'll connect them.

## Step 20. Understand API communication

Imagine a customer opens the ShopSphere website.

React needs to display the products stored in SQLite.

The process looks like this:

```text
Customer opens ShopSphere
          |
          v
React Product Page
          |
          v
Axios sends GET request
          |
          v
Django REST API
          |
          v
SQLite Database
          |
          v
Django returns JSON
          |
          v
React receives product data
          |
          v
React displays product cards
```

React doesn't connect directly to SQLite.

Instead, React communicates with Django through HTTP requests.

This separation is fundamental to full-stack development.

---

## Step 21. Create an Axios API client

Inside `frontend/src`, create a folder named `api`.

Create this file:

`frontend/src/api/client.js`

Add:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

### Why create a separate API client?

Without this file, you might repeatedly write:

```javascript
axios.get("http://127.0.0.1:8000/api/products/");
```

As the application grows, you'll have many API requests.

A shared Axios client allows us to configure the backend address in one place.

Later, we can add authentication headers, request interceptors, and centralized error handling.

For a deployed application, we'll also move the API address into an environment variable.

---

## Step 22. Create the product listing page

Inside `frontend/src`, create a folder named `pages`.

Create:

`frontend/src/pages/ProductList.jsx`

Add the following code:

```jsx
import { useEffect, useState } from "react";
import api from "../api/client";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("products/");

        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="page-message">Loading products...</p>;
  }

  if (error) {
    return <p className="page-message">{error}</p>;
  }

  return (
    <main className="products-page">
      <h1>Explore Products</h1>

      <p className="products-subtitle">
        Discover products available in our store.
      </p>

      {products.length === 0 ? (
        <p>No products are available yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <div className="product-image-placeholder">
                {product.category_name}
              </div>

              <div className="product-card-content">
                <p className="product-category">
                  {product.category_name}
                </p>

                <h2>{product.name}</h2>

                <p className="product-description">
                  {product.description}
                </p>

                <p className="product-price">
                  ₹{Number(product.price).toFixed(2)}
                </p>

                <p className="product-stock">
                  {product.stock_quantity > 0
                    ? "In stock"
                    : "Out of stock"}
                </p>

                <button
                  className="product-button"
                  disabled={product.stock_quantity === 0}
                  onClick={() => {
                    alert(
                      `${product.name} selected!`
                    );
                  }}
                >
                  View Product
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductList;
```

### Let's understand the important React concepts

#### 1. `useState`

```jsx
const [products, setProducts] = useState([]);
```

`useState` stores information that can change over time.

Initially, `products` is an empty array.

When the API returns product information, we update the state:

```jsx
setProducts(response.data);
```

React then renders the component again with the updated information.

We also maintain two other pieces of state:

- `loading`: Indicates whether the API request is still running.
- `error`: Stores an error message if the request fails.

This gives users meaningful feedback instead of leaving the page blank.

#### 2. `useEffect`

```jsx
useEffect(() => {
  // Fetch products
}, []);
```

`useEffect` lets us perform side effects, such as fetching data from an API.

The empty dependency array means React runs this effect when the component mounts, rather than after every render.

In React development mode, Strict Mode can cause effects to run an additional time to help identify problems. Therefore, you may observe more than one request during development.

#### 3. `async` and `await`

```jsx
const response = await api.get("products/");
```

The request is asynchronous.

React doesn't need to freeze the entire interface while waiting for Django to respond.

When the response arrives, we update the component state.

#### 4. `map()`

```jsx
products.map((product) => (
  <article key={product.id}>
    <h2>{product.name}</h2>
  </article>
))
```

The `map()` function transforms an array into a collection of React elements.

If Django returns five products, React generates five product cards.

The `key` helps React identify individual elements when the list changes.

#### 5. Why convert the price with `Number()`?

The serializer returns decimal prices as strings by default.

For display, we convert the value into a JavaScript number and format it to two decimal places.

Remember that this is only for presentation. We will not use JavaScript calculations as the authoritative source of order totals.

---

## Step 23. Style the product page

Create:

`frontend/src/pages/ProductList.css`

Add:

```css
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.products-page h1 {
  margin-bottom: 8px;
  font-size: 34px;
}

.products-subtitle {
  margin-bottom: 32px;
  color: #64748b;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.product-card {
  overflow: hidden;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.product-image-placeholder {
  display: grid;
  place-items: center;
  height: 180px;
  background: #eef2ff;
  color: #4f46e5;
  font-weight: bold;
}

.product-card-content {
  padding: 20px;
}

.product-category {
  color: #4f46e5;
  font-size: 13px;
  font-weight: bold;
}

.product-card h2 {
  font-size: 19px;
}

.product-description {
  min-height: 48px;
  color: #64748b;
  line-height: 1.5;
}

.product-price {
  font-size: 22px;
  font-weight: bold;
}

.product-stock {
  font-size: 14px;
  color: #15803d;
}

.product-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}

.product-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.page-message {
  padding: 60px 24px;
  text-align: center;
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .products-page {
    padding: 32px 16px;
  }
}
```

At the top of `ProductList.jsx`, add this import:

```jsx
import "./ProductList.css";
```

---

## Step 24. Add React Router

We need navigation between the homepage and product listing page.

Open `frontend/src/App.jsx` and replace its contents with:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProductList from "./pages/ProductList";
import "./App.css";


function Home() {
  return (
    <main className="hero">
      <p className="eyebrow">
        YOUR EVERYDAY SHOPPING DESTINATION
      </p>

      <h2>Find products you'll love.</h2>

      <p className="hero-description">
        Discover products, explore categories, and enjoy
        a simple shopping experience.
      </p>

      <Link to="/products" className="primary-button">
        Explore Products
      </Link>
    </main>
  );
}


function NotFound() {
  return (
    <main className="hero">
      <h2>Page not found</h2>
      <Link to="/">Return Home</Link>
    </main>
  );
}


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="navbar">
          <Link to="/" className="logo">
            ShopSphere
          </Link>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<ProductList />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="footer">
          <p>ShopSphere — A full-stack e-commerce project.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

We also need to make one small adjustment in `App.css` so the navigation links don't display the browser's default styling.

Add:

```css
.navbar .logo {
  text-decoration: none;
}

.primary-button {
  display: inline-block;
  text-decoration: none;
}
```

### What is React Router?

React Router maps browser URLs to React components.

For example:

| URL | Component |
|---|---|
| `/` | `Home` |
| `/products` | `ProductList` |
| Any unmatched URL | `NotFound` |

We use `Link` instead of ordinary navigation links because it allows React Router to navigate between pages without performing a full-page reload.

---

# PART 7 — Test Your First Full-Stack Feature

Let's verify that the frontend and backend work together.

### Step 25. Start the applications

**Terminal 1 — Backend**

Navigate to `shopsphere/backend`, activate your virtual environment if necessary, and execute:

```bash
python manage.py runserver
```

**Terminal 2 — Frontend**

Navigate to `shopsphere/frontend` and execute:

```bash
npm run dev
```

Open:

`http://localhost:5173/`

Click **Explore Products**.

You should see the products you created through Django Admin.

### If the products don't appear

Check these common problems.

**Problem 1: Django server isn't running**

Open the backend address directly:

`http://127.0.0.1:8000/api/products/`

If it doesn't load, fix the backend first.

**Problem 2: No products exist**

Visit Django Admin and create some products.

**Problem 3: CORS error**

Verify that `django-cors-headers` is installed, that its middleware is configured correctly, and that the frontend origin is allowed in Django settings.

**Problem 4: Incorrect API address**

Check `frontend/src/api/client.js`:

```javascript
baseURL: "http://127.0.0.1:8000/api/"
```

**Problem 5: Incorrect product URL configuration**

Verify that `config/urls.py` includes the product URLs under `/api/products/`.

Browser developer tools can help you investigate these problems. Open them with `F12` and inspect the Console and Network tabs.

---

# PART 8 — What We've Built and What Comes Next

At this stage, you have implemented a genuine full-stack feature rather than a static mockup.

Your application can:

- Store product and category information in SQLite.
- Manage products through Django Admin.
- Expose product information through Django REST Framework.
- Search, filter, and sort products through query parameters.
- Retrieve individual products.
- Fetch product data from React using Axios.
- Display products dynamically.
- Navigate between the homepage and product listing page.

You have also learned several important concepts:

| Concept | What you learned |
|---|---|
| Django models | How database structures are defined |
| Django ORM | How Python interacts with database records |
| Migrations | How model changes become database changes |
| Serializers | How database objects become JSON |
| API views | How HTTP requests are processed |
| URL routing | How endpoints map to views |
| Axios | How React communicates with Django |
| React state | How dynamic data is stored |
| `useEffect` | How to fetch data when a component mounts |
| React Router | How to implement frontend navigation |

## What's still missing?

Our application is not yet a complete shopping experience.

The next stages should be implemented in this order:

1. **Product details:** Display full information about an individual product.
2. **Search and filtering UI:** Add search fields, category filters, price filters, and sorting controls.
3. **Shopping cart:** Allow users to add products, update quantities, and remove items.
4. **Authentication:** Implement registration, login, logout, and permissions.
5. **Checkout:** Collect shipping information and create orders.
6. **Order history:** Show the authenticated user's previous purchases.
7. **Admin improvements:** Add inventory controls and any necessary product management APIs.
8. **Testing and security:** Validate permissions, stock, prices, and order totals.
9. **Final polish:** Add image uploads, responsive styling, documentation, and deployment.

The order matters. For example, checkout depends on products and inventory, while order history depends on authentication and order creation.

### One important security principle

When we implement checkout, React must never be allowed to determine the authoritative purchase price or final order total.

The backend will calculate totals using database prices, verify available stock, and create the order within a database transaction. We'll also ensure customers can access only their own orders.

These are the kinds of implementation details that help distinguish a portfolio project from a basic tutorial application.

---

## Your next milestone

Before moving forward, make sure you can complete these tasks without copying commands blindly:

- [ ] Start the Django server.
- [ ] Start the React server.
- [ ] Create a category in Django Admin.
- [ ] Add at least five products.
- [ ] Open the product API and understand the JSON response.
- [ ] Display those products on the React page.
- [ ] Search for a product using an API query parameter.
- [ ] Explain how a product travels from SQLite to the React interface.

**Once these steps work, the foundation of ShopSphere is ready.**

The next part should focus on the **product details page, working search and filters, and the shopping cart**, followed by authentication and the complete order workflow. We should test each feature before moving to the next rather than building everything at once.