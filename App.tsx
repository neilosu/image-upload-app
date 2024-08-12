import { StyleSheet, View } from 'react-native';
import ImageUpload from './components/ImageUpload';
import EmojiPicker from './components/EmojiPicker'; // Import the new EmojiPicker component
import React, { useState } from 'react';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    // Here you can handle the file upload logic, for example, sending it to the server
    console.log('Uploaded image:', file);
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      {uploadedImage && (
        <div>
          <h2>Uploaded Image Preview:</h2>
          <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      <EmojiPicker />
    </div>
  );
};

export default App;
