import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";

export default function ProductCard({ product, navigation }) {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? COLORS.dark : COLORS.light;

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
      activeOpacity={0.8}
    >
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: theme.textPrimary }]}
        >
          {product.title}
        </Text>

        <Text style={[styles.price, { color: theme.primary }]}>
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 5
  },
  image: {
    height: 150,
    resizeMode: "contain",
    marginBottom: 10
  },
  info: {
    marginTop: 5
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6
  },
  price: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
