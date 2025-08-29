import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { MenuView } from './MenuView';
import { DashboardView } from './DashboardView';
import { FrasesView } from './FrasesView';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Emoções') {
                        iconName = focused ? 'happy' : 'happy-outline';
                    } else if (route.name === 'Dashboard') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Frases') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'lime', 
                tabBarInactiveTintColor: 'gray',   
                tabBarStyle: {
                    backgroundColor: '#1F2937', 
                    borderTopWidth: 0,          
                },
                headerStyle: {
                    backgroundColor: '#1F2937',
                },
                headerTintColor: '#fff',
            })}
        >
            <Tab.Screen name="Emoções" component={MenuView}
                options={{
                    headerStyle: {
                        backgroundColor: '#1F2937',
                    },
                    headerTintColor: '#fff',
                }} />
            <Tab.Screen name="Dashboard" component={DashboardView}
                options={{
                    headerStyle: {
                        backgroundColor: '#1F2937',
                    },
                    headerTintColor: '#fff',
                }} />
            <Tab.Screen name="Frases" component={FrasesView}
                options={{
                    headerStyle: {
                        backgroundColor: '#1F2937',
                    },
                    headerTintColor: '#fff',
                }} />
        </Tab.Navigator>
    );
}