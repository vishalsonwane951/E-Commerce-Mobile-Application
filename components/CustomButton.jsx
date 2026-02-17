import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";

export default function CustomButton({
  title,
  onPress,
  type = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle: customTextStyle,
  icon,
  iconPosition = "left",
  size = "medium", // small, medium, large
  fullWidth = false,
  rounded = true,
}) {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? COLORS.dark : COLORS.light;

  // Button size styles
  const sizeStyles = {
    small: {
      height: 36,
      paddingHorizontal: 12,
      fontSize: 14,
    },
    medium: {
      height: 42,
      paddingHorizontal: 16,
      fontSize: 16,
    },
    large: {
      height: 50,
      paddingHorizontal: 24,
      fontSize: 18,
    },
  };

  // Button type styles
  const getButtonColors = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: theme.primary,
          borderColor: theme.primary,
          textColor: "#ffffff",
        };
      case "secondary":
        return {
          backgroundColor: theme.secondary || "#6c757d",
          borderColor: theme.secondary || "#6c757d",
          textColor: "#ffffff",
        };
      case "success":
        return {
          backgroundColor: theme.success || "#28a745",
          borderColor: theme.success || "#28a745",
          textColor: "#ffffff",
        };
      case "danger":
        return {
          backgroundColor: theme.danger || "#dc3545",
          borderColor: theme.danger || "#dc3545",
          textColor: "#ffffff",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.primary,
          textColor: theme.primary,
        };
      case "outline-light":
        return {
          backgroundColor: "transparent",
          borderColor: dark ? "#ffffff" : "#333333",
          textColor: dark ? "#ffffff" : "#333333",
        };
      case "text":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          textColor: theme.primary,
        };
      default:
        return {
          backgroundColor: theme.primary,
          borderColor: theme.primary,
          textColor: "#ffffff",
        };
    }
  };

  const colors = getButtonColors();
  const currentSize = sizeStyles[size];

  // Disabled state colors
  const disabledBackground = dark ? "#444444" : "#e0e0e0";
  const disabledTextColor = dark ? "#888888" : "#999999";
  const disabledBorderColor = dark ? "#555555" : "#cccccc";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
          backgroundColor: disabled ? disabledBackground : colors.backgroundColor,
          borderColor: disabled ? disabledBorderColor : colors.borderColor,
          borderRadius: rounded ? 25 : 8,
          width: fullWidth ? "100%" : "auto",
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={disabled ? disabledTextColor : colors.textColor} 
        />
      ) : (
        <View style={[
          styles.contentContainer,
          iconPosition === "left" ? styles.rowLeft : styles.rowRight
        ]}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          
          <Text
            style={[
              styles.text,
              {
                fontSize: currentSize.fontSize,
                color: disabled ? disabledTextColor : colors.textColor,
              },
              customTextStyle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>

          {icon && iconPosition === "right" && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLeft: {
    flexDirection: "row",
  },
  rowRight: {
    flexDirection: "row-reverse",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
});