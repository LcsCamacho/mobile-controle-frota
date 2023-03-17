import * as React from "react";
import DashboardGeral from './dashboardGeral';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DashboardVeiculos from "./dashboardVeiculos";
import DashboardMotoristas from "./dashboardMotoristas";
import DashboardManutencao from "./dashboardManutencao";
import DashboardViagem from "./dashboardViagem";
import Ionicons from '@expo/vector-icons/Ionicons';

type TabBarIconProps = {
    focused: boolean;
    color: string;
    size: number;
};
type TabBarIconName = 
'home' | 
'home-outline' | 
'settings' | 
'settings-outline' | 
'build' | 
'build-outline' |
'car' |
'car-outline' |
'person' |
'person-outline' |
'ellipse' |
'ellipse-outline'
;

const getTabBarIcon = (name: string) => {
    return ({ focused, color, size }: TabBarIconProps) => {
        let iconName: TabBarIconName;
        switch (name) {
            case 'Dashboard Geral':
                iconName = focused ? 'home' : 'home-outline';
                break;
            case 'Dashboard Veiculos':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
            case 'Dashboard Motoristas':
                iconName = focused ? 'person' : 'person-outline';
                break;
            case 'Dashboard Manutenção':
                iconName = focused ? 'build' : 'build-outline';
                break;
            case 'Dashboard Viagem':
                iconName = focused ? 'car' : 'car-outline';
                break;
            default:
                iconName = focused ? 'ellipse' : 'ellipse-outline';
                break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    };
};
const Tab = createBottomTabNavigator();
export default function Dashboard() {

    return (
        <NavigationContainer independent>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: getTabBarIcon(route.name),
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Dashboard Geral" component={DashboardGeral} />
                <Tab.Screen name="Dashboard Veiculos" component={DashboardVeiculos} />
                <Tab.Screen name="Dashboard Motoristas" component={DashboardMotoristas} />
                <Tab.Screen name="Dashboard Manutenção" component={DashboardManutencao} />
                <Tab.Screen name="Dashboard Viagem" component={DashboardViagem} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}