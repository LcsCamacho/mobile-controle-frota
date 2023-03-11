import * as React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, } from 'react-native'
import { useState } from 'react'
import { VictoryPie } from 'victory-native';
const { width, height } = Dimensions.get('screen')


export default function DashboardManutencao() {
    const [manutencao, setManutencao] = useState([]);
    const [manutencaoPorVeiculo, setManutencaoPorVeiculo] = useState([]);
    const [manutencaoPorMotorista, setManutencaoPorMotorista] = useState([]);
    const [manutencaoPorTipo, setManutencaoPorTipo] = useState([]);
    const [manutencaoPorStatus, setManutencaoPorStatus] = useState([]);
    const [listarManutencao, setListarManutencao] = useState(false);
    const [listarManutencaoPorVeiculo, setListarManutencaoPorVeiculo] = useState(false);
    const [listarManutencaoPorMotorista, setListarManutencaoPorMotorista] = useState(false);
    const [listarManutencaoPorTipo, setListarManutencaoPorTipo] = useState(false);
    const [listarManutencaoPorStatus, setListarManutencaoPorStatus] = useState(false);


    // {
	// 	"id": 1,
	// 	"date": "2023-03-02T03:00:00.000Z",
	// 	"cost": 1000,
	// 	"VehicleId": 3,
	// 	"createdAt": "2023-03-02T17:43:12.192Z",
	// 	"updatedAt": "2023-03-02T17:43:12.192Z",
	// 	"description": " req.body.description"
	// },

    return (
        <ScrollView>
            <View>
                <Text>Dashboard Manutenção</Text>
                <Text>Manutenção: {manutencao.length}</Text>
                <Text>Manutenção por Veiculo: {manutencaoPorVeiculo.length}</Text>
                <Text>Manutenção por Motorista: {manutencaoPorMotorista.length}</Text>
                <Text>Manutenção por Tipo: {manutencaoPorTipo.length}</Text>
                <Text>Manutenção por Status: {manutencaoPorStatus.length}</Text>
            </View>
            <View style={styles.chart}>
                <VictoryPie
                    width={width * 0.9}
                    style={{
                        data: {
                            fillOpacity: 1, stroke: "#000", strokeWidth: 1
                        },
                        labels: {
                            fontSize: 15,
                            fill: "black"
                        },
                    }}
                    data={[
                        { x: 1, y: manutencao.length - manutencaoPorStatus.length, label: 'Disp' },
                        { x: 2, y: manutencaoPorStatus.length, label: 'Indisp' },
                    ]}
                    colorScale={['green', 'red']}
                />
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})