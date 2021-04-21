import React, {useState,useRef,useEffect} from 'react'
import { Button, Icon } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import {useNavigation} from '@react-navigation/native'

import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from '../../components/Account/AccountOption'
import { closeSession,getCurrentUser } from '../../utils/action'
import Loading from '../../components/Loading'

export default function UserLogged() {

    const navigation = useNavigation()
    const toastRef = useRef()

    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View>
            {
              user &&  (
                  <View>
                      <InfoUser 
                        user={user} 
                        setLoading={setLoading} 
                        setLoadingText={setLoadingText}
                       />
                      <AccountOptions
                        user={user}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                      />
                  </View>
              )
            }
            <Button
                title="Cerrar Sesion"
                titleStyle={styles.btnTitle}
                containerStyle={styles.btnContainer}
                type="clear"
                icon={
                    <Icon
                        type="material-community"
                        name={"exit-to-app"}
                        style={styles.icon}
                    >
                    </Icon>
                }
                iconRight
                iconContainerStyle={styles.iconStyle}
                onPress={() =>{
                    closeSession()
                    navigation.navigate("home")
                }}

            />
        <Toast ref={toastRef} position="center" opacity={0.9} />
        <Loading isVisible={loading} text={loadingText}/>
        </View>
    )
}

const styles = StyleSheet.create({

    btnContainer:{
        marginTop: 50,
        marginRight: 200
    },
    btnTitle: {
        color: "black",
        marginLeft: 0
    },
    iconStyle:{
        marginLeft: 0,
        marginRight: 200,
        fontSize: 40
    },
    icon: {
        fontSize: 30
    }

})
