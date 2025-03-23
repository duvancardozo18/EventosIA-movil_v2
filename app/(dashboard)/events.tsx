import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


export default function EventsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pantalla de Eventos</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});