import { size } from 'lodash'
import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image, Icon } from 'react-native-elements'
import { formatPhone } from '../../utils/helpers'

export default function ListRealState({ realStates, navigation, handleLoadMore }) {
    return (
        <View>
        <FlatList
             data={realStates}
             keyExtractor={(item, index) => index.toString()}
             onEndReachedThreshold={0.5}
             onEndReached={handleLoadMore}
             renderItem={(realState) => (
                 <RealStates realState={realState} navigation={navigation}/>
             )}
        >
        </FlatList>
     </View>
    )
}

function RealStates ( {realState, navigation, handleLoadMore } ) {
    const {id, images, name, address, phone, callingCode, neighborhood, price} = realState.item
    const imageRealState = images[0]

    const goRealState = () => {
        navigation.navigate("real-sta", { id, name })
    }

    return (
        <TouchableOpacity onPress={ goRealState }>
            <View style={styles.viewRealState}>
                    <View style={styles.viewRealStateImage}>
                        <Image
                            resizeMode="cover"
                            PlaceholderContent={<ActivityIndicator color="#fff"></ActivityIndicator>}
                            source={ {uri: imageRealState} }
                            style={styles.imageRealState}
                        >
                        </Image>
                    </View>
                
                <View>
                    <Text style={styles.realStateTitle}>{name}</Text>
                    <Text style={styles.realStateInformation}>{address}</Text>
                    <Text style={styles.realStateInformation}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.realStateInformation}>Barrio:{"  "+neighborhood}</Text>   
                    <Text style={styles.costPrice}>
                        <Icon
                            type="material-community" name="home-city-outline" 
                        > 
                        </Icon>
                        <Text style={styles.cost}>{"  $"+ parseFloat(price)}</Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewRealState: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#fff"
    },
    viewRealStateImage: {
        marginRight: 15
    },
    imageRealState: {
        width: 110,
        height: 110,
        borderRadius: 10
    },
    realStateTitle: {
        fontWeight: "bold"
    },
    realStateInformation: {
        paddingTop: 2,
        color: "black"
    },
    costPrice: {
        paddingTop: 2,
        color: "grey",
        flexDirection: "column"
    },
    cost: {
        marginLeft: 40,
        color: "#d33149"
    }
})
