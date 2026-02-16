  import React, { useContext } from "react";
  import {View,Text,FlatList,StyleSheet} from "react-native";
  import { CartContext } from "../context/CartContext";
  import { ThemeContext } from "../context/ThemeContext";
  import { COLORS } from "../theme/colors";
  import CartItem from "../components/CartItem";
  import CustomButton from "../components/CustomButton";

  export default function CartScreen() {
    const { cart, totalPrice } = useContext(CartContext);
    const { dark } = useContext(ThemeContext);

    const theme = dark ? COLORS.dark : COLORS.light;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background }
        ]}
      >
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Your cart is empty 🛒
            </Text>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CartItem item={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            />

            {/* Total Section */}
            <View
              style={[
                styles.totalContainer,
                {
                  backgroundColor: theme.card,
                  borderTopColor: theme.border
                }
              ]}
            >
              <View style={styles.totalRow}>
                <Text
                  style={[
                    styles.totalLabel,
                    { color: theme.textPrimary }
                  ]}
                >
                  Total Amount
                </Text>

                <Text
                  style={[
                    styles.totalAmount,
                    { color: theme.primary }
                  ]}
                >
                  ${totalPrice.toFixed(2)}
                </Text>
              </View>

              {/*  Checkout Button */}
              <CustomButton
                title="Proceed to Checkout"
                onPress={() => alert("Checkout functionality coming soon.." )}
                
              />
            </View>
          </>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 10
    },

    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },

    emptyText: {
      fontSize: 16
    },

    totalContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      borderTopWidth: 1
    },

    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    },

    totalLabel: {
      fontSize: 16,
      fontWeight: "600"
    },

    totalAmount: {
      fontSize: 20,
      fontWeight: "bold"
    }
  });
