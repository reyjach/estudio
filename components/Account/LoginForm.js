import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";

import { LoginWithEmailAndPassword } from "../../utils/action";
import { validateEmail } from "../../utils/helpers";
import Loading from "../Loading"

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
      }

    const doLogin = async () => {
        if (!validateData()) {
          return;
        }
  
        setLoading(true);
        const result = await LoginWithEmailAndPassword(
          formData.email,
          formData.password
        );
        
        setLoading(false);
        if (!result.statusResponse) {
          setErrorEmail(result.error);
          setErrorPassword(result.error);
          return;
        }
    
        navigation.navigate("home");
    }

    const validateData = () => {
        setErrorEmail("");
        setErrorPassword("");
        let isvalid = true;
    
        if (!validateEmail(formData.email)) {
          setErrorEmail("Debes de ingresar un email valido.");
          isvalid = false;
        }
    
        if (isEmpty(formData.password)){
            setErrorPassword("debes de ingresar tu contraseña.")
            isvalid=false
        }
    
    
        return isvalid;
    }

    return (
        <View ytle={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                />
                }
            />
            <Button
                title="Iniciar Sesion"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text={"Iniciando Sesion..."} />
        </View>
    )
}

const defaultFormValues = () => {
    return { email: "", password: "" };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
      },
      input: {
        width: "100%",
      },
      btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center",
      },
      btn: {
        backgroundColor: "#d23246",
      },
      icon: {
        color: "#c1c1c1",
      }
})
