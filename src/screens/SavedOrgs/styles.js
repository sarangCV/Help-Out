import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        // paddingBottom: 10,
    },
    flatList:{
      flex: 1,
      // paddingTop: 10,
        paddingVertical: 10,
    },
    center: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    centerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: '#1c1c1c',
    }
});

export default styles
