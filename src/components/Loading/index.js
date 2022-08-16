import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {CircleFade} from "react-native-animated-spinkit";

const Loading = props => {
  if (props.loading) {
    return (
      <View style={styles.overlay}>
        <View style={styles.loadingBody}>
          <View style={styles.indicator}>
          <CircleFade size={48} color="#fff"/>
          </View>
          <Text style={styles.loadingText}>Please Wait...</Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFill,
    backgroundColor: '#20232a6e',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingBody: {
    width: '50%',
    paddingVertical: 20,
    // paddingHorizontal: 30,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});
