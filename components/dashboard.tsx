import * as React from "react";
import DashboardGeral from './dashboardGeral';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DashboardVeiculos from "./dashboardVeiculos";

const Tab = createBottomTabNavigator();
export default function Dashboard() {

    return (
        <NavigationContainer independent>
            <Tab.Navigator>
                <Tab.Screen name="Dashboard Geral" component={DashboardGeral} />
                <Tab.Screen name="Dashboard Veiculos" component={DashboardVeiculos} />
                <Tab.Screen name="Dashboard Motoristas" component={DashboardGeral} />
                <Tab.Screen name="Dashboard Manutenção" component={DashboardGeral} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}