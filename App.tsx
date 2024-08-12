import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageUpload from './components/ImageUpload';
import EmojiPicker from './components/EmojiPicker'; // Import the new EmojiPicker component

export default function App() {
  return (
    <View style={styles.container}>
      <ImageUpload />
      <EmojiPicker /> {/* Use the EmojiPicker component */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
