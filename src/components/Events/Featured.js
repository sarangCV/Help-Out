import React from 'react';
import moment from 'moment';
import {ImageBackground, StyleSheet, useWindowDimensions, View, Text} from 'react-native'
import Carousel from '../../components/Carousel';

moment.locale('en-IN');

const Featured = (props) => {
    const [width, setWidth] = React.useState(0);
    const {width: windowWidth} = useWindowDimensions();
    const [size, setSize] = React.useState({size: {width: windowWidth, height: 500}})
    const {imageUrl, title, image} = props
    const _measureView = e => {
        const {width, height} = e.nativeEvent.layout;
        setWidth(width)
        setSize({size: {width: width, height: height}})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headTitle}>Featured</Text>
            </View>
            <View style={styles.carousel}>
                <View style={styles.itemBottom} onPress={props.navigation}>
                    <View style={styles.bottomItemTop} onLayout={(event) => _measureView(event)}>
                        <Carousel delay={3000} style={{flex: 1, width: '100%', height: '100%'}} autoplay bullets={true} currentPage={1} onAnimateNextPage={(p) => console.log(p)}>
                            {image && image.map((image, imageIndex) => {
                                return (
                                    <View style={{width: width, height: '100%', padding: 10}} key={imageIndex}>
                                        <ImageBackground resizeMode='cover' imageStyle={{borderRadius: 10}} source={{uri: imageUrl + image, method: 'get', headers: {Pragma: 'no-cache',}, body: title}} style={{width: '100%', height: '100%'}}/>
                                    </View>
                                );
                            })}
                        </Carousel>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-end'
    },
    carousel: {
        flex: 1,
        zIndex: 100,
        height: 230,
        // backgroundColor: 'orange'
    },
    header: {
        width: '100%',
        height: 50,
        paddingHorizontal: 15,
        paddingTop: 20,
        marginBottom: 10,
        // backgroundColor: 'yellow'
    },
    headTitle: {
        color: '#505050',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 5,
    },
    itemTop: {
        flex: 1,
    },
    itemBottom: {
        flex: 7,
        minWidth: '100%',
        // backgroundColor: 'blue'
    },
    bottomItemTop: {
        flex: 2,
        flexDirection: 'row',
    },
    bottomItemBottom: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 5
    },
    images: {
        width: '100%',
        height: '100%',
        // backgroundColor:'pink'
    },
    dateContainer: {
        position: 'absolute',
        left: 15,
        bottom: 15,
        backgroundColor: '#fff',
        height: 60,
        width: 55,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        color: '#4a4a4a',
        fontSize: 14,
        fontFamily: 'NanumGothic-Regular'
    },
    address: {
        paddingTop: 5,
        color: '#4a4a4a',
        fontSize: 14,
        fontFamily: 'NanumGothic-Bold'
    },
    category: {
        color: '#a8a8a8',
        fontSize: 11,
        paddingTop: 8,
        fontFamily: 'NanumGothic-Regular'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 50,
        width: 100,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: '#514fe1',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Featured
