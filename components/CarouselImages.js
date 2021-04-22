import { size } from 'lodash'
import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'

export default function CarouselImages({ images, height, width, activeSlide, setActiveSlide }) {

    const renderItem = ({ item }) => {
        return (
            <Image
                style={{ width, height }}
                PlaceholderContent={<ActivityIndicator color="#fff"></ActivityIndicator>}
                source={{ uri: item }}
            >
            </Image>
        )
    }
    return (
        <View>
            <Carousel
                layout={"default"}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
            >
            </Carousel>
            <MyPgination data={images} activeSlide={activeSlide}></MyPgination>
        </View>
    )
}

function MyPgination ({ data, activeSlide }) {
    return (
        <Pagination
            dotsLength={size(data)}
            activeDotIndex={activeSlide}
            containerStyle={styles.containerPagination}
            dotStyle={styles.dotActive}
            inactiveDotStyle={styles.doInactive}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
        >
        </Pagination>
    )
}

const styles = StyleSheet.create({
    containerPagination: {
        backgroundColor: "transparent",
        zIndex: 1,
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    dotActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: "#e21e16"
    },
    doInactive: {
        width: 14,
        height: 10,
        borderRadius: 7,
        marginHorizontal: 2,
        backgroundColor: "#fff"
    }
})
