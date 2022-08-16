import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    body: {
        flex: 1,
        borderRadius: 4,
        flexDirection:'row',
        marginHorizontal: 10,
        marginVertical: 10,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    contView: {
        // marginTop: 20,
        flex: 1,
    },
    filterOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    filterOverlayContent: {
        backgroundColor: '#fff',
        elevation: 5
    },
    filterContentInner: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: '#5f6368',
        marginHorizontal: 15,
        marginBottom: 10
    },
    selectCategoryText: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingBottom: 10,
        color: '#5f6368'
    },
    filterHeader: {
        flexDirection: 'row',
        // height: '7%',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderWidth: 2,
        // paddingTop: 20,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    filterText: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#505050'
    },
    filterContent: {
        backgroundColor: '#f4f4f4',
        // elevation: 5,
        // paddingBottom: 20,
        // paddingTop: 10,
        width: '100%',
        // height: '80%',
        // borderRadius: 5,
        // alignItems: 'flex-start'
    },
    
    filterFooter: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        alignItems: 'flex-end',
        backgroundColor: '#f4f4f4',
        // justifyContent: 'center',
        // height: '13%',
        // backgroundColor: 'green',

    },
    filterButtonView: {
        flexDirection: 'row',
        // marginTop: 20,
        width: '100%',
        // paddingVertical: 5,
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    filterOverlayButton: {
        backgroundColor: "#514fe1",
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 80,
        // borderRadius: 5,
        // paddingVertical: 10,
        padding: 10,
        // margin: 10,
        // marginRight: 5,
        alignItems: 'center'
    },
    filterButtonText: {
        // color: '#fff',
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14
    },
    filterPickerView: {
        position: 'absolute',
        top: '46%',
        width: '85%',
        height: 300,
        paddingHorizontal: 10
    },
    modalOverlay:{
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor:'#00000070',
        zIndex: 1100,
    },
    modal:{
        position: 'absolute',
        // zIndex: 100,
        bottom: 0,
        flex: 1,
        width: '100%',
        height: 150,
        paddingHorizontal: 20,
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
        backgroundColor: '#ffff',
        zIndex: 1200,
    },
    btnDefault:{
        width: '100%',
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    btnDefaultText:{
        fontSize: 16,
        color: '#333',
        fontFamily: 'Montserrat-Regular',
    },
    buttonCenter: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    defCenter: {
        backgroundColor: '#3b52d4',
        // padding: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 4,
    },
    defCenterTxt: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#fff'
    }
});

export default styles;
