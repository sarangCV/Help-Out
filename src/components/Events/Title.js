/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const Title = (props) => {
    const {title} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
        color: '#4a4a4a',
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'NanumGothic-Bold'
    }
})
export default Title
