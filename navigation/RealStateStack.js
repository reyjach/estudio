import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import RealState from '../screens/house/RealState'

const Stack = createStackNavigator()

export default function RealStateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="real state"
                component={RealState}
                options={{title:"Inmoviliaria"}}
            
            />
        </Stack.Navigator>
    )
}

