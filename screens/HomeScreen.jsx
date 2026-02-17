import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from "../context/ThemeContext";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import CustomButton from "../components/CustomButton";

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2; // Constant value that never changes

export default function HomeScreen({ navigation }) {
  const { dark, toggleTheme, theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadInitialData();
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

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return products.filter((product) =>
      product?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const renderHeader = () => (
    <LinearGradient
      colors={dark ? ['#1a1a1a', '#2d2d2d'] : ['#667eea', '#764ba2']}
      style={styles.header}
    >
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>Welcome To</Text>
            <Text style={styles.headerTitle}>E-Commerce</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={[styles.iconButton, { backgroundColor: theme.card }]}
            >
              <Ionicons
                name={showSearch ? "close" : "search"}
                size={22}
                color={theme.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleTheme}
              style={[styles.iconButton, { backgroundColor: theme.card }]}
            >
              <Ionicons
                name={dark ? "sunny" : "moon"}
                size={22}
                color={theme.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar - Conditionally Rendered */}
        {showSearch && (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={theme.textSecondary} style={styles.searchIcon} />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor={theme.textSecondary}
              value={search}
              onChangeText={setSearch}
              style={[
                styles.searchInput,
                {
                  backgroundColor: theme.card,
                  color: theme.textPrimary,
                  borderColor: theme.border
                }
              ]}
              autoFocus
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );

  if (loading && products.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading amazing products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Ionicons name="alert-circle" size={60} color={theme.danger} />
        <Text style={[styles.errorText, { color: theme.danger }]}>{error}</Text>
        <CustomButton title="Retry" onPress={loadInitialData} style={styles.retryButton} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        key={`flatlist-${NUM_COLUMNS}`} // Stable key based on numColumns
        renderItem={({ item, index }) => (
          <View style={[
            styles.productCardWrapper,
            { width: `${100 / NUM_COLUMNS}%` },
            index % NUM_COLUMNS === 0 ? styles.leftColumn : styles.rightColumn
          ]}>
            <ProductCard
              product={item}
              navigation={navigation}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <>
            {renderHeader()}

            {/* Categories Section */}
            <View style={styles.categoriesSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                  Categories
                </Text>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                  {categories.length} available
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    selectedCategory === null && styles.categoryChipActive,
                    { backgroundColor: selectedCategory === null ? theme.primary : theme.card }
                  ]}
                  onPress={() => {
                    setSelectedCategory(null);
                    loadInitialData();
                  }}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      { color: selectedCategory === null ? '#fff' : theme.textSecondary }
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>

                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipActive,
                      {
                        backgroundColor: selectedCategory === category ? theme.primary : theme.card,
                        marginLeft: index === 0 ? 0 : 8
                      }
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        { color: selectedCategory === category ? '#fff' : theme.textSecondary }
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Products Header */}
            <View style={styles.productsHeader}>
              <Text style={[styles.productsCount, { color: theme.textSecondary }]}>
                {filteredProducts.length} products found
              </Text>
              {selectedCategory && (
                <TouchableOpacity onPress={loadInitialData}>
                  <Text style={[styles.clearFilter, { color: theme.primary }]}>Clear filter</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={80} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
                No products found
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
                Try adjusting your search or filter
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  greetingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 45,
    fontSize: 16,
    borderWidth: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  categoryContainer: {
    paddingBottom: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryChipActive: {
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  productsCount: {
    fontSize: 14,
  },
  clearFilter: {
    fontSize: 14,
    fontWeight: '600',
  },
  productCardWrapper: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  leftColumn: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  rightColumn: {
    paddingRight: 16,
    paddingLeft: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  errorText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});