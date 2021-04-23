import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import { isEmpty } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Loading from '../../components/Loading'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocument } from '../../utils/action'


export default function AddReviewRealState({ navigation, route }) {

    const { id } = route.params
    const toastRef = useRef()

    const [rating, setRating] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const addReview = async() => {
        if(!validForm()){
            return
        }

        setLoading(true)

        const user = getCurrentUser()
        
        const data = {
            idUser: user.uid,
            avatarUser: user.photoURL,
            id,
            review,
            rating,
            createAt: new Date()
        }

        const responseAddReview = await addDocumentWithoutId("reviews", data)

        if (!responseAddReview.statusResponse) {
            setLoading(false)
            toastRef.current.show("Error al enviar el comentario, por favor intenta más tarde.", 3000)
            console.log(responseAddReview.error)
            return
        }

        setLoading(false)

        const responseGetRealState = await getDocumentById("apartaments", id)
        
        if(!responseGetRealState.statusResponse){
            setLoading(false)
            toastRef.current.show("Error al obtener el anuncio. Por favor ingresa mas tardes", 2000)
            return
        }

        const realState = responseGetRealState.document

        const ratingTotal = realState.ratingTotal + rating

        const quantityVoting = realState.quantityVoting + 1

        const ratingResult = ratingTotal / quantityVoting

        const responseUpdateRealState = await updateDocument("apartaments", id, {
            ratingTotal,
            quantityVoting,
            rating: ratingResult
        })
        

        setLoading(false)

        if (!responseUpdateRealState.statusResponse) {
            toastRef.current.show("Error al actualizar el anuncio, por favor intenta más tarde.", 3000)
            return
        }

        navigation.goBack()

    }

    const validForm = () => {

        setErrorReview(null)

        let isValid = true 

        if(!rating){
            toastRef.current.show("Debes darle una puntuacion al anuncio", 2000)
            isValid = false
        }
        if(isEmpty(review)){
            setErrorReview("Debes ingresar un comentario")
            isValid = false
        }    

        return isValid

    }

    return (
        <KeyboardAwareScrollView style={styles.vieBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={[ "Malo", "Regular", "Normal", "Muy Bueno", "Excelente" ]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Comentario..."
                    containerStyle={styles.input}
                    style={styles.textArea}
                    multiline
                    onChange={(e) => setReview(e.nativeEvent.text)}
                    errorMessage={errorReview}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Enviando comentario..."/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    vieBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    formReview: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    textArea: {
        height: 110,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#9b3a24"
    }
})
