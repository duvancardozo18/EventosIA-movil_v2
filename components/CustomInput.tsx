import React from "react";
import { View, TextInput, StyleSheet, TextInputProps, Platform } from "react-native";
import Feather from "react-native-vector-icons/Feather"; 
import { colors } from "../config/theme";

interface CustomInputProps extends TextInputProps {
  iconName?: string;
}

export default function CustomInput({ iconName, ...props }: CustomInputProps) {
  return (
    <View style={styles.container}>
      {iconName && (
        <Feather name={iconName} size={20} color={colors.gray} style={styles.icon} />
      )}
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={colors.gray}
        underlineColorAndroid="transparent" // Evita la línea azul en Android
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
    borderWidth: 0, // Elimina borde en iOS
    outlineStyle: "none", // Evita borde en Android
  },
});