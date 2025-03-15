import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios"; // Importar Axios
import { colors } from "@/config/theme";
import { typography } from "@/config/typography";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";

import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL; // Acceder a la variable

export default function RegisterScreen() {
  const router = useRouter();

  // Estados para capturar los datos del usuario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [idRole, setIdRole] = useState("3"); // Puedes cambiar esto según el rol por defecto

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        name,
        last_name: lastName,
        email,
        password,
        id_role: idRole,
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={[typography.semibold.big, { color: colors.darkGray }]}>
            Registrarse
          </Text>
          <Text style={[typography.medium.regular, { color: colors.gray }]}>
            Por favor, proporcione la siguiente información para confirmar su
            registro en el sistema.
          </Text>

          <CustomInput 
            placeholder="Nombre" 
            value={name} 
            onChangeText={setName} 
          />
          <CustomInput 
            placeholder="Apellido" 
            value={lastName} 
            onChangeText={setLastName} 
          />
          <CustomInput 
            placeholder="Correo Electrónico" 
            keyboardType="email-address"
            value={email} 
            onChangeText={setEmail} 
          />
          <View style={styles.inputContainer}>
            <CustomInput 
              placeholder="Contraseña" 
              secureTextEntry={!showPassword}  // Aquí cambiamos la visibilidad según el estado
              value={password} 
              onChangeText={setPassword} 
            />
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons 
                  name={showPassword ? "visibility-off" : "visibility"} 
                  size={24} 
                  color={colors.gray} 
                />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Button text={"Registrarse"} onPress={handleRegister} />

          <Text style={[typography.medium.regular, { color: colors.gray }]}>
            ¿Tienes una cuenta?
            <Text style={styles.link} onPress={() => router.push("/login")}>
              {" "} Inicia sesión aquí
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.base,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.base,
  },
  formContainer: {
    flex: 1,
    gap: 16,
    width: "100%",
    paddingTop: 24,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colors.base,
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
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
});
