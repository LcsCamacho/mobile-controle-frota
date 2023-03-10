import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { VictoryPie } from 'victory-native';
import VeiculoForm from "./veiculoForm";
const { width, height } = Dimensions.get('screen')

export default function DashboardVeiculos() {
  const { user } = useSelector((state: any) => state.user)
  const [veiculos, setVeiculos] = useState([]);
  const [veiculosIndisp, setVeiculosIndisp] = useState([]);
  const [veiculosDisp, setVeiculosDisp] = useState([]);

  const [listarVeiculosIndisp, setListarVeiculosIndisp] = useState(false);
  const [listarVeiculosDisp, setListarVeiculosDisp] = useState(false);
  const [listarVeiculos, setListarVeiculos] = useState(false);
  const [inserirVeiculoForm, setInserirVeiculoForm] = useState(false);

  const listVehicle = async () => {
    const response = await fetch('http://192.168.0.115:3000/veiculo');
    const data = await response.json();
    setVeiculos(data);
  }

  const useQueryOptions = {
    refetchOnWindowFocus: true,
    retry: 2,
    refetchOnReconnect: true,
    refetchInterval: 5000,
  }
  const { isLoading, error } = useQuery('veiculos', listVehicle, useQueryOptions);

  useEffect(() => {
    const veiculosIndisp = veiculos.filter((veiculo: any) => !veiculo.avaliable);
    const veiculosDisp = veiculos.filter((veiculo: any) => veiculo.avaliable);
    setVeiculosIndisp(veiculosIndisp);
    setVeiculosDisp(veiculosDisp);
  }, [veiculos])

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error...</Text>

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>

          <Text>Dashboard Veiculos</Text>
          <Text>Veiculos: {veiculos.length}</Text>
          <Text>Disponiveis: {veiculosDisp.length}</Text>
          <Text>Indisponiveis: {veiculosIndisp.length}</Text>
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
                { x: 1, y: veiculosDisp.length, label: 'Disp' },
                { x: 2, y: veiculosIndisp.length, label: 'Indisp' },
              ]}
              colorScale={['green', 'red']}
            />
          </View>

          <Text style={listarVeiculos ? stylesMenuOpen.todos : stylesMenuClosed.todos}
            onPress={() => setListarVeiculos(!listarVeiculos)}>Veiculos {listarVeiculos ? "-" : "+"}</Text>
          {listarVeiculos && (
            <View style={styles.veiculoContainer}>
              {veiculos.map((veiculo: any) => (
                <View style={styles.veiculoItem} key={veiculo.id}>
                  <Text>{veiculo.id}</Text>
                  <Text>{veiculo.plate}</Text>
                  <Text>{veiculo.model}</Text>
                </View>
              ))}
            </View>
          )}


          <Text style={listarVeiculosDisp ? stylesMenuOpen.disp : stylesMenuClosed.disp}
            onPress={() => setListarVeiculosDisp(!listarVeiculosDisp)}>Veiculos Disponiveis {listarVeiculosDisp ? "-" : "+"}</Text>
          {listarVeiculosDisp && (
            <View style={styles.veiculoContainer}>
              {veiculosDisp.map((veiculo: any) => (
                <View style={styles.veiculoItem} key={veiculo.id}>
                  <Text>{veiculo.id}</Text>
                  <Text>{veiculo.plate}</Text>
                  <Text>{veiculo.model}</Text>
                </View>
              ))}
            </View>
          )}


          <Text style={listarVeiculosIndisp ? stylesMenuOpen.indisp : stylesMenuClosed.indisp}
            onPress={() => setListarVeiculosIndisp(!listarVeiculosIndisp)}>Veiculos Indisponiveis {listarVeiculosIndisp ? "-" : "+"}</Text>
          {listarVeiculosIndisp && (
            <View style={styles.veiculoContainer}>
              {veiculosIndisp.map((veiculo: any) => (
                <View style={styles.veiculoItem} key={veiculo.id}>
                  <Text>{veiculo.id}</Text>
                  <Text>{veiculo.plate}</Text>
                  <Text>{veiculo.model}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={inserirVeiculoForm ? stylesMenuOpen.inserirVeiculo : stylesMenuClosed.inserirVeiculo}
            onPress={() => setInserirVeiculoForm(!inserirVeiculoForm)}>Inserir Veiculo {inserirVeiculoForm ? "-" : "+"}</Text>
          {inserirVeiculoForm && (
            <View style={styles.formVeiculo}>
              <VeiculoForm />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  )
}

const { styleMenuClosed } = StyleSheet.create({
  styleMenuClosed: {
    width: width,
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
    width: width,
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
  inserirVeiculo: styleMenuClosed
});

const stylesMenuOpen = StyleSheet.create({
  disp: styleMenuOpen,
  indisp: styleMenuOpen,
  todos: styleMenuOpen,
  inserirVeiculo: styleMenuOpen
});

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
  },
  content: {
    width: width,
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
    width: width,
  },
  veiculoContainer: {
    width: width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    paddingLeft: 30,

  },
  veiculoItem: {
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
  formVeiculo: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  }


})