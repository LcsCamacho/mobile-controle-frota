import * as React  from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";
import { VictoryPie } from 'victory-native';
import { useFetch } from "../hooks/UseFetchAll";
import { Motorista, Manutencao, Veiculo } from "../types";
const { width, height } = Dimensions.get('screen')

interface stateListAll {
  veiculos: Veiculo[];
  motoristas: Motorista[];
  manutencoes: Manutencao[];
}

export default function DashboardGeral() {
  const {user} = useSelector((state: any) => state.user)

  const { data, error } = useFetch<stateListAll>('http://10.87.202.156:3000')

  if (error) return <Text>Error...</Text>
  if (!data) return <Text>Loading...</Text>
  const { veiculos, motoristas, manutencoes } = data;
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.dados}>
          <Text>Dashboard Geral</Text>
          <Text>Veiculos: {veiculos.length}</Text>
          <Text>Motoristas: {motoristas.length}</Text>
          <Text>Manutenções: {manutencoes.length}</Text>

        </SafeAreaView>
        <View style={styles.chart}>
          <VictoryPie
            animate={{ duration: 1000 }}
            height={height * .4}
            style={{
              labels: {
                fontSize: 15,
                fill: "red"
              },
            }}
            data={[
              { x: 'Veiculos', y: veiculos.length },
              { x: 'Motoristas', y: motoristas.length },
              { x: 'Manutencao', y: manutencoes.length }
            ]}
            colorScale={['blue', 'red', 'gold']}
          />
        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,

  },
  chart: {
    width: width,
    alignItems: 'center',
  },
  dados:{
    width: width,
    alignItems: 'center',
    gap: 10,
    flexDirection: 'column',
  }
})