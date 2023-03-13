import { useState } from "react"
import { TextInput, TouchableOpacity, View, Text, Dimensions, StyleSheet } from "react-native"
const { width, height } = Dimensions.get('screen')

export default function CadastroUsuario({ navigation }: any) {
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')

    const criarUsuario = async () => {
        if (senha !== confirmSenha) {
            alert('As senhas não conferem')
            return
        }
        let data = {
            name: username,
            password: senha,
            management: true,
        }
        const resp = await fetch('http://10.87.202.156:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = resp.status === 200 ? resp.json() : false
        if (response) {
            setUsername('')
            setSenha('')
            navigation.navigate('Login', { name: 'Login' })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.input} placeholder="Digite o seu nome de usuario" onChangeText={(e) => setUsername(e)} />
            <Text style={styles.text}>Senha</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha" onChangeText={(e) => setSenha(e)} />
            <Text style={styles.text}>Confirme sua senha</Text>
            <TextInput style={styles.input} placeholder="Confirme sua senha" onChangeText={(e) => setConfirmSenha(e)} />
            <TouchableOpacity style={styles.submit} onPress={criarUsuario}>
                <Text style={styles.text}>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    input: {
        width: width * .9,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        margin: 10
    },
    submit: {
        width: width * .9,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
