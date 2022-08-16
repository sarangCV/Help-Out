import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        // justifyContent: 'center',
    },
    topContCenter:{
        paddingVertical: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },
    formContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#d5d5df',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10,
        fontFamily: 'NanumGothic-Bold',
        fontSize: 16
    },
    titleBold: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 20,
        color: '#343434',
        paddingTop: 10,
    },
    errLabel: {
        color: '#ff0d0d',
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'NanumGothic-Regular',
    },
    navBtn: {
        width: '45%',
        height: 55,
        flexDirection: 'row',
        // paddingHorizontal: 15,
        // paddingVertical: 10,
        backgroundColor: '#3b52d4',
        borderRadius: 4,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#fff',
        marginRight: 5,
    },
    passBtn: {
        position: 'absolute',
        right: 20,
        top: 0,
        padding: 10,
        zIndex: 100,
        // backgroundColor: '#000'
    },
    txtLeft: {
        marginRight: 5,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
    },
    btnLinkTxt: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#5380ce'
    },
    txtRow: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
    }
})

export default styles;
