import { useAtom, atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils';
import { View, StyleSheet } from 'react-native';
import DashboardGeral from './dashboardGeral';

const userJotai = atomWithStorage('user', '')

export default function Dashboard({navigation, route}:any) {
    const [user, setUser] = useAtom(userJotai)
    
    return (
        <>
            <View style={styles.container}>
                <DashboardGeral/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
