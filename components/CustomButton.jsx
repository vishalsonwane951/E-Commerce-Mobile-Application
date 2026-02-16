import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../theme/colors";

export default function CustomButton({
  title,
  onPress,
  type = "primary",
  disabled = false,
  style
  
}) {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? COLORS.dark : COLORS.light;
  const isPrimary = type === "primary";

  //  Dynamic button style
   const buttonStyle = [
      styles.button,
  {
    backgroundColor: isPrimary ? dark ? "#0c0909" : theme.primary : dark ? 'transparent': '#ffffff',
      borderWidth: 1,
    borderColor: dark ? "#FFFFFF" : theme.primary,
    opacity: disabled ? 0.6 : 1
  }
   ];
//  Dynamic text style

const textStyle = [
  styles.text,
  {
    color: dark
      ? isPrimary
        ? "#f3eaea"  
        : "#ffffff"  
      : "#050404" 
  }
];



  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]} disabled={disabled}>
      <Text style={[textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginVertical: 6,
    elevation: 4
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: "capitalize"
  }
});
