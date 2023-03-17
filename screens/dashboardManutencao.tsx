import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { URL_FETCH } from '../fetchUrl';
import { Manutencao } from '../types';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useToggleColor } from '../hooks/UseToogleColor';
import { useFormatBrl } from '../hooks/UseFormatBrl';

const { width, height } = Dimensions.get('screen')


export default function DashboardManutencao() {
    const { user } = useSelector((state: any) => state.user)

    const [manutencao, setManutencao] = useState<Manutencao[]>([]);
    const [showFinished, setShowFinished] = useState(false);
    const [showUnfinished, setShowUnfinished] = useState(false);
    const [showNormal, setShowNormal] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [page, setPage] = useState<number>(0);
    const [fromIndex, setFromIndex] = useState(page * itemsPerPage);
    const [toIndex, setToIndex] = useState((page + 1) * itemsPerPage);


    const listarManutencoes = async () => {
        if (showFinished || showUnfinished) {
            return
        }
        if (showNormal) {
            const [manutencao] = await Promise.all([
                fetch(`http://${URL_FETCH}:3000/manutencao`),
            ])
            const [manutencaoJson] = await Promise.all([
                manutencao.json(),
            ])
            setManutencao(manutencaoJson)
        }
    }

    useEffect(() => {
        setFromIndex(page * itemsPerPage);
        setToIndex((page + 1) * itemsPerPage);
    }, [page])


    const handleListNormal = () => {
        setShowNormal(!showNormal)
        setShowFinished(false)
        setShowUnfinished(false)
    }

    const handleListFinished = () => {
        setShowNormal(false)
        setShowFinished(!showFinished)
    }

    const handleListUnfinished = () => {
        setShowNormal(false)
        setShowUnfinished(!showUnfinished)
    }

    const { isLoading, isError } = useQuery('listarManutencao', listarManutencoes, {
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });


    if (isError) return <Text>Error...</Text>

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.desc}>
                        <Text style={styles.title}>Relatório Total</Text>
                    </View>
                    {(showNormal && (<>
                        <Text>Quantidade: {manutencao.length}</Text>

                        <DataTable style={styles.table}>
                            <DataTable.Header>
                                <DataTable.Title>Data</DataTable.Title>
                                <DataTable.Title>Hora</DataTable.Title>
                                <DataTable.Title>Valor</DataTable.Title>
                                <DataTable.Title>Veiculo</DataTable.Title>
                                <DataTable.Title>Descrição</DataTable.Title>
                                <DataTable.Title>Status</DataTable.Title>
                            </DataTable.Header>
                            {isLoading ? Array.from({ length: 1 }).map((_, index) => (
                                <DataTable.Row key={index} >
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                </DataTable.Row>
                            )) : manutencao.slice(fromIndex, toIndex).map((item) => {
                                return (
                                    <DataTable.Row style={styles.manutencaoItem} key={item.id}>
                                        <DataTable.Cell>{new Date(item.date).toLocaleString()}</DataTable.Cell>
                                        <DataTable.Cell>{new Date(item.date).toLocaleTimeString()}</DataTable.Cell>
                                        <DataTable.Cell>{useFormatBrl(item.cost)}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.Vehicle.plate)}</DataTable.Cell>
                                        <DataTable.Cell>{item.description}</DataTable.Cell>
                                        <DataTable.Cell>{item.checkout ? <AntDesign name="checkcircleo" size={24} color="green" />
                                            : <MaterialIcons name="unpublished" size={24} color="red" />}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={itemsPerPage / manutencao.length}
                                onPageChange={(page) => {
                                    setPage(page)
                                }}
                                label={`${page + 1} de ${2}`}
                                numberOfItemsPerPageList={[1, 1]}
                            />

                        </DataTable>
                    </>)
                    )}
                    {(showFinished && (<>
                        <Text>Quantidade: {manutencao.filter((item) => item.checkout).length}</Text>

                        <DataTable style={styles.table}>
                            <DataTable.Header>
                                <DataTable.Title>Data</DataTable.Title>
                                <DataTable.Title>Hora</DataTable.Title>
                                <DataTable.Title>Valor</DataTable.Title>
                                <DataTable.Title>Veiculo</DataTable.Title>
                                <DataTable.Title>Descrição</DataTable.Title>
                                <DataTable.Title>Status</DataTable.Title>
                            </DataTable.Header>
                            {isLoading ? Array.from({ length: 1 }).map((_, index) => (
                                <DataTable.Row key={index} >
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                </DataTable.Row>
                            )) : manutencao.filter((item) => item.checkout).slice(fromIndex, toIndex).map((item) => {
                                return (
                                    <DataTable.Row style={styles.manutencaoItem} key={item.id}>
                                        <DataTable.Cell>{new Date(item.date).toLocaleString()}</DataTable.Cell>
                                        <DataTable.Cell>{new Date(item.date).toLocaleTimeString()}</DataTable.Cell>
                                        <DataTable.Cell>{useFormatBrl(item.cost)}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.Vehicle.plate)}</DataTable.Cell>
                                        <DataTable.Cell>{item.description}</DataTable.Cell>
                                        <DataTable.Cell>{item.checkout ? <AntDesign name="checkcircleo" size={24} color="green" />
                                            : <MaterialIcons name="unpublished" size={24} color="red" />}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={itemsPerPage / manutencao.length}
                                onPageChange={(page) => {
                                    setPage(page)
                                }}
                                label={`${page + 1} de ${2}`}
                                numberOfItemsPerPageList={[1, 1]}
                            />

                        </DataTable>
                    </>)
                    )}

                    {(showUnfinished && (<>
                        <Text>Quantidade: {manutencao.filter((item) => !item.checkout).length}</Text>

                        <DataTable style={styles.table}>
                            <DataTable.Header>
                                <DataTable.Title>Data</DataTable.Title>
                                <DataTable.Title>Hora</DataTable.Title>
                                <DataTable.Title>Valor</DataTable.Title>
                                <DataTable.Title>Veiculo</DataTable.Title>
                                <DataTable.Title>Descrição</DataTable.Title>
                                <DataTable.Title>Status</DataTable.Title>
                            </DataTable.Header>
                            {isLoading ? Array.from({ length: 1 }).map((_, index) => (
                                <DataTable.Row key={index} >
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                    <DataTable.Cell> Loading...  </DataTable.Cell>
                                </DataTable.Row>
                            )) : manutencao.filter((item) => !item.checkout).slice(fromIndex, toIndex).map((item) => {
                                return (
                                    <DataTable.Row style={styles.manutencaoItem} key={item.id}>
                                        <DataTable.Cell>{new Date(item.date).toLocaleString()}</DataTable.Cell>
                                        <DataTable.Cell>{new Date(item.date).toLocaleTimeString()}</DataTable.Cell>
                                        <DataTable.Cell>{useFormatBrl(item.cost)}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.Vehicle.plate)}</DataTable.Cell>
                                        <DataTable.Cell>{item.description}</DataTable.Cell>
                                        <DataTable.Cell>{item.checkout ? <AntDesign name="checkcircleo" size={24} color="green" />
                                            : <MaterialIcons name="unpublished" size={24} color="red" />}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={itemsPerPage / manutencao.length}
                                onPageChange={(page) => {
                                    setPage(page)
                                }}
                                label={`${page + 1} de ${2}`}
                                numberOfItemsPerPageList={[1, 1]}
                            />

                        </DataTable>
                    </>)
                    )}


                    <View style={styles.optionsContainer}>
                        <Text onPress={handleListFinished} style={useToggleColor(showFinished, width).style}>Listar apenas Finalizadas</Text>
                        <Text onPress={handleListUnfinished} style={useToggleColor(showUnfinished, width).style}>Listar apenas em Andamento</Text>
                        <Text onPress={handleListNormal} style={useToggleColor(showNormal, width).style}>Listar Todos</Text>
                    </View>
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
        justifyContent: 'flex-start',
        width: width,
    },
    content: {
        width: width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
    },
    desc: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    manutencaoItem: {
        backgroundColor: '#f6f6f6',
        marginVertical: 5,
    },
    table: {
        paddingBottom: 20,
        width: width,
    },
    scrollView: {
        width: width,
        gap: 10,
        padding: 10,
    },
    optionsContainer: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 5,
    },
    options: {
        width: width * 0.8,
        height: 60,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'dashed',
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
    },

})