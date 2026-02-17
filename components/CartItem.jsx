import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { dark } = useContext(ThemeContext);
  const navigation = useNavigation();

  const theme = dark ? COLORS.dark : COLORS.light;

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const subtotal = (item.price * (item.quantity || 1)).toFixed(2);

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      {/* Product Image and Details */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ProductDetails", { product: item })}
        style={styles.contentContainer}
      >
        {/* Image Container */}
        <View style={[styles.imageContainer, { backgroundColor: theme.background }]}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text
            numberOfLines={2}
            style={[styles.title, { color: theme.textPrimary }]}
          >
            {item.title}
          </Text>

          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.success }]}>
              ${Number(item.price).toFixed(2)}
            </Text>
            <Text style={[styles.subtotal, { color: theme.textSecondary }]}>
              Subtotal: ${subtotal}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Bottom Row with Quantity Controls and Remove */}
      <View style={styles.bottomRow}>
        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              styles.quantityButtonLeft,
              { borderColor: theme.border }
            ]}
            onPress={() => updateQuantity(item.id, "dec")}
          >
            <Ionicons name="remove" size={18} color={theme.textPrimary} />
          </TouchableOpacity>

          <View style={[styles.quantityValueContainer, { borderColor: theme.border }]}>
            <Text style={[styles.quantityValue, { color: theme.textPrimary }]}>
              {item.quantity || 1}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.quantityButton,
              styles.quantityButtonRight,
              { borderColor: theme.border }
            ]}
            onPress={() => updateQuantity(item.id, "inc")}
          >
            <Ionicons name="add" size={18} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={[styles.removeButton, { borderColor: theme.danger }]}
          onPress={handleRemove}
        >
          <Ionicons name="trash-outline" size={18} color={theme.danger} />
          <Text style={[styles.removeText, { color: theme.danger }]}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtotal: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  quantityButtonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  quantityButtonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  quantityValueContainer: {
    width: 40,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  removeText: {
    fontSize: 14,
    fontWeight: "600",
  },
});