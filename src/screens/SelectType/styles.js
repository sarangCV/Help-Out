import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        // justifyContent: 'center',
    },
    widthFull: {
        width: '100%',
    },
    topContCenter:{
        paddingVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        paddingTop: 100,
        // height: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#d5d5df',
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 4,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16,
        marginTop: 10,
    },
    titleBold: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 20,
        color: '#343434',
        paddingTop: 10,
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
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#fff',
        marginRight: 5,
    },
    btnBorderV: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#165ab7',
        borderRadius: 32,
        marginTop: 20,
    },
    btnBorder: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 32,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    btnSelected: {
        backgroundColor: '#165ab7'
    },
    btnBorderTxt: {
        marginLeft: 5,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#165ab7'
    },
    white: {
        color: '#fff'
    },
    label: {
        textAlign: 'left'
    },
    txtView: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    labelCats: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16,
        color: '#5f6368',
        marginBottom: 15,
        marginTop: 15,
    },
    catRow: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btnCats: {
        //    padding: 5,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#5f6368',
        borderRadius: 16,
        marginRight: 15,
        marginBottom: 10,
    },
    btnCatTxt: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#5f6368',
    },
    imageRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderColor: '#d6d6de',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    addBtn: {
        borderColor: '#5f6368',
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 15,
        padding: 5,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBtnTxt: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#5f6368',
    },
    textArea: {
        width: '100%',
        height: 70,
        textAlignVertical: 'top',
        borderBottomColor: '#d5d5df',
        borderBottomWidth: 2,
        fontFamily: 'NanumGothic-Bold',
        fontSize: 16
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 80,
    },
    confirmLocation:{
        bottom: '40%',
        left: '45%',
        height: '10%',
        width: '10%',
        alignItems: 'center',
        paddingTop: '1%'
    },
    posBtmBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    modalOverlay:{
        flex: 1,
        zIndex: 1100,
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor:'#00000040',
    },
    modal:{
        zIndex: 1400,
        width: '90%',
        backgroundColor: '#fff',
    },
    btnDefault:{
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor:'#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
    },
    btnDefaultText:{
        fontFamily: 'NanumGothic-Regular',
        color: '#333',
        fontSize: 16,
        marginRight: 5,
    },
    noBorder:{
        borderBottomColor: '#ffffff00',
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orgLogo: {
        width: '100%',
        height: '100%',
    },
    passWrap: {
        width: '100%',
        position: 'relative',
    },
    passStrng: {
        width: '100%',
        marginTop: 10,
        // marginBottom: 70,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    passStrngTxt: {
        fontWeight: '900',
        fontSize: 12,
        fontFamily: 'NanumGothic-Regular',
    },
    flexSm: {
       width: '40%',
        marginTop: 7,
    },
    flexMm: {
        width: '20%',
        marginTop: 7,
    },
    progressBar: {
        width: '40%',
        marginTop: 7,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
    },
    passBtn: {
        position: 'absolute',
        right: 0,
        top: 10,
        padding: 10,
        zIndex: 10,
    },
    errLabel: {
        color: '#ff0d0d',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'left',
        fontFamily: 'NanumGothic-Regular',
    },
    spacing: {
        width: '100%',
        marginBottom: 70,
    },
    selectedColor: {
        color: '#fff',
    },
    contLeft: {
        width: '100%',
        justifyContent: 'flex-start',
        padding: 15,
        // alignItems: 'center',
    },
    picker: {
        width: '100%',
        height: 50,
        backgroundColor: '#f8f8f8',
        fontFamily: 'NanumGothic-Bold',
        fontSize: 16,
        // borderBottomColor: '#d5d5df',
        // borderBottomWidth: 2,
        // marginTop: 10,
    },
    btmBtns:{
        position: 'absolute',
        bottom: 0,
        right:0,
        left:0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff'
    },
    btnOutLine: {
        flex: 0.49,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3b52d4',
        borderRadius:4,
        height: 50,
    },
    outTxt: {
        color: '#3b52d4',
        fontSize: 16,
        fontFamily: 'NanumGothic-Regular',
    },
    btnFill: {
        flex: 0.49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b52d4',
        borderRadius:4,
        height: 50,
    },
    fillTxt: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'NanumGothic-Regular',
    },
    stickyCont: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:100,
    },
    stickyTxt:{
        width: '70%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius:4,
        textAlign: 'center',
        fontFamily: 'NanumGothic-Regular'
    },
    logoTxt: {
        textAlign: 'center',
        fontFamily: 'NanumGothic-Bold',
        fontSize: 26,
        color: '#9d9d9d',
    },
    logoContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
    },
    thumbView: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 50,
        borderColor: '#ccc'
    },
    iconFt: {
        position: 'absolute',
        right: -6,
        bottom:-12,
        zIndex:100,
        backgroundColor: '#fff',
        borderRadius:50,
    },
    checkBox:{
        width: 25,
        height: 25,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    link:{
        marginTop:5,
        // marginRight: 5,
    },
    txtSm: {
        fontFamily: 'NanumGothic-Regular',
        color: '#333',
        lineHeight: 24,
        // paddingTop: 5,
        paddingHorizontal: 5,
    },
    linkTxt: {
        color: '#3b52d4',
        fontFamily: 'NanumGothic-Regular',
    },
    contRight: {
        flex:0.9,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    flexLeft: {
        flex:0.1
    }
})

export default styles;
