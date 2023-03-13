import * as React from "react";
import { StyleSheet, Text, TextInput, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/redux/user-slice";
const { width, height } = Dimensions.get('screen')



export default function LoginForm({ navigation }: any) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const submitForm = () => {
        let data = {
            name: username,
            password: password
        }
        console.log(data)
        fetch('http://192.168.0.115:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(login(data))
                console.log(data)
                setPassword('')
                setUsername('')
                navigation.navigate('Dashboard', { name: 'Dashboard' })
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <SafeAreaView style={styles.containerForm}>
            <Text style={styles.text}>Usuario</Text>
            <TextInput style={styles.input} placeholder="Digite o username"
                keyboardType='default'  onChangeText={(e) => setUsername(e)} />
            <Text style={styles.text}>Senha</Text>
            <TextInput style={styles.input}  onChangeText={(e) => setPassword(e)} placeholder="Digite a senha"
                keyboardType="numeric" />
            <TouchableOpacity style={styles.submit} onPress={submitForm}>
                <Text>Logar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit} onPress={() => navigation.navigate('Register', { name: 'Register' })}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
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
    }
});
