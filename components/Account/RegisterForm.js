import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { validateEmail } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";

import { registerUser } from "../../utils/action";
import Loading from "../Loading"

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

      const doRegisterUser = async () => {
        if (!validateData()) {
          return;
        }
            setLoading(true)
            const result = await registerUser(formData.email,formData.password)
            setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            return
        }
    
        navigation.navigate("home")
    }

    const validateData = () => {
        setErrorConfirm("");
        setErrorEmail("");
        setErrorPassword("");
        let isvalid = true;
    
        if (!validateEmail(formData.email)) {
          setErrorEmail("Debes de ingresar un email valido.");
          isvalid = false;
        }
    
        if (size(formData.password) < 6) {
          setErrorPassword(
            "Debes ingresar una contraseña de almenos seis caracteres."
          );
          isvalid = false;
        }
    
        if (size(formData.confirm) < 6) {
          setErrorConfirm(
            "Debes ingresar una Confirmacion de  contraseña de almenos seis caracteres."
          );
          isvalid = false;
        }
    
        if (formData.password !== formData.confirm) {
          setErrorPassword("La Contraseña y la Confirmacion NO son iguales ");
          setErrorConfirm("La Contraseña y la Confirmacion NO son iguales ");
          isvalid = false;
        }
    
        return isvalid;
    }

    return (
        <View style={styles.form}>
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

            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu Contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
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
                title="Registrar Usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />
      
      <Loading isVisible={loading} text={"Creando cuenta..."} />
    </View>
    )
}

const defaultFormValues = () => {
    return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
    form: {
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
