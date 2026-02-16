import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import CustomButton from "../components/CustomButton";

export default function HomeScreen({ navigation }) {
  const { dark, toggleTheme, theme } = useContext(ThemeContext); 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await fetchProducts();
      const categoryData = await fetchCategories();
      setProducts(productData);
      setCategories(categoryData);
      setSelectedCategory(null);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCategory(category);
      const data = await fetchProductsByCategory(category);
      setProducts(data);
    } catch (err) {
      setError("Failed to load category.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = React.useMemo(() => {
    if (!search.trim()) return products;
    return products.filter((product) =>
      product?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.danger }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Dark Mode Toggle */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor: theme.card,
          padding: 10,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.border,
          alignSelf: "flex-end",
          marginBottom: 10
        }}
      >
        <Ionicons
          name={dark ? "sunny" : "moon"}
          size={20}
          color={theme.textPrimary}
        />
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={[
          styles.search,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.textPrimary
          }
        ]}
        placeholderTextColor={theme.textSecondary}
      />

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        <CustomButton
          title="All"
          type={selectedCategory === null ? "primary" : "outline"}
          onPress={() => {
            setSelectedCategory(null);
            loadInitialData();
          }}
          style={
              selectedCategory === null && dark
                ? { backgroundColor: "#665e5e" }
                : {}
            }
        />
        {categories.map((category) => (
          <CustomButton
            key={category}
            title={category}
            type={selectedCategory === category ? (dark ? "white" : "primary") : "outline"}
            onPress={() => handleCategorySelect(category)}
            style={
              selectedCategory === category && dark
                ? { backgroundColor: "#665e5e" }
                : {}
            }
          />
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={filteredProducts} aaaa
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: { padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1 },
  categoryContainer: { paddingVertical: 6, paddingRight: 5, marginBottom: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" }
});