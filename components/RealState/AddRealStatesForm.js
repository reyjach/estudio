import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty} from 'lodash'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'

import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import Modal from '../../components/Modal'
import { addDocumentWithoutId, getCurrentUser, uploadImage } from '../../utils/action'

const withScreen = Dimensions.get("window").width

export default function AddRealStatesForm({toastRef, setLoading, navigation}) {

    const [formData, setFormData] = useState(defaulFormValue())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPrice, setErrorPrice] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorNeighborhood, setErrorNeighborhood] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRealState, setLocationRealState] = useState(null)

    const addRealState = async() => {

        if(!validForm()) {
            return 
        }

        setLoading(true)
        
        const responseUploadImages = await uploadImages()

        const apartament = {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            description: formData.description,
            callingCode: formData.callingCode,
            phone: formData.phone,
            price: formData.price,
            neighborhood: formData.neighborhood,
            location: locationRealState,
            images: responseUploadImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: getCurrentUser().uid
        }

        const responseAddDocument = await addDocumentWithoutId("apartaments", apartament)

        setLoading(false)

        if (!responseAddDocument.statusResponse){
            toastRef.current.show("Error al grabar el apartamento, por favor intenta mas tarde.", 3000)
            return
        }

        navigation.navigate("home")
        
    }

    const uploadImages = async() => {

        const imagesUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "apartament", uuid())
                if (response.statusResponse) {
                    imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl

    }

    const validForm = () => {
        clearError()

        let isValid = true

        if(isEmpty(formData.name)) {
            setErrorName("Debes ingresar el nombre del anuncio")
            isValid = false 
        }

        if(!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email tu valido")
            isValid = false 
        }

        if(isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la dirrecion del apartamento")
            isValid = false 
        }

        if(isEmpty(formData.neighborhood)) {
            setErrorNeighborhood("Debes ingresar un barrio al apartamento")
            isValid = false 
        }

        if(size(formData.phone) < 10) {
            setErrorPhone("Debes ingresar tu telefono valido")
            isValid = false 
        }

        if(size(formData.price) < 0) {
            setErrorPrice("Debes ingresar un precio al apartamento")
            isValid = false 
        }

        if(isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una descripcion del apartamento")
            isValid = false 
        }

        if(!locationRealState) {
            toastRef.current.show("Debes de localizar el apartamento en el mapa", 3000)
            isValid = false
        } else if(size(imagesSelected) === 0) {
            toastRef.current.show("Debes de agregar al menos 1 imagen al apartamento", 3000)
            isValid = false
        }

        return isValid
    }

    const clearError = () => {

        setErrorAddress(null)
        setErrorDescription(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorPhone(null)
        setErrorPrice(null)
        setErrorNeighborhood
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRealState 
                imageRealState={imagesSelected[0]}
            >
            </ImageRealState>
            <FormApp
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                errorPrice={errorPrice}
                errorNeighborhood={errorNeighborhood}
                setIsVisibleMap={setIsVisibleMap}
                locationRealState={locationRealState}
            >
            </FormApp>
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            >
            </UploadImage>
            <Button
                title="Crear apartamento"
                onPress={addRealState}
                buttonStyle={styles.btnAddRealState}
            >
            </Button>
            <MapRealState
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRealState={setLocationRealState}
                toastRef={toastRef}
            >
            </MapRealState>
        </ScrollView>
    )
}

function MapRealState ({ isVisibleMap, setIsVisibleMap ,setLocationRealState, toastRef }) {

    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        (async()=>{
            const response = await getCurrentLocation()
            if (response.status){
                setNewRegion(response.location)
            }
        })()
    }, [])

    const confirmLocation = () => {
        setLocationRealState(newRegion)
        toastRef.current.show("Localizacion guardada correctamente", 2000)
        setIsVisibleMap(false)
    }

    return (
        <Modal
            isVisible={isVisibleMap}
            setVisible={setIsVisibleMap}
        >
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable
                            >
                            </MapView.Marker>
                        </MapView>
                    )
                }
                <View
                    style={styles.viewMapBtn}
                >
                    <Button
                        title="Guardar ubicacion"
                        containerStyle={styles.viewMapContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={ confirmLocation }
                    >
                    </Button>
                    <Button
                        title="Cancelar ubicacion"
                        containerStyle={styles.viewMapContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    >
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

function ImageRealState ({ imageRealState }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: withScreen, height: 200 }}
                source={
                    imageRealState 
                        ? { uri : imageRealState}
                        : require("../../assets/no-image.png")
                }
            >
            </Image>
        </View>
    )
}

function UploadImage ({ toastRef, imagesSelected, setImagesSelected}) {

    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])

        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 2000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#a7a7a7a7"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    >
                    </Icon>
                )
               
            }
            {
                map(imagesSelected, (imageRealState, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRealState}}
                        onPress={() => removeImage(imageRealState)}
                    >
                    </Avatar>
                ))
            }
           
        </ScrollView>
    )
}

function FormApp ({ 
    formData, 
    setFormData, 
    errorName, 
    errorDescription, 
    errorEmail, 
    errorAddress,
    errorNeighborhood, 
    errorPhone, 
    errorPrice,
    setIsVisibleMap, 
    locationRealState}) {
    const [country, setCountry] = useState("CO")
    const [callingCodo, setCallingCodo] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Anuncio"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
            >
            </Input>
            <Input
                placeholder="Direccion del apartamento"
                defaultValue={formData.address}
                onChange={(e)=> onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRealState ? "#9b3a24" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            >
            </Input>
            <Input
                keyboardType="email-address"
                placeholder="Email"
                defaultValue={formData.email}
                onChange={(e)=> onChange(e, "email")}
                errorMessage={errorEmail}
            >
            </Input>
            <Input
                placeholder="Barrio"
                defaultValue={formData.neighborhood}
                onChange={(e)=> onChange(e, "neighborhood")}
                errorMessage={errorNeighborhood}
            >
            </Input>
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({...formData, country: country.cca2, callingCode: country.callingCode[0]})
                    }}
                >
                </CountryPicker>
                <Input
                    placeholder="WhatsApp"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e)=> onChange(e, "phone")}
                    errorMessage={errorPhone}
                >
                </Input>
            </View>
            <Input
                placeholder="Costo del apartamento"
                keyboardType="number-pad"
                defaultValue={formData.price}
                onChange={(e)=> onChange(e, "price")}
                errorMessage={errorPrice}
                >
                </Input>
            <Input
                placeholder="Descripcion del apartemento"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e)=> onChange(e, "description")}
                errorMessage={errorDescription}
            >
            </Input>
        </View>
    )
}

const defaulFormValue = () => {
    return {
        name: "",
        description: "",
        email: "",
        phone: "",
        price: "",
        address: "",
        neighborhood: "",
        country: "",
        callingCode: "57"
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddRealState: {
        margin: 20,
        backgroundColor: "#e21e16"
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3e3"
    },
    miniatureStyle: {
        height: 70,
        width: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapContainerCancel: {
        paddingLeft: 5
    },
    viewMapContainerSave: {
        paddingRight: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#e21e16"
    },
    viewMapBtnSave: {
        backgroundColor: "#9b3a24"
    }
})
