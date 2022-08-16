import React from "react";
import {Animated, Dimensions, Easing, StyleSheet, Text, View} from "react-native";

const height = Dimensions.get('window').height;

export default Modal = ({toggle, children, hideModal, header}) => {

    const modal = React.useRef(new Animated.Value(height + 50)).current

    React.useEffect(() => {
        _showModal(toggle)
    }, [toggle]);

    const _showModal = (active) => {
        Animated.timing(modal, {
            duration: 300,
            toValue: active ? 0 : height +50,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    return (
        <Animated.View style={[styles.modalOverlay, {transform: [{translateY: modal}]}]}
                       onStartShouldSetResponder={() => hideModal(false)}>

            <Animated.View style={[styles.modal, {transform: [{translateY: modal}]}]}>

                {header && <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>Report Organisation</Text>
                </View>}

                <View style={styles.body}>
                    {children}
                </View>

            </Animated.View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    modalOverlay:{
        flex: 1,
        zIndex: 1000,
        // justifyContent: 'center',
        // alignItems:'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor:'#00000040',
    },
    modal:{
        zIndex: 1400,
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: "#000",
        position: 'absolute',
        bottom: 0,
        padding: 0,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    body: {
        padding: 10,
    },
    modalHeader: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalHeaderText: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#a4a4a4',
    }
})
