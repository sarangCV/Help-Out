'use strict';
import {StyleSheet} from 'react-native';
import {Header} from 'react-navigation-stack';

const styles = StyleSheet.create({
    inline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight:90,
        // minHeight: Header.HEIGHT + 35,
        // maxHeight: Header.HEIGHT + 40,
        // paddingTop: Header.HEIGHT - 25,
        paddingTop: 40,
        // paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 99,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    back_button: {
        width: '15%',
        height: 40,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    page_title: {
        width: '65%',
        height: 40,
        justifyContent: 'center',
    },
    title_style: {
        color: '#333',
        fontSize: 18,
        fontWeight: '400',
        marginLeft: '3%',
        fontFamily: "NanumGothic-Regular",
    },
    headerRight: {
        width: '20%',
        height: 40,
        // paddingTop: 8,
    },
    btnHead: {
        // backgroundColor: '#ddd',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    btnHeadTxt: {
        fontFamily: "NanumGothic-Regular",
        color: '#514fe1',
        fontSize: 16,
    }
});

export default styles;
