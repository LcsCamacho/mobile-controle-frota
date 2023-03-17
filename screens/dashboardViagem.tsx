import * as React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, } from 'react-native'
import { useState } from 'react'
import { DataTable } from 'react-native-paper'
import { useQuery } from 'react-query';
import { Viagem } from '../types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { URL_FETCH } from '../fetchUrl';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useToggleColor } from '../hooks/UseToogleColor';

const { width, height } = Dimensions.get('screen')

export default function DashboardViagem() {
    const { user } = useSelector((state: any) => state.user)
    const [page, setPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [fromIndex, setFromIndex] = useState(page * itemsPerPage);
    const [toIndex, setToIndex] = useState((page + 1) * itemsPerPage);
    const [viagens, setViagens] = useState<Viagem[]>([])
    const [viagensFinished, setViagensFinished] = useState<Viagem[]>([])
    const [viagensUnfinished, setViagensUnfinished] = useState<Viagem[]>([])
    const [showFinished, setShowFinished] = useState(false)
    const [showUnfinished, setShowUnfinished] = useState(false)
    const [showNormal, setShowNormal] = useState(true)
    const [loadingFinished, setLoadingFinished] = useState(false)
    const [loadingUnfinished, setLoadingUnfinished] = useState(false)

    const queryOptions = {
        refetchOnWindowFocus: true,
        retry: 0,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 5000,
    }

    const { isLoading, isError } = useQuery('viagens', async () => {
        const response = await fetch(`http://${URL_FETCH}:3000/viagem`)
        const data = await response.json()
        setViagens(data)
    }, queryOptions)

    useEffect(() => {
        setFromIndex(page * itemsPerPage);
        setToIndex((page + 1) * itemsPerPage);
    }, [page])

    useEffect(() => {
        setViagensFinished((state) => viagens.filter((viagem: any) => viagem.checkOut))
        setViagensUnfinished((state) => viagens.filter((viagem: any) => !viagem.checkOut))

    }, [viagens])

    useEffect(() => {
        if (loadingFinished) {
            setLoadingFinished(false)
            return
        }
        if (loadingUnfinished) {
            setLoadingUnfinished(false)
        }
    }, [viagens])

    if (isError) return <Text>Error...</Text>

    return (
        <>
            <View style={styles.container} >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.content}>
                        <View style={styles.tableContent}>

                            {showNormal && (<>
                                <Text style={styles.title}>Quantidade : {viagens.length}</Text>
                                <DataTable style={styles.table}>
                                    <DataTable.Header>
                                        <DataTable.Title>Veículo </DataTable.Title>
                                        <DataTable.Title> Motorista </DataTable.Title>
                                        <DataTable.Title> Hora </DataTable.Title>
                                        <DataTable.Title> Data </DataTable.Title>
                                        <DataTable.Title> Status </DataTable.Title>
                                    </DataTable.Header>
                                    {isLoading ? Array.from({ length: 1 }).map((_, index) => (
                                        <DataTable.Row key={index} >
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                        </DataTable.Row>
                                    )) :
                                        viagens.slice(fromIndex, toIndex).map((viagem) => (
                                            <DataTable.Row style={styles.viagemItem} key={viagem.id} >
                                                <DataTable.Cell>{viagem.Vehicle.plate} </DataTable.Cell>
                                                <DataTable.Cell> {viagem.Driver.name} </DataTable.Cell>
                                                <DataTable.Cell> {new Date(viagem.date).toLocaleTimeString()} </DataTable.Cell>
                                                <DataTable.Cell> {new Date(viagem.date).toLocaleDateString()} </DataTable.Cell>
                                                <DataTable.Cell> {viagem.checkOut ? <AntDesign name="checkcircleo" size={24} color="green" />
                                                    : <MaterialIcons name="unpublished" size={24} color="red" />} </DataTable.Cell>
                                            </DataTable.Row>
                                        ))
                                    }
                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={3}
                                        onPageChange={(page) => {
                                            setPage(page)
                                        }}
                                        label={`${page + 1} de ${2}`}
                                        numberOfItemsPerPageList={[1, 1]}
                                    />

                                </DataTable>
                            </>)}

                            {showFinished && (<>
                                <Text style={styles.title}>Relatório Finalizadas</Text>
                                <Text style={styles.title}>Quantidade : {viagensFinished.length}</Text>

                                < DataTable style={styles.table}>
                                    <DataTable.Header>
                                        <DataTable.Title>Veículo </DataTable.Title>
                                        <DataTable.Title> Motorista </DataTable.Title>
                                        <DataTable.Title> Hora </DataTable.Title>
                                        <DataTable.Title> Data </DataTable.Title>
                                        <DataTable.Title> Status </DataTable.Title>
                                    </DataTable.Header>
                                    {loadingFinished ? Array.from({ length: 1 }).map((_, index) => (
                                        <DataTable.Row key={index} >
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                        </DataTable.Row>
                                    )) :
                                        viagensFinished.slice(fromIndex, toIndex).map((viagem) => (
                                            <DataTable.Row key={viagem.id} >
                                                <DataTable.Cell>{viagem.Vehicle.plate} </DataTable.Cell>
                                                <DataTable.Cell> {viagem.Driver.name} </DataTable.Cell>
                                                <DataTable.Cell> {new Date(viagem.date).toLocaleTimeString()} </DataTable.Cell>
                                                <DataTable.Cell> {new Date(viagem.date).toLocaleDateString()} </DataTable.Cell>
                                                <DataTable.Cell> {viagem.checkOut ? <AntDesign name="checkcircleo" size={24} color="green" />
                                                    : <MaterialIcons name="unpublished" size={24} color="red" />} </DataTable.Cell>
                                            </DataTable.Row>
                                        ))
                                    }
                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={3}
                                        onPageChange={(page) => {
                                            setPage(page)
                                        }}
                                        label={`${page + 1} de ${2}`}
                                        numberOfItemsPerPageList={[1, 1]}
                                    />
                                </DataTable>
                            </>)}

                            {showUnfinished && (<>
                                <Text style={styles.title}>Relatório em Andamento</Text>
                                <Text style={styles.title}>Quantidade : {viagensUnfinished.length}</Text>

                                <DataTable style={styles.table}>
                                    <DataTable.Header>
                                        <DataTable.Title>Veículo </DataTable.Title>
                                        <DataTable.Title> Motorista </DataTable.Title>
                                        <DataTable.Title> Hora </DataTable.Title>
                                        <DataTable.Title> Data </DataTable.Title>
                                        <DataTable.Title> Status </DataTable.Title>
                                    </DataTable.Header>

                                    {loadingUnfinished ? Array.from({ length: 1 }).map((_, index) => (
                                        <DataTable.Row key={index} >
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                            <DataTable.Cell> Loading...  </DataTable.Cell>
                                        </DataTable.Row>
                                    )) :
                                        viagensUnfinished.slice(fromIndex, toIndex).map((viagem) => (
                                            <DataTable.Row key={viagem.id} >
                                                <DataTable.Cell>{viagem.Vehicle.plate} </DataTable.Cell>
                                                <DataTable.Cell> {viagem.Driver.name} </DataTable.Cell>
                                                <DataTable.Cell> {new Date(viagem.date).toLocaleTimeString()} </DataTable.Cell>
                                                <DataTable.Cell> {new Date(viagem.date).toLocaleDateString()} </DataTable.Cell>
                                                <DataTable.Cell> {viagem.checkOut ? <AntDesign name="checkcircleo" size={24} color="green" />
                                                    : <MaterialIcons name="unpublished" size={24} color="red" />} </DataTable.Cell>
                                            </DataTable.Row>
                                        ))
                                    }
                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={3}
                                        onPageChange={(page) => {
                                            setPage(page)
                                        }}
                                        label={`${page + 1} de ${2}`}
                                        numberOfItemsPerPageList={[1, 1]}
                                    />
                                </DataTable>
                            </>)}
                        </View>
                        <View style={styles.optionsContainer}>
                            <Text onPress={() => setShowFinished(!showFinished)} style={useToggleColor(showFinished, width).style}>Listar apenas Finalizadas</Text>
                            <Text onPress={() => setShowUnfinished(!showUnfinished)} style={useToggleColor(showUnfinished, width).style}>Listar apenas em Andamento</Text>
                            <Text onPress={() => setShowNormal(!showNormal)} style={useToggleColor(showNormal, width).style}>Listar Todos</Text>
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    scrollView: {
        width: width,
        backgroundColor: '#fff',
    },
    content: {
        width: width,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
    },
    tableContent: {
        marginTop: 20,
        width: width,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        width: width,
    },
    optionsContainer: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    options: {
        width: width * 0.4,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    viagemItem: {
        width: width,
        marginVertical: 5,
        backgroundColor: '#f6f6f6',
    }

})
