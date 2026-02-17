import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // For 2 columns with spacing

export default function ProductCard({ product, navigation }) {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? COLORS.dark : COLORS.light;

  // Mock rating (you can replace with actual product rating)
  const rating = product.rating?.rate || 4.5;
  const reviewCount = product.rating?.count || 120;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow
        }
      ]}
      onPress={() => navigation.navigate("ProductDetails", { product })}
      activeOpacity={0.7}
    >
      {/* Image Container */}
      <View style={[styles.imageContainer, { backgroundColor: theme.background }]}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Category Tag */}
        {product.category && (
          <Text style={[styles.category, { color: theme.primary }]} numberOfLines={1}>
            {product.category}
          </Text>
        )}

        {/* Title */}
        <Text
          numberOfLines={2}
          style={[styles.title, { color: theme.textPrimary }]}
        >
          {product.title}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.round(rating) ? "star" : "star-outline"}
                size={14}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={[styles.ratingCount, { color: theme.textSecondary }]}>
            ({reviewCount})
          </Text>
        </View>

        {/* Price and Add Button */}
        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: theme.success }]}>
            ${Number(product.price).toFixed(2)}
          </Text>
          
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              // You can add to cart functionality here
              alert(`${product.title} added to cart!`);
            }}
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  image: {
    height: 120,
    width: '100%',
    resizeMode: "contain",
  },
  infoContainer: {
    padding: 12,
  },
  category: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 8,
    height: 36, // Fixed height for 2 lines
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingCount: {
    fontSize: 11,
    fontWeight: '400',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});