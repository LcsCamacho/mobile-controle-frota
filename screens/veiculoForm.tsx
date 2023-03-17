import * as React from "react";
import { StyleSheet, Text, TextInput, Dimensions, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useState } from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { URL_FETCH } from "../fetchUrl";
import { useSelector } from "react-redux";
const { width } = Dimensions.get('screen')

export default function VeiculoForm() {
    const {user} = useSelector((state: any) => state.user)
    const [placa, setPlaca] = useState('')
    const [modelo, setModel] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submitForm = () => {
        let data = {
            model: modelo,
            plate: placa.toUpperCase(),
            avaliable: true,
            type: 'Passeio'
        }
        console.log(data)
        fetch(`http://${URL_FETCH}:3000/veiculo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': user.token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPlaca('')
                setModel('')
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            })
            .catch(err => {
                console.log({erro:err})
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 3000)
            })
    }

    return (
        <SafeAreaView style={styles.containerForm}>
            <Text style={styles.text}>Modelo do veiculo</Text>

            <TextInput style={styles.input}
                onChangeText={(e) => setModel(e)} placeholder="Civic, Fusca.." />

            <Text style={styles.text}>Placa</Text>

            <TextInput style={styles.input}
                onChangeText={(e) => setPlaca(e)} placeholder="ABC-1234" />

            <TouchableOpacity style={styles.submit} onPress={submitForm}>
                <Text>Enviar</Text>
            </TouchableOpacity>

            {success && (<View style={styles.success}>
                <Text>Veiculo inserido com sucesso! </Text>
                <AntDesign name="checkcircleo" size={24} color="green" />
            </View>)}
            {error && (<View style={styles.error}>
                <Text>Erro ao inserir veículo! </Text>
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
