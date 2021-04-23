import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'

import Loading from '../../components/Loading'
import { getMoreRealState, getRealState } from '../../utils/action'
import ListRealState from '../../components/RealState/ListRealState'

export default function RealState({ navigation }) {

    const [user, setUser] = useState(null)
    const [startRealState, setStartRealState] = useState(null)
    const [real, setReal] = useState([])
    const [loading, setLoading] = useState(false)

    const limitRealStates = 6

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getRealState(limitRealStates)
                if (response.statusResponse) {
                    setStartRealState(response.startRealState)
                    setReal(response.realStates)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async() => {
        if(!startRealState){
            return
        }

        setLoading(true)

        const response = await getMoreRealState(limitRealStates, startRealState)
                if (response.statusResponse) {
                    setStartRealState(response.startRealState)
                    setReal([...real, ...response.realStates])
                }

        setLoading(false)
    }


    if(user === null) {
        return <Loading isVisible={true} text="Cargando..."></Loading>
    }


    return (
        <View style={styles.viewBody}>
            {
                size(real) > 0 ? (
                    <ListRealState 
                        realStates={real} 
                        navigation={navigation} 
                        handleLoadMore={handleLoadMore}
                    >
                    </ListRealState>
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay anuncios registrados.</Text>
                    </View>
                )
            }
            {
                user && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#e21e16"
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("add-real-state")}
                    >
                    </Icon>
                )
            }
            <Loading isVisible={loading} text="cargando Datos"></Loading>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
