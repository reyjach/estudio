import React, { useState, useCallback, useRef, useEffect } from 'react'
import { map } from 'lodash'
import { Alert, Dimensions ,StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'
import { useFocusEffect } from '@react-navigation/native'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/RealState/MapRestaurant'
import { addDocumentWithoutId, getCurrentUser, getDocumentById} from '../../utils/action'
import { formatPhone } from '../../utils/helpers'

const withScreen = Dimensions.get("window").width

export default function RealSta({ navigation, route }) {

    const { id, name } = route.params

    const toastRef = useRef()
    
    return (
        <View>
            <Text>RealSta...</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
