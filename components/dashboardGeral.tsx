import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryPie } from 'victory-native';
const { width, height } = Dimensions.get('screen')




export default function DashboardGeral() {
  const [veiculos, setVeiculos] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [manutencao, setManutencao] = useState([]);
  const [dataVeiculos, setDataVeiculos] = useState([]);


  const useListAll = () => {
    const [loading, setLoading] = useState(true);
    const listAll = async () => {
      try {
        const [veiculos, motoristas, manutencao] = await Promise.all([
          fetch('http://192.168.0.115:3000/veiculo'),
          fetch('http://192.168.0.115:3000/motorista'),
          fetch('http://192.168.0.115:3000/manutencao')
        ]);
        const [veiculosJson, motoristasJson, manutencaoJson] = await Promise.all([
          veiculos.json(),
          motoristas.json(),
          manutencao.json()
        ]);
        setLoading(false);
        return { veiculosJson, motoristasJson, manutencaoJson };
      } catch (error) {
        console.log(error);
      }
    };
    return { listAll, loading };
  }

  const { listAll, loading } = useListAll();

  useEffect(() => {
    listAll().then((data) => {
      setManutencao(data?.manutencaoJson);
      setMotoristas(data?.motoristasJson);
      setVeiculos(data?.veiculosJson);
    });
  }, [])

  if (loading) return <Text>Loading...</Text>

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Dashboard Geral</Text>
        <Text>Veiculos: {veiculos.length}</Text>
        <Text>Motoristas: {motoristas.length}</Text>
        <Text>Manutencao: {manutencao.length}</Text>
        <View style={styles.chart}>
          <VictoryPie
            style={{
              labels: {
                fontSize: 15,
                fill: "red"
              },
            }}
            data={[
              { x: 'Veiculos', y: veiculos.length },
              { x: 'Motoristas', y: motoristas.length },
              { x: 'Manutencao', y: manutencao.length }
            ]}
            colorScale={['tomato', 'orange', 'gold']}
          />
        </View>

      </SafeAreaView>
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
  }
})