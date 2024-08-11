import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageUpload from './components/ImageUpload';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageUpload />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
