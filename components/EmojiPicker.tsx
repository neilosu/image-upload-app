// components/EmojiPicker.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  return (
    <View>
      <Picker 
        data={data} 
        onEmojiSelect={(emoji) => setSelectedEmoji(emoji.native)}
      />
      {selectedEmoji && (
        <Text style={styles.emojiText}>{selectedEmoji}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emojiText: {
    marginTop: 20,
    fontSize: 40,
  },
});

export default EmojiPicker;
