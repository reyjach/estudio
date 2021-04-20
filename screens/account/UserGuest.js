import React from "react";
import { ScrollView, StyleSheet, Text, View,Image } from "react-native";
import { Divider } from "react-native-elements";
import {useNavigation } from "@react-navigation/native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import LoginForm from "../../components/Account/LoginForm";

export default function UserGuest() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/icon.png")}
                resizeMode="contain"
                style={styles.image}     
            />
            <View style={styles.container}>
                <LoginForm></LoginForm>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(props){
    const navigation= useNavigation()
  
      return(
          <Text
          style={styles.register}
          onPress={()=> navigation.navigate("register")}
  
          >
              ¿Aun no tienes una Cuenta?{" "}
              <Text style={styles.btnRegister}>
                   Registrate</Text>
          </Text>
      )
  }

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20,
      },
      container:{
        marginHorizontal:40,
    },
    divider:{
        backgroundColor:"#442484",
        margin:40
    },
    register:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf: "center"
    },
    btnRegister:{
        color:"#1a9dfb",
        fontWeight:"bold"
    }
})
