import React from "react";
import {Animated, Easing, StyleSheet, Text, StatusBar} from "react-native";

export default Notifications = ({toggle, type, hideNotify, title}) => {

    const notification = React.useRef(new Animated.Value(-80)).current
    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        console.log(toggle)
        _showNotification(toggle)
        setActive(toggle)
        if (toggle) {
            setTimeout(() => {
                _showNotification(false)
                hideNotify(false)
            }, 5000)
        }
    }, [toggle])

    const _showNotification = (active) => {
        Animated.timing(notification, {
            duration: 300,
            toValue: active ? 0 : -80,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    const _colors = type => {
        switch (type) {
            case 'error':
                return "#dc004e"
            case 'success':
                return "#1976d2"
            default:
                return "#ffffff"
        }
    }

    return (
        <React.Fragment>

            {active ?
                <StatusBar
                    animated={true}
                barStyle='light-content'
                backgroundColor={_colors(type)}
                translucent={true}/>
                :
                <StatusBar
                    animated={true}
                barStyle='dark-content'
                backgroundColor="rgb(255,255,255,0)"
                translucent={true}/> }

            <Animated.View
                style={[styles.notification, {transform: [{translateY: notification}]},
                    type === 'error' ? {backgroundColor: "#dc004e"} : {backgroundColor: "#1976d2"}]}
                onStartShouldSetResponder={() => hideNotify(false)}>
                <Text style={styles.notifyText}>{title}</Text>
            </Animated.View>

        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    notification: {
        width: '100%',
        zIndex: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        height: 80,
        backgroundColor: "#1976d2",
    },
    notifyText: {
        color: '#fff',
        fontFamily: 'NanumGothic-Bold',
        fontSize: 16,
        marginTop: 50,
        marginLeft: 15,
    }
})