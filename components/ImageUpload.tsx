import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ImageUpload: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!pickerResult.canceled) {
            setSelectedImage(pickerResult.assets[0].uri);
            
            // Extract the file name
            const fileName = pickerResult.assets[0].fileName;
            setImageName(fileName);
        }
    };
    
    const uploadImage = async () => {
        if (selectedImage) {
            // Convert the base64 image to a Blob
            const response = await fetch(selectedImage);
            const blob = await response.blob();
    
            const formData = new FormData();
            formData.append('file', blob, imageName || 'upload.jpg'); // Use the original file name if available
    
            try {
                const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                Alert.alert("Image uploaded successfully!", `Image URL: ${response.data.file_url}`);
            } catch (error) {
                if (error.response) {
                    console.log('Server responded with:', error.response.data);
                    Alert.alert("Image upload failed!", `Server error: ${error.response.data.error}`);
                } else {
                    console.log('Error message:', error.message);
                    Alert.alert("Image upload failed!", error.message);
                }
            }
        } else {
            Alert.alert("No image selected!");
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
            <Button title="Upload Image" onPress={uploadImage} disabled={!selectedImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 20,
    },
});

export default ImageUpload;