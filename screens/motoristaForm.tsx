import * as React from "react";
import { StyleSheet, Text, TextInput, Dimensions, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useState } from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
const { width } = Dimensions.get('screen')

export default function MotoristaForm() {
    const {user} = useSelector((state: any) => state.user)
    const [nome, setNome] = useState('')
    const [cnh, setCnh] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submitForm = () => {
        let data = {
            name: nome,
            cnh: cnh,
            avaliable: true,
        }
        fetch('http://10.87.202.156:3000/motorista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.status === 200 ? res.json() : alert('Erro ao inserir motorista'))
            .then(data => {
                console.log(data)
                setNome('')
                setCnh('')
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 3000)
            })
    }

    return (
        <SafeAreaView style={styles.containerForm}>
            <Text style={styles.text}>Nome do motorista</Text>

            <TextInput style={styles.input}
                onChangeText={(e) => setNome(e)} placeholder="Insira o nome" />

            <Text style={styles.text}>CNH</Text>

            <TextInput style={styles.input}
                onChangeText={(e) => setCnh(e)} placeholder="1234567-8" />

            <TouchableOpacity style={styles.submit} onPress={submitForm}>
                <Text>Enviar</Text>
            </TouchableOpacity>

            {success && (<View style={styles.success}>
                <Text>Motorista inserido com sucesso! </Text>
                <AntDesign name="checkcircleo" size={24} color="green" />
            </View>)}
            {error && (<View style={styles.error}>
                <Text>Erro ao inserir Motorista! </Text>
                <MaterialIcons name="error-outline" size={24} color="red" />
            </View>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerForm: {
        padding: 20,
        flex: 1,
        border: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        width: width * 0.8,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        color: '#333',
    },
    submit: {
        width: width * 0.8,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        color: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        width: width * 0.8,
        marginBottom: 10,
        padding: 10,
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    error: {
        width: width * 0.8,
        marginBottom: 10,
        padding: 10,
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
});
