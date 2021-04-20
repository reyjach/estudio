import React,{ useState, useCallback }  from 'react'
import { StyleSheet} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import UserLogged from './UserLogged'
import { getCurrentUser } from '../../utils/action'
import UserGuest from './UserGuest'

export default function Account() {

    const [userLogged, setUserLogged] = useState(false)

    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setUserLogged(true) : setUserLogged(false)
        }, [])
    )

    return userLogged ? <UserLogged></UserLogged> : <UserGuest></UserGuest>
}

const styles = StyleSheet.create({})
