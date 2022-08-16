import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        // justifyContent: 'center',
    },
    topContCenter:{
        width: '100%',
        // paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    input: {
        width: '100%',
        height: 50,
        borderBottomColor: '#d5d5df',
        borderBottomWidth: 2,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16,
    },
    titleBold: {
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
        color: '#343434',
        paddingTop: 10,
    },
    titleGreyBold: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 13,
        color: '#9aa1b3',
        paddingTop: 15,
        textAlign: 'center',
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
    inputWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'

    },
    inputs: {
        // ...fontStyle,
        width: '50%',
        maxHeight: 60,
        color: '#000',
        fontSize: 30,
        letterSpacing: 10,
        textAlign: 'center'
        // fontFamily: 'ZipFonts',
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
    },
    errLabel: {
        color: '#ff0d0d',
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'NanumGothic-Regular',
    },
    bold: {
        fontFamily: 'NanumGothic-Bold',
        color: '#949494'
    }
})

export default styles;
