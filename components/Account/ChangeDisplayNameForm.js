import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateProfile } from '../../utils/action'

export default function ChangeDisplayNameForm( { displayName, setShowModal, toastRef, setReloadUser } ) {

    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSumit = async() => {

        if(!validadForm()) {
            return
        }
        
        setLoading(true)    
        const result = await updateProfile({ displayName: newDisplayName })
        setLoading(false)

        if(!result.statusResponse) {
            setError("Error al actualizar nombre y apellidos. Intenta mas tarde.")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se ha actulializado Nombre y Apellidos.", 2000)
        setShowModal(false)
        
    }

    const validadForm = () => {

        setError(null)

        if(isEmpty(newDisplayName)) {
            setError("Debes ingresar nombres y apellidos")
            return
        }

        if(newDisplayName === displayName) {
            setError("Debes ingresar nombres y apellidos Diferentes a los actuales")
            return
        }

        return true
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa Nombres y Apellidos"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            >
            </Input>
            <Button
                title="Cambiar Nombres y Apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSumit}
                loading={loading}
            >
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#1a9dfb"
    }
})
