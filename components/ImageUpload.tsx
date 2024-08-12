import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ImageUpload: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

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
            const fileName = pickerResult.assets[0].fileName || pickerResult.assets[0].uri.split('/').pop();
            setImageName(fileName);
        }
    };

    const uploadImage = async () => {
        if (selectedImage) {
            setUploading(true);
            try {
                // Convert the base64 image to a Blob
                const response = await fetch(selectedImage);
                const blob = await response.blob();
        
                const formData = new FormData();
                formData.append('file', blob, imageName || 'upload.jpg'); // Use the original file name if available
        
                const uploadResponse = await axios.post('http://localhost:8000/api/upload/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        
                Alert.alert("Image uploaded successfully!", `Image URL: ${uploadResponse.data.file_url}`);
                setSelectedImage(null); // Clear the selected image after successful upload
            } catch (error) {
                if (error.response) {
                    console.log('Server responded with:', error.response.data);
                    Alert.alert("Image upload failed!", `Server error: ${error.response.data.error}`);
                } else {
                    console.log('Error message:', error.message);
                    Alert.alert("Image upload failed!", error.message);
                }
            } finally {
                setUploading(false);
            }
        } else {
            Alert.alert("No image selected!");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropZone} onPress={pickImage}>
                <Text style={styles.dropZoneText}>
                    {selectedImage ? "Tap to change image" : "Drag & Drop image here or Tap to select"}
                </Text>
            </TouchableOpacity>

            {selectedImage && (
                <>
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                    <Text>{imageName}</Text>
                    <Button title="Confirm Upload" onPress={uploadImage} disabled={uploading} />
                </>
            )}
            {uploading && <Text>Uploading image...</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    dropZone: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        marginVertical: 20,
    },
    dropZoneText: {
        color: '#999',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
});

export default ImageUpload;
