// API Endpoints
export const BASE_URL = "https://fakestoreapi.com";
export const ENDPOINTS = {
    PRODUCTS: "/products",
    PRODUCT_DETAILS: (id) => `/products/${id}`,
    CATEGORIES: "/products/categories",
    CATEGORY_PRODUCTS: (category) => `/products/category/${category}`,
    CART: "/cart",
    USER: "/users"
};