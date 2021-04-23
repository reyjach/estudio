import React, { useState, useCallback, useRef, useEffect } from 'react'
import { map } from 'lodash'
import { Alert, Dimensions ,StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'
import { useFocusEffect } from '@react-navigation/native'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapRealState from '../../components/RealState/MapRealState'
import { getCurrentUser, getDocumentById } from '../../utils/action'
import { formatPhone } from '../../utils/helpers'
import ListReview from '../../components/RealState/ListReview'

const withScreen = Dimensions.get("window").width

export default function RealSta({ navigation, route }) {

    const { id, name } = route.params
    const toastRef = useRef()

    const [showModal, setShowModal] = useState(false)
    const [realState, setRealState] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        setCurrentUser(getCurrentUser())
    }, [])

    useFocusEffect(
        useCallback(() => {
          (async () => {
            const response = await getDocumentById("apartaments", id);
  
            if (response.statusResponse) {
                setRealState(response.document);
            } else {
                setActiveSlide({});
              Alert.alert(
                "Ocurrió un problema cargando el anuncio del apartamento, intente más tarde."
              );
            }
          })();
        }, [])
      );

      if(!realState) {
        return <Loading isVisible={true} text="cargando..."></Loading>
    }

    navigation.setOptions({ title: name })
    
    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages 
                images={realState.images}
                height={250}
                width={withScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            >
            </CarouselImages>
            <TitleRealState
                name={realState.name}
                description={realState.description}
                rating={realState.rating}
                price={realState.price}
            >
            </TitleRealState>
            
           
            <RealStateInfo
                name={realState.name}
                location={realState.location}
                address={realState.address}
                email={realState.email}
                phone={formatPhone(realState.callingCode, realState.phone)}
                neighborhood={realState.neighborhood}
            >
            </RealStateInfo> 
            <ListReview
                navigation={navigation}
                id={id}
            >    
            </ListReview>
             <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

function TitleRealState ({ name, description, rating, price }) {
    return (
        <View style={styles.viewRealStateTitle}>
            <View style={styles.viewRealStateContainer}>
                <Text style={styles.nameRealState}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                >
                </Rating>
            </View>
            <Text style={styles.costPrice}>
                <Icon
                    type="material-community" name="home-city-outline" 
                > 
                </Icon>
                <Text style={styles.cost}>{"  valor  $"+ parseFloat(price)}</Text>
            </Text>
            <Text style={styles.descriptionRealState}>{description}</Text>
        </View>
    )
}

function RealStateInfo ({ name, location, address, email, phone, neighborhood }) {

    const listInfo =[
        { text: address, iconName: "map-marker"},
        { text: neighborhood, iconName: "home-group"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"},
    ]

 return (
        <View style={styles.viewRealStatetInfo}>
            <Text
                style={styles.realStateInfoTitle}
            >Informacion sbore el apartamento
            </Text>
            <MapRealState
                location={location}
                name={name}
                height={150}
            >
            </MapRealState>
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#e21e16"
                        >
                        </Icon>
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewRealStateTitle: {
        padding: 15
    },
    viewRealStateContainer: {
        flexDirection: "row"
    },
    descriptionRealState: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameRealState:{
        fontWeight: "bold"
    },
    costPrice: {
        paddingTop: 8,
        color: "black",
        flexDirection: "column",
        marginLeft: 110
    },
    viewRealStateInfo: {
        margin: 15,
        marginTop: 25,
    },
    realStateInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#9b3a24",
        borderBottomWidth: 1
    },
    cost: {
        marginBottom: 40
    }
})
