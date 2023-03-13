import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { VictoryPie } from 'victory-native';
import { Motorista } from "../types";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import MotoristaForm from "./motoristaForm";
const { width, height } = Dimensions.get('screen')

export default function DashboardMotoristas() {
    const { user } = useSelector((state: any) => state.user)
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [motoristasIndisp, setMotoristasIndisp] = useState<Motorista[]>([]);
    const [motoristasDisp, setMotoristasDisp] = useState<Motorista[]>([]);

    const [listarMotoristasIndisp, setListarMotoristasIndisp] = useState(false);
    const [listarMotoristasDisp, setListarMotoristasDisp] = useState(false);
    const [listarMotoristas, setListarMotoristas] = useState(false);
    const [inserirMotoristasForm, setInserirMotoristasForm] = useState(false);

    const fetchMotorista = async () => {
        const response = await fetch('http://10.87.202.156:3000/motorista');
        const data = await response.json();
        setMotoristas(data);
    }

    const useQueryOptions = {
        refetchOnWindowFocus: true,
        retry: 2,
        refetchOnReconnect: true,
        refetchInterval: 5000,
    }
    const { isLoading, isError } = useQuery('motoristas', fetchMotorista, useQueryOptions);

    useEffect(() => {
        const motoristasIndisp = motoristas.filter((motorista) => !motorista.avaliable);
        const motoristasDisp = motoristas.filter((motorista) => motorista.avaliable);
        setMotoristasIndisp(motoristasIndisp);
        setMotoristasDisp(motoristasDisp);
    }, [motoristas])

    if (isLoading) return <Text>Loading...</Text>
    if (isError) return <Text>Error...</Text>

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>

                    <Text>Dashboard Motoristas</Text>
                    <Text>Motoristas: {motoristas.length}</Text>
                    <Text>Disponiveis: {motoristasDisp.length}</Text>
                    <Text>Indisponiveis: {motoristasIndisp.length}</Text>
                    <View style={styles.chart}>
                        <VictoryPie
                            animate={{ duration: 2000 }}
                            width={width * .92}
                            height={height * .3}
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
                                { x: 1, y: motoristasDisp.length, label: 'Disponível' },
                                { x: 2, y: motoristasIndisp.length, label: 'Indisponível' },
                            ]}
                            colorScale={['green', 'red']}
                        />
                    </View>

                    <Text style={listarMotoristas ? stylesMenuOpen.todos : stylesMenuClosed.todos}
                        onPress={() => setListarMotoristas(!listarMotoristas)}>Motoristas {listarMotoristas ? "-" : "+"}</Text>
                    {listarMotoristas && (
                        <View style={styles.motoristaContainer}>
                            {motoristas.map((motorista) => (
                                <View style={styles.motoristaItem} key={motorista.id}>
                                    <Text>{motorista.name}</Text>
                                    {motorista.avaliable ? (
                                        <MaterialIcons name="check-circle" size={24} color="green" />
                                    ) : (
                                        <MaterialIcons name="cancel" size={24} color="red" />
                                    )}
                                </View>
                            ))}
                        </View>
                    )}


                    <Text style={listarMotoristasDisp ? stylesMenuOpen.disp : stylesMenuClosed.disp}
                        onPress={() => setListarMotoristasDisp(!listarMotoristasDisp)}>Motoristas Disponiveis {listarMotoristasDisp ? "-" : "+"}</Text>
                    {listarMotoristasDisp && (
                        <View style={styles.motoristaContainer}>
                            {motoristasDisp.map((motorista) => (
                                <View style={styles.motoristaItem} key={motorista.id}>
                                    <Text>{motorista.id}</Text>
                                    <Text>{motorista.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}


                    <Text style={listarMotoristasIndisp ? stylesMenuOpen.indisp : stylesMenuClosed.indisp}
                        onPress={() => setListarMotoristasIndisp(!listarMotoristasIndisp)}>Motoristas Indisponiveis {listarMotoristasIndisp ? "-" : "+"}</Text>
                    {listarMotoristasIndisp && (
                        <View style={styles.motoristaContainer}>
                            {motoristasIndisp.map((motorista: any) => (
                                <View style={styles.motoristaItem} key={motorista.id}>
                                    <Text>{motorista.name}</Text>
                                    <Text>{motorista.avaliable}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {user.management && <Text style={inserirMotoristasForm ? stylesMenuOpen.inserirMotorista : stylesMenuClosed.inserirMotorista}
                        onPress={() => setInserirMotoristasForm(!inserirMotoristasForm)}>Inserir Motorista {inserirMotoristasForm ? "-" : "+"}</Text>
                    }
                    {inserirMotoristasForm && (
                        <View style={styles.formMotorista}>
                            <MotoristaForm />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const { styleMenuClosed } = StyleSheet.create({
    styleMenuClosed: {
        width: width * .95,
        textAlign: 'center',
        padding: 10,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: '#000',
    }
});

const { styleMenuOpen } = StyleSheet.create({
    styleMenuOpen: {
        backgroundColor: '#ccc',
        width: width * .95,
        textAlign: 'center',
        padding: 10,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: '#000',
    }
});

const stylesMenuClosed = StyleSheet.create({
    disp: styleMenuClosed,
    indisp: styleMenuClosed,
    todos: styleMenuClosed,
    inserirMotorista: styleMenuClosed
});

const stylesMenuOpen = StyleSheet.create({
    disp: styleMenuOpen,
    indisp: styleMenuOpen,
    todos: styleMenuOpen,
    inserirMotorista: styleMenuOpen
});

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: width * .95,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    scrollView: {

    },
    content: {
        width: width * .95,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        padding: 20,
    },
    chart: {
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        width: width * .95,

    },
    motoristaContainer: {
        width: width * .95,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    motoristaItem: {
        width: width / 2.5,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
    },
    formMotorista: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
    }


})