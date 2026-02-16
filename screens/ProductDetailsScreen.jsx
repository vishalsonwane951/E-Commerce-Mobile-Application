import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import CustomButton from "../components/CustomButton";


export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext); 
  const { height } = Dimensions.get("window");
  const { dark } = useContext(ThemeContext);


  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { minHeight: height }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={[styles.imageContainer, { backgroundColor: theme.card }]}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        {/* Product Info Card */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.card, borderColor: theme.border }
          ]}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {product.title}
          </Text>
          <Text style={[styles.price, { color: theme.success }]}>
            ${Number(product.price).toFixed(2)}
          </Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {product.description}
          </Text>
        </View>

        {/* Buttons */}
        <CustomButton
          title="Add to Cart"
          style={{ borderWidth: 1, borderColor: dark ? "#FFFFFF" : theme.primary }}
          onPress={() => {
            addToCart(product);
            alert("Added to Cart 🛒");
          }}
        />
        <CustomButton
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    padding: 16
  },
  imageContainer: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain"
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    lineHeight: 20
  }
});
