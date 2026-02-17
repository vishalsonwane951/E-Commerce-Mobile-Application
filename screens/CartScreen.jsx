import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";
import CartItem from "../components/CartItem";
import CustomButton from "../components/CustomButton";

export default function CartScreen({ navigation }) {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { dark } = useContext(ThemeContext);

  const theme = dark ? COLORS.dark : COLORS.light;

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          onPress: clearCart,
          style: "destructive" 
        }
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      "Proceed to Checkout",
      `Total amount: $${totalPrice.toFixed(2)}\n\nThis is a demo app. Checkout functionality will be available soon!`,
      [{ text: "OK" }]
    );
  };

  if (cart.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: theme.card }]}>
            <Ionicons name="cart-outline" size={80} color={theme.primary} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Looks like you haven't added anything to your cart yet
          </Text>
          <CustomButton
            title="Start Shopping"
            onPress={() => navigation.navigate("Home")}
            style={styles.shopButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />

      {/* Cart Summary */}
      <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Items
            </Text>
            <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>
              {cart.length}
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Unique Items
            </Text>
            <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>
              {new Set(cart.map(item => item.id)).size}
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Total Items
            </Text>
            <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>
              {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            </Text>
          </View>
        </View>
      </View>

      {/* Clear Cart Button */}
      {cart.length > 0 && (
        <TouchableOpacity
          onPress={handleClearCart}
          style={[styles.clearCartButton, { backgroundColor: theme.card }]}
        >
          <Ionicons name="trash-outline" size={20} color={theme.danger} />
          <Text style={[styles.clearCartText, { color: theme.danger }]}>
            Clear Cart
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <CartItem item={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Bottom Checkout Bar */}
      <LinearGradient
        colors={dark ? ['#1a1a1a', '#2d2d2d'] : ['#667eea', '#764ba2']}
        style={styles.bottomBar}
      >
        <View style={styles.bottomBarContent}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <View style={styles.totalRow}>
              <Text style={styles.totalCurrency}>$</Text>
              <Text style={styles.totalValue}>{totalPrice.toFixed(2)}</Text>
            </View>
            <Text style={styles.taxInfo}>Including all taxes</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.checkoutButton, { backgroundColor: theme.success }]}
            onPress={handleCheckout}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  shopButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: 30,
  },
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  clearCartText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalInfo: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalCurrency: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 2,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  taxInfo: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});