import React, { useContext } from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";


export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { dark } = useContext(ThemeContext);
  const navigation = useNavigation();


  const theme = dark ? COLORS.dark : COLORS.light;

  return (
  <TouchableOpacity
  activeOpacity={0.9}
  onPress={() => navigation.navigate("ProductDetails", { product: item })}
  style={[
    styles.card,
    {
      backgroundColor: theme.card,
      borderColor: theme.border
    }
  ]}
  >

      {/* 🖼 Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* 📦 Info Section */}
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: theme.textPrimary }]}
        >
          {item.title}
        </Text>

        <Text style={[styles.price, { color: theme.success }]}>
          ${Number(item.price).toFixed(2)}
        </Text>

        {/* ➕➖ Quantity Controls */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.qtyButton,
              { borderColor: theme.border }
            ]}
            onPress={() => updateQuantity(item.id, "dec")}
          >
            <Text style={[styles.btnText, { color: theme.textPrimary }]}>
              −
            </Text>
          </TouchableOpacity>

          <Text style={[styles.quantity, { color: theme.textPrimary }]}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={[
              styles.qtyButton,
              { borderColor: theme.border }
            ]}
            onPress={() => updateQuantity(item.id, "inc")}
          >
            <Text style={[styles.btnText, { color: theme.textPrimary }]}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        {/* ❌ Remove */}
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={[styles.remove, { color: theme.danger }]}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 3
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 15
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "600",
    fontSize: 14
  },
  price: {
    fontWeight: "bold",
    marginVertical: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 6
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "600"
  },
  remove: {
    marginTop: 5,
    fontWeight: "600"
  }
});
