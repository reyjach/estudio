import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { Icon, ListItem } from 'react-native-elements'

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

export default function AccountOption({ user, toastRef, setReloadUser }) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)



    const generateOption = () => {
        return [
            {
                title: "Cambiar Nombres y Apellidos",
                iconNameRight: "account-circle",
                iconColorRight: "#fff",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Email",
                iconNameRight: "at",
                iconColorRight: "#fff",
                onPress: () => selectedComponent("displayEmail")
            },
            {
                title: "Cambiar Contraseña",
                iconNameRight: "lock-reset",
                iconColorRight: "#fff",
                onPress: () => selectedComponent("password")
            }
        ]
        
    }


    const menuOption = generateOption()

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                    setRenderComponent(
                        <ChangeDisplayNameForm
                            displayName = {user.displayName}
                            setShowModal = {setShowModal}
                            toastRef = {toastRef}
                            setReloadUser = {setReloadUser}
                        >
                        </ChangeDisplayNameForm>
                    )
                break;
            case "displayEmail":
                    setRenderComponent(
                        <ChangeEmailForm
                            email = {user.email}
                            setShowModal = {setShowModal}
                            toastRef = {toastRef}
                            setReloadUser = {setReloadUser}
                        >
                        </ChangeEmailForm>
                    )
                break; 
            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal = {setShowModal}
                        toastRef = {toastRef}
                    >
                    </ChangePasswordForm>
                )
            break;
            default:
                break;
        }
        setShowModal(true)
    }

    return (
        <View>
            {
                map(menuOption, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            
                        >
                        </Icon>
                    </ListItem>
                ))
            }
            <Modal
                isVisible={showModal}
                setVisible={setShowModal}
            >
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        marginHorizontal: 2
    }
})
