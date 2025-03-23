import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "@/config/theme";
import { typography } from "@/config/typography";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import LoginButton from "@/components/LoginButton";

const API_URL = "https://disriego-backend.onrender.com";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa un correo y una contraseña");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Login exitoso");
      } else {
        Alert.alert("Error", data.detail || "Datos inválidos");
      }
    } catch (error) {
      router.replace("/home"); //completeInfo
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={[typography.semibold.big, { color: colors.darkGray }]}>
              INICIAR SESIÓN
            </Text>
            <Text style={[typography.medium.regular, { color: colors.gray }]}>
              Por favor, introduce tu correo y contraseña para acceder a tu
              cuenta
            </Text>

            <CustomInput
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Ajuste para centrar el texto */}
            <View style={styles.forgotPasswordContainer}>
              <Text style={[typography.medium.regular, { color: colors.gray }]}>
                ¿Olvidaste la contraseña?
                <Text
                  style={[typography.medium.regular, styles.link]}
                  onPress={() => router.push("/forgotPassword")}
                >
                  {" "}
                  Haz clic aquí
                </Text>
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Button
                text={loading ? "Cargando..." : "Iniciar Sesión"}
                onPress={handleLogin}
                disabled={loading}
              />
              <Text style={[typography.medium.regular, { color: colors.gray }]}>
                ¿No tienes cuenta?
                <Text
                  style={[typography.medium.regular, styles.link]}
                  onPress={() => router.push("/register")}
                >
                  {" "}
                  Regístrate aquí
                </Text>
              </Text>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.base,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Asegura el centrado vertical cuando el contenido no es suficiente
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Centra el formulario verticalmente
    backgroundColor: colors.base,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%", // Ajusta el ancho del formulario para que no ocupe toda la pantalla
    maxWidth: 400, // Define un ancho máximo para mejorar la estética en pantallas grandes
    padding: 20,
    backgroundColor: colors.base,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 4,
  },
  loginWrapper: {
    marginTop: 4,
    width: "100%",
  },
  footerContainer: {
    width: "100%",
    marginTop: 2,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  link: {
    ...typography.bold.regular,
    color: colors.accent,
  },
  divisor: {
    width: "100%",
    height: 18,
    resizeMode: "contain",
  },
});
