import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import RealState from '../screens/realState/RealState'
import AddRealState from '../screens/realState/AddRealState'
import RealSta from '../screens/realState/RealSta'
import AddReviewRealState from '../screens/realState/AddReviewRealState'

const Stack = createStackNavigator()

export default function RealStateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="real-state"
                component={RealState}
                options={{title:"Inmoviliaria"}}
            
            />
            <Stack.Screen
                name="add-real-state"
                component={AddRealState}
                options={{title:"Agregar Apartamento"}}
            
            />
            <Stack.Screen
                name="real-sta"
                component={RealSta}
            />
            <Stack.Screen
                name="add-review-state"
                component={AddReviewRealState}
                options={{title:"Agregar un comentario"}}
            />
        </Stack.Navigator>
    )
}

