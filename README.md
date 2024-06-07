# Shopza - Where Comfort Meets Style

Welcome to Shopza, an exciting e-commerce platform where people can buy clothes for men and women. Our website is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and offers a variety of features including user authentication, product browsing, cart management, order tracking, and online payments via Razorpay.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Test Shopza](#test-shopza)

## Features

- User authentication (Sign up, Log in, Log out)
- Browse products by category (Men, Women)
- Add products to cart
- Manage cart items
- Place orders
- View order history
- Exciting offers and discounts
- Online payment integration with Razorpay
- Wishlist management
- Responsive design for seamless experience on all devices

## Installation

To get started with Shopza, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/VedantDewangan/ShopZa.git
    ```

2. Install server dependencies:
    ```bash
    cd ShopZa/server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the `server` directory and add:
      ```plaintext
      PORT=your_port_number
      RAZORPAY_KEY_ID=your_razorpay_key_id
      RAZORPAY_SECRET_ID=your_razorpay_secret_id
      ```

5. Start the development servers:
    - In the `server` directory:
        ```bash
        node server.js
        ```
    - In the `client` directory:
        ```bash
        npm run dev
        ```

## Usage

1. Visit the website at `http://localhost:5173` (or the deployed URL if you have deployed it).
2. Sign up or log in to your account.
3. Browse through the products and add items to your cart or wishlist.
4. Proceed to checkout and place your order using Razorpay for payment.
5. Track your order status in the orders section.

## Screenshots

### Home Page
![Home Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot1.png?raw=true)

### About Us Page
![About Us Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot2.png?raw=true)

### Contact Page
![Contact Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot3.png?raw=true)

### Login Page
![Login Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot4.png?raw=true)

### Wishlist Page
![Wishlist Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot5.png?raw=true)

### Cart Page
![Cart Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot6.png?raw=true)

### Orders Page
![Orders Page](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot7.png?raw=true)

### Payment Gateway
![Online Payment](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot8.png?raw=true)

### All Products
![All Products](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot9.png?raw=true)

### Single Product Information
![Single Product Information](https://github.com/VedantDewangan/ShopZa/blob/main/screenshots/Screenshot10.png?raw=true)

## Contributing

We welcome contributions to improve Shopza. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Test Shopza

Check out our live site at [Shopza](https://shopza.netlify.app).
