import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const StartupScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../components/imgs/crane.gif')} style={styles.logo} />
      <Text style={styles.title}>BUILDER</Text>
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#999',
  },
});

export default StartupScreen;
