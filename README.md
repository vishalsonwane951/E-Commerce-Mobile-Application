### E-Commerce Mobile Application
A modern e-commerce mobile application built with React Native and Expo. Features a beautiful UI with dark/light theme support, product browsing, cart management, and more.

Built with: Expo (React Native)
👤 Developer: VISHAL SONWANE
📅 Submission Type: Assignment Project
📱 Platform: Expo (React Native)

### Project Overview

This is a fully functional E-Commerce Mobile Application built using:

Expo (React Native)

React Navigation

Context API (State Management)

Public API (Fake Store API)

Custom Theming (Light & Dark Mode)

The application demonstrates core mobile development concepts including authentication UI, product listing, cart management, API integration, reusable components, and responsive styling.

Authentication

Login Screen – Secure login with email & password validation

Signup Screen – New user registration with validation

Navigation – Redirects after successful login/signup

2️⃣ Home Screen

Product Catalog – Browse products with grid layout

Scrollable List – Smooth scrolling using FlatList

Loading Indicator – Shows while fetching products

Error Handling – Displays errors gracefully

3️⃣ Product Details Screen

Product Image – Detailed view of product images

Description & Price – Displays product details clearly

Add to Cart – Easily add products to shopping cart

Navigate to Cart – Quick access to cart screen

4️⃣ Shopping Cart

View Cart Items – See all added products

Quantity Management – Increase or decrease item quantities

Remove Items – Delete products from cart

Automatic Total Calculation – Real-time total price updates

Persistent Cart – Cart data remains after app restarts

Empty Cart Handling – Friendly message when cart is empty

5️⃣ Navigation

React Navigation – Stack + Tabs for smooth routing

Header Configuration – Proper screen headers and back navigation

6️⃣ Styling & Performance

Modern UI Design – Clean and intuitive interface with smooth animations

Dark/Light Theme – Toggle between modes with saved preference

Responsive Layout – Works well on various screen sizes

Consistent Styling – Proper spacing and centralized color theme

Fast Performance – Optimized with React hooks and memoization

7️⃣ Search & Filtering

Search Products – Real-time search functionality

Category Filtering – Filter products by categories

### Bonus Features Implemented

🔍 Product Search

🏷 Category Filter

🌙 Dark Mode Support

🔄 Loading Indicators

⚠️ API Error Handling

♻️ Reusable Components

📦 Modular Folder Structure

🧠 Context API for global state management

### Folder Structure

ECommerceApp/
│
├── assets/
│
├── navigation/
│   └── AuthStack.js
│
├── screens/
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   ├── HomeScreen.js
│   ├── ProductDetailsScreen.js
│   └── CartScreen.js
│
├── components/
│   ├── ProductCard.js
│   ├── CartItem.js
│   └── CustomButton.js
│
├── context/
│   ├── CartContext.js
│   └── ThemeContext.js
│
├── services/
│   └── api.js
│
├── theme/
│   └── colors.js
│
├── App.js
└── README.md

### Tech Stack

React Native (0.72.6, Expo) – Mobile framework

Expo (49) – Development platform

React Navigation (6.x) – Navigation library for stack & tab navigation

Context API – State management

AsyncStorage – Local data persistence

JavaScript (ES6+) – Core scripting language

Fake Store API – Backend API for products

Expo Vector Icons – Icon library

Expo Linear Gradient – Beautiful gradients

## Installation & Setup

## Prerequisites

Node.js (v14 or higher)

npm or yarn

Expo CLI (npm install -g expo-cli)

iOS Simulator (Mac only) or Android Emulator

Expo Go app on your physical device (optional)

1️⃣ Clone the Repository
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app

2️⃣ Install Dependencies
npm install

3️⃣ Install Required Expo Packages
expo install expo-linear-gradient
expo install expo-blur
expo install @react-native-async-storage/async-storage
expo install react-native-screens react-native-safe-area-context

4️⃣ Install Navigation Packages
npm install @react-navigation/native @react-navigation/native-stack

5️⃣ Start the Development Server
npm start
# or
npx expo start
# or
expo start

6️⃣ Run on Your Device

Android/iOS device: Scan QR code using Expo Go (Android) or Camera app (iOS)

iOS Simulator: Press i

Android Emulator: Press a

## Theme Configuration

The app supports light and dark themes. Colors are defined in src/theme/colors.js.

## Screenshots

### Login Screen
![Login Screen](images/login.png)

### Home Screen (Light Mode)
![Home Screen Light](images/home_light.png)

### Home Screen (Dark Mode)
![Home Screen Dark](images/home_dark.png)

### Product Details Screen
![Product Details](images/product_details.png)

### Cart Screen
![Cart Screen](images/cart.png)

## Demo Video

A 3.25 minute demo video is included showing:

Authentication flow

Product browsing

Add to cart

Quantity update

Dark mode toggle

Category filter

Search functionality

LINK: ![Demo video](aseets/video/Demo.mp4)
Drive link : https://drive.google.com/file/d/1YnWGdzqeePaatSNwx4yHEY-dO6dFsUa8/view?usp=drive_link

### Features

1️⃣ Authentication

Login Screen – Secure login with email & password validation

Signup Screen – New user registration with validation

Navigation – Redirects after successful login/signup

2️⃣ Home Screen

Product Catalog – Browse products with grid layout

Scrollable List – Smooth scrolling using FlatList

Loading Indicator – Shows while fetching products

Error Handling – Displays errors gracefully

3️⃣ Product Details Screen

Product Image – Detailed view of product images

Description & Price – Displays product details clearly

Add to Cart – Easily add products to shopping cart

Navigate to Cart – Quick access to cart screen

4️⃣ Shopping Cart

View Cart Items – See all added products

Quantity Management – Increase or decrease item quantities

Remove Items – Delete products from cart

Automatic Total Calculation – Real-time total price updates

Persistent Cart – Cart data remains after app restarts

Empty Cart Handling – Friendly message when cart is empty

5️⃣ Navigation

React Navigation – Stack + Tabs for smooth routing

Header Configuration – Proper screen headers and back navigation

6️⃣ Styling & Performance

Modern UI Design – Clean and intuitive interface with smooth animations

Dark/Light Theme – Toggle between modes with saved preference

Responsive Layout – Works well on various screen sizes

Consistent Styling – Proper spacing and centralized color theme

Fast Performance – Optimized with React hooks and memoization

7️⃣ Search & Filtering

Search Products – Real-time search functionality

Category Filtering – Filter products by categories

🔍 Bonus Features

Reusable Components

Modular Folder Structure

Loading Indicators

API Error Handling

Theme-aware Components

## API Integration

The app uses Fake Store API:

GET /products – Fetch all products

GET /products/categories – Fetch categories

GET /products/category/:category – Fetch products by category

### Assumptions Made
Authentication is frontend-only (no backend integration).

Cart data resets on app reload (no persistence).

Fake Store API is used for product data.

Focus is on clean implementation rather than complex features.

### Technical Highlights

Context API used for:

Cart state

Theme (Dark Mode)

Reusable UI components

Modular folder structure

Proper separation of concerns

Dynamic theme styling

Clean and readable codebase

### Possible Future Improvements

Persist cart using AsyncStorage

Add product rating display

Add checkout screen

Improve animations & transitions

Payment gateway integration

Order history, wishlist, push notifications, offline mode

###  Conclusion

This project demonstrates strong understanding of:

React Native fundamentals

State management

Navigation handling

API integration

UI theming

Clean architecture principles

## Testing
npm test

## Environment Variables
API_BASE_URL=https://fakestoreapi.com



### Developed by:
VISHAL SONWANE