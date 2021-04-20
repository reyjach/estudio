import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import HomeStack from './HomeStack'
import SearchStack from './SearchStack'
import RealStateStack from './RealStateStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

const Navigation = () => {

    const screenOptions = (route, color)  => {

        let iconName
        switch (route.name) {
            case "home":
                iconName = "shield-home-outline"
                break;
            case "real state":
                iconName = "sign-real-estate"
                break;
            case "search":
                iconName = "home-search-outline"
                break;
            case "account":
                iconName = "card-account-details-outline"
                break;
        }
        return (
            <Icon
                type="material-community"
                name={iconName}
                size={24}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="home"
                tabBarOptions={{
                    inactiveTintColor: "#d23246",
                    activeTintColor: "#1a9dfb" 
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="home"
                    component={HomeStack}
                    options={{ title: "Home" }}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="real state"
                    component={RealStateStack}
                    options={{ title: "Inmoviliaria" }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Cuenta" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    
    )
}

export default Navigation
