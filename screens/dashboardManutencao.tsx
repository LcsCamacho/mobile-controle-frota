import * as React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, } from 'react-native'
import { useState } from 'react'
import { DataTable } from 'react-native-paper'
import { VictoryBar, VictoryPie } from 'victory-native';
import { useQuery } from 'react-query';
import { Manutencao } from '../types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('screen')


export default function DashboardManutencao() {
    const { user } = useSelector((state: any) => state.user)

    const [manutencao, setManutencao] = useState<Manutencao[]>([]);
    const [manutencaoPorStatus, setManutencaoPorStatus] = useState<Manutencao[]>([]);
    const [veiculosEmManutencao, setVeiculosEmManutencao] = useState<Manutencao[]>([]);
    const [listarManutencao, setListarManutencao] = useState(false);

    const listarManutencoes = async () => {
        const [manutencao, veiculosManutencao] = await Promise.all([
                fetch('http://10.87.202.156:3000/manutencao'),
                fetch('http://10.87.202.156:3000/veiculos-manutencao'),
            ])
        const [manutencaoJson, veiculosManutencaoJson] = await Promise.all([
                manutencao.json(),
                veiculosManutencao.json(),
        ])

        setVeiculosEmManutencao(veiculosManutencaoJson)
        setManutencao(manutencaoJson)
    }

    
    useEffect(() => {
        setManutencaoPorStatus(manutencao.filter((manutencao) => manutencao.checkout))
    }, [manutencao])

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
                <ScrollView style={styles.scrollView}>
                    <View style={styles.desc}>
                        <Text>Manutenções: {manutencao.length}</Text>
                        <Text>Manutenções em andamento: {manutencaoPorStatus.length}</Text>
                    </View>
                    <View style={styles.chart}>
                        <VictoryBar
                            height={height / 2.5}
                            width={width * 0.5}
                            data={[
                                { x: 1, y: manutencao.length, label: 'Manutenções' },
                                { x: 2, y: manutencaoPorStatus.length, label: 'Em andamento' },
                            ]}
                            colorScale={['green', 'red']}
                        />
                    </View>
                    <Text onPress={() => { setListarManutencao(!listarManutencao) }
                    }>Manutenções</Text>
                    {listarManutencao && (
                        <DataTable style={styles.table}>
                            <DataTable.Header>
                                <DataTable.Title>Data</DataTable.Title>
                                <DataTable.Title>Valor</DataTable.Title>
                                <DataTable.Title>Veiculo</DataTable.Title>
                                <DataTable.Title>Descrição</DataTable.Title>
                            </DataTable.Header>
                            {manutencao.map((item) => {
                                return (
                                    <DataTable.Row style={styles.manutencaoItem} key={item.id}>
                                        <DataTable.Cell>{new Date(item.date).toLocaleString()}</DataTable.Cell>
                                        <DataTable.Cell>{item.cost}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.Vehicle.plate)}</DataTable.Cell>
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
    },
    content: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    chart: {
        width: width * 0.9,
        alignItems: 'center',
        padding: 10,
    },
    desc: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    manutencaoItem: {
        backgroundColor: '#f6f6f6',
    },
    table: {
        paddingBottom: 20,
    },
    scrollView:{
        width: width * 0.9,
        gap: 10,
        padding: 10,
    }
})