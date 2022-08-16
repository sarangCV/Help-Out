import React, { useRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    StatusBar,
    Image,
    Animated,
    TouchableOpacity,
    useWindowDimensions
} from "react-native";
import {saveToken} from "../../asy-store";
import InternetConnection from "../../components/Info/InternetConnection";


const img = [
    require('../../assets/images/onboard3.png'),
    require('../../assets/images/onboard2.png'),
    require('../../assets/images/onboard1.png'),
]

const content = [
    { title: 'Find NGOs near you', desc: 'Find certified NGOs near you  that believe in your cause & make this planet a better place than it was yesterday' },
    { title: 'Host or contribute to fundraisers', desc: 'Fundraisers are extremely helpful in raising funds for a cause or an emergency in a quick span of time' },
    { title: 'Be a Volunteer', desc: 'Find Events and volunteering opportunities close to you with a few clicks & make a difference' }
]


const Onboarding = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    // console.log(scrollX)

    const _saveDevice = () => {
        // console.log('hitted')
        saveToken('savedDevice', {stored:true})
            .then(() =>  navigation.navigate('SignUp'))
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#F3F3F3" />

            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}
                    style={styles.scrollViewStyle}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        // null,
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ])}
                    scrollEventThrottle={1}
                >

                    {img.map((image, imageIndex) => {
                        return (
                            <View
                                style={{ width: windowWidth, alignItems: 'center', marginTop: '7%' }}
                                key={imageIndex}
                            >
                                <Image source={image} style={{height: 300, width: 300}} />


                                <View style={styles.content}>
                                    <Text style={styles.title}>{content[imageIndex].title}</Text>
                                    <Text style={styles.desc}>{content[imageIndex].desc}</Text>

                                    {imageIndex === 2 && <TouchableOpacity style={styles.btn} onPress={_saveDevice}>
                                        <Text style={styles.btnTxt}>Get Started</Text>
                                    </TouchableOpacity>}

                                </View>

                            </View>
                        );
                    })}


                </ScrollView>

                <View style={styles.indicatorContainer}>
                    {img.map((image, imageIndex) => {
                        console.log(imageIndex)
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1)
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: "clamp"
                        });
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, { width }]}
                            />
                        );
                    })}
                </View>

            </View>
            <InternetConnection />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f3f3"
    },
    scrollContainer: {
        flex: 1,
    },
    content: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 20,
        color: '#323232',
        marginBottom: 10,
    },
    desc: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#868686',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 20,
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#3b52d4',
        marginHorizontal: 4
    },
    indicatorContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        backgroundColor: '#3b52d4',
    },
    btnTxt: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#ffffff',
    }
});

export default Onboarding;
