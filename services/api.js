export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("API Error:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return response.json();
};
