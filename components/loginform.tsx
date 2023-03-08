import React from 'react';
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyleSheet, Text, View, TextInput, Dimensions, SafeAreaView, Button, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('screen')

const usernameJotai = atomWithStorage('username', '')
const passwordJotai = atomWithStorage('password', '')
const userJotai = atomWithStorage('user', '')

export default function LoginForm({navigation}:any) {
    const [username, setUsername] = useAtom(usernameJotai)
    const [password, setPassword] = useAtom(passwordJotai)
    const [user, setUser] = useAtom(userJotai)


    const submitForm = () => {
        let data = {
            name: username,
            password: password
        }
        fetch('http://192.168.0.115:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                console.log(data)
                setPassword('')
                setUsername('')
                navigation.navigate('Dashboard', {name: 'Dashboard'})
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <SafeAreaView style={styles.containerForm}>
                <Text style={styles.text}>Usuario</Text>
                <TextInput style={styles.input} placeholder="Digite o username"
                    keyboardType='default' value={username} onChangeText={setUsername} />
                <Text style={styles.text}>Senha</Text>
                <TextInput style={styles.input} value={password}  onChangeText={setPassword} placeholder="Digite a senha"
                    keyboardType="numeric" />
                <TouchableOpacity style={styles.submit} onPress={submitForm}>
                    <Text>Logar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
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
