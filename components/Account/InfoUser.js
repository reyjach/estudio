import React, {useState} from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { updateProfile, uploadImage } from '../../utils/action'
import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({user, setLoading, setLoadingText}) {

    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto= async()=>{
        const result = await loadImageFromGallery([1,1])
        if(!result.status){
            return
        }
        setLoadingText("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image,"avatar", user.uid)
        if(!resultUploadImage.statusResponse){
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        }

        const resultUpdateProfile = await updateProfile({ photoURL: resultUploadImage.url })
        setLoading(false)
        if(resultUpdateProfile.statusResponse){
            setPhotoUrl(resultUploadImage.url)
        }else{
            Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.")
        }
        
    }
    return (
        <View style={styles.container}>
           <Avatar
            rounded
            onPress={changePhoto}
            size="large"
            source={
                photoUrl
                ? {uri: photoUrl}
                : require('../../assets/avatar-default.jpg')
            }
           />
           <View  style={styles.infoUser}>
               <Text  style={styles.displayName}>
                   {
                   user.displayName
                   ? user.displayName
                   : "Anónimo"
                }
               </Text>
               <Text>{user.email}</Text>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection:"row",
        backgroundColor:"#f9f9f9",
        paddingVertical:30,
        paddingLeft:15

    },
    infoUser:{
        marginLeft:20
    },
    displayName:{
        fontWeight:"bold",
        fontSize:19,
        paddingBottom:5
    }
})
