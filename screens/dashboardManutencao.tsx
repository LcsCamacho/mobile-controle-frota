import * as React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, } from 'react-native'
import { useState } from 'react'
import { DataTable } from 'react-native-paper'
import { VictoryPie } from 'victory-native';
import { useQuery } from 'react-query';
import { Manutencao } from '../types';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen')


export default function DashboardManutencao() {
    const { user } = useSelector((state: any) => state.user)

    const [manutencao, setManutencao] = useState<Manutencao[]>([]);
    const [manutencaoPorVeiculo, setManutencaoPorVeiculo] = useState([]);
    const [manutencaoPorMotorista, setManutencaoPorMotorista] = useState([]);
    const [manutencaoPorTipo, setManutencaoPorTipo] = useState([]);
    const [manutencaoPorStatus, setManutencaoPorStatus] = useState([]);
    const [listarManutencao, setListarManutencao] = useState(false);

    const listarManutencoes = () => {
        fetch('http://10.87.202.156:3000/manutencao')
            .then(response => response.json())
            .then(data => {
                setManutencao(data);
                console.log(data)
                setListarManutencao(true);
            })
            .catch(error => console.error(error))
    }

    const { isLoading, isError } = useQuery('listarManutencao', listarManutencoes, {
        refetchInterval: 5000,
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        refetchOnReconnect: true,
        staleTime: 5000,
        cacheTime: 5000,
    });

    if (isLoading) return <Text>Loading...</Text>
    if (isError) return <Text>Error...</Text>


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.desc}>
                        <Text>Manutenções: {manutencao.length}</Text>
                        <Text>Manutenções por Veiculo: {manutencaoPorVeiculo.length}</Text>
                        <Text>Manutenções por Status: {manutencaoPorStatus.length}</Text>
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
                                { x: 1, y: manutencao.length, label: 'Manutenções' },
                                { x: 2, y: manutencaoPorStatus.length, label: 'por status' },
                            ]}
                            colorScale={['green', 'red']}
                        />
                    </View>
                    <Text onPress={() => { setListarManutencao(!listarManutencao) }
                    }>Manutenções</Text>
                    {listarManutencao && (
                        <DataTable style={styles.table}>
                            <DataTable.Header>
                                <DataTable.Title>Id</DataTable.Title>
                                <DataTable.Title>Data</DataTable.Title>
                                <DataTable.Title>Valor</DataTable.Title>
                                <DataTable.Title>Veiculo</DataTable.Title>
                                <DataTable.Title>Descrição</DataTable.Title>
                            </DataTable.Header>
                            {manutencao.map((item) => {
                                return (
                                    <DataTable.Row style={styles.manutencaoItem} key={item.id}>
                                        <DataTable.Cell>{item.id}</DataTable.Cell>
                                        <DataTable.Cell>{new Date(item.date).toLocaleString()}</DataTable.Cell>
                                        <DataTable.Cell>{item.cost}</DataTable.Cell>
                                        <DataTable.Cell>{item.VehicleId}</DataTable.Cell>
                                        <DataTable.Cell>{item.description}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        padding: 10,
    },
    content: {
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },

    chart: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    manutencaoItem: {
        backgroundColor: '#fff',
    },
    table: {
        paddingBottom: 20,
    }
})