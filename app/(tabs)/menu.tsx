import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/config/theme";
import { typography } from "@/config/typography";

const MenuScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Sección de bienvenida */}
                <View style={styles.welcomeSection}>
                    <Image
                        source={{
                            uri: "https://randomuser.me/api/portraits/women/43.jpg",
                        }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
                        <Text style={styles.username}>[Nombre Usuario]</Text>
                    </View>
                </View>

                {/* Explora las categorías */}
                <Text style={styles.categoryTitle}>Administra tus eventos</Text>

                {/* Botones de navegación */}
                <View style={styles.categoriesContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                                router.push(item.route);
                            }}
                            style={styles.card}
                        >
                            <Image source={item.image} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>{item.label}</Text>
                                <Feather name="chevron-right" size={24} color="#595959" />
                            </View>
                        </TouchableOpacity>

                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MenuScreen

const menuItems = [
    {
        id: 1,
        label: "Eventos",
        route: "/(dashboard)/events",
        image: require("../../assets/images/calendar.png"),
    },
    {
        id: 2,
        label: "Reportes",
        route: "/(dashboard)/reports",
        image: require("../../assets/images/reports.png"),
    },
    {
        id: 3,
        label: "Ayuda",
        route: "/(dashboard)/help",
        image: require("../../assets/images/help.png"),
    }
];

// Estilos con StyleSheet
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.base,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    welcomeSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: colors.border,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    welcomeText: {
        ...typography.bold.large,
    },
    username: {
        color: colors.gray,
        ...typography.regular.big,
    },
    categoryTitle: {
        ...typography.bold.large,
        marginTop: 20,
    },
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
    },
    card: {
        width: "48%",
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        shadowColor: colors.border,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 3,
    },
    cardImage: {
        width: 120,
        height: 90,
        marginBottom: 20,
        resizeMode: "contain",
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 5,
    },
    cardText: {
        color: colors.darkGray,
        ...typography.bold.regular,
        flex: 1,
    },
});