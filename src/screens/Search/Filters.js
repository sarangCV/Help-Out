/*---------------------------------------------------------------*
 *   @author: Harish Kumar                                       *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const Filters = ({selectedId, categories, filterCategory, select}) => {
    return (
        <View style={styles.topFilters}>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                {/* <View style={styles.catRow}> */}
                    <TouchableOpacity style={[styles.catTag, !selectedId && {backgroundColor: '#514fe1', borderColor: '#514fe1'}]}  onPress={() => select(null)}>
                        <Text style={[styles.catTagTxt, !selectedId && {color: '#fff'}]}>Show All</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.catTag, selectedId === 100 && {backgroundColor: '#514fe1', borderColor: '#514fe1'}]}  onPress={() => select(100)}>
                        <Text style={[styles.catTagTxt, selectedId === 100 && {color: '#fff'}]}>Empty Category</Text>
                    </TouchableOpacity> */}
                    {categories && categories.map((item, i) => (
                        <TouchableOpacity key={item.interestId} style={[styles.catTag, item.interestId === selectedId && {backgroundColor: '#514fe1', borderColor: '#514fe1'}]} onPress={() => select(item.interestId)}>
                            <Text style={[styles.catTagTxt, item.interestId === selectedId && styles.selectedColor]}>{item.interestTitle}</Text>
                        </TouchableOpacity>
                    ))}
                {/* </View> */}
            {/* </ScrollView> */}
        </View>
    );
}

export default Filters

const styles = StyleSheet.create({
    topFilters: {
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row',
    },
    catRow: {
        width: '100%',
        height: 400,
        flexDirection: 'row',
        backgroundColor: 'lightgray'
    },
    catTag: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderWidth: .4,
        borderColor: '#5f6368',
        borderRadius: 5,
        margin: 5
    },
    catTagTxt: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 12,
        color: '#5f6368',
    },
    selectedColor: {
        color: '#fff',
    }
})



