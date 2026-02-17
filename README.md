### E-Commerce Mobile Application
Built with Expo (React Native)

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

### Features Implemented
1️⃣ Authentication

Login Screen

Signup Screen

Email & Password validation

Navigation after authentication

2️⃣ Home Screen

Product listing (Image, Title, Price)

Scrollable list using FlatList

Loading indicator

Error handling

3️⃣ Product Details Screen

Product image

Product description

Product price

Add to Cart functionality

Navigate to Cart

4️⃣ Cart Screen

Display added products

Increase / Decrease quantity

Remove item

Automatic total price calculation

Empty cart handling

5️⃣ Navigation

React Navigation (Stack + Tabs)

Proper screen routing

Header configuration

6️⃣ Styling

Clean and consistent UI

Responsive layout

Proper spacing

Centralized color theme

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
│   ├── MainTabs.js
│   ├── AuthStack.js
│   └── RootNavigator.js
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

React Native (Expo)

React Navigation

Context API

JavaScript (ES6+)

Fake Store API

Expo Vector Icons

### Installation & Setup

1️⃣ Install Dependencies
    npm install

2️⃣ Start Project
npx expo start

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

A 3–5 minute demo video is included showing:

Authentication flow

Product browsing

Add to cart

Quantity update

Dark mode toggle

Category filter

Search functionality

LINK: 

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

###  Conclusion

This project demonstrates strong understanding of:

React Native fundamentals

State management

Navigation handling

API integration

UI theming

Clean architecture principles

### Developed by:
VISHAL SONWANE