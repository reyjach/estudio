import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Loading from '../../components/Loading'
import AddRealStatesForm from '../../components/RealState/AddRealStatesForm'

export default function AddRealState({ navigation }) {

    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <AddRealStatesForm toastRef={toastRef} setLoading={setLoading} navigation={navigation}></AddRealStatesForm>
            <Loading isVisible={loading} text="Creando anuncio"></Loading>
            <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
