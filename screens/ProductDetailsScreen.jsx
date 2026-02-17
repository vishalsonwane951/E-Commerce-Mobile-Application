import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import CustomButton from "../components/CustomButton";

const { width } = Dimensions.get("window");

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { theme, dark } = useContext(ThemeContext);

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to Cart 🛒");
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Main Product Image */}
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: theme.card }]}>
            <Image source={{ uri: product.image }} style={styles.image} />
          </View>
        </View>

        {/* Product Content */}
        <View style={styles.contentContainer}>
          {/* Title and Price Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.category, { color: theme.primary }]}>
              {product.category?.toUpperCase()}
            </Text>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              {product.title}
            </Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= Math.round(product.rating?.rate || 4) ? "star" : "star-outline"}
                    size={16}
                    color="#FFD700"
                  />
                ))}
              </View>
              <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
                ({product.rating?.count || 0} reviews)
              </Text>
            </View>

            <Text style={[styles.price, { color: theme.success }]}>
              ${Number(product.price).toFixed(2)}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {product.description}
            </Text>
          </View>

          {/* Additional Info Cards */}
          <View style={styles.infoGrid}>
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Ionicons name="cube-outline" size={24} color={theme.primary} />
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>In Stock</Text>
              <Text style={[styles.infoValue, { color: theme.success }]}>Available</Text>
            </View>
            
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Ionicons name="car-outline" size={24} color={theme.primary} />
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Shipping</Text>
              <Text style={[styles.infoValue, { color: theme.textPrimary }]}>Free</Text>
            </View>
            
            <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
              <Ionicons name="shield-checkmark-outline" size={24} color={theme.primary} />
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Warranty</Text>
              <Text style={[styles.infoValue, { color: theme.textPrimary }]}>1 Year</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button Container - Add to Cart and Go to Cart */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        />
        <CustomButton
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart")}
          style={styles.goToCartButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 20,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#667eea',
    paddingVertical: 5,
    borderRadius: 25,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  goToCartButton: {
    flex: 1,
    backgroundColor: '#764ba2',
    paddingVertical: 5,
    borderRadius: 25,
    shadowColor: '#764ba2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});