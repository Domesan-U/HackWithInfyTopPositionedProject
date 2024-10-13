import React, { useRef } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const Camera = () => {
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = React.useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(data.uri);  // Save the photo URI to state for displaying
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
      <Button title="Capture" onPress={takePicture} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '80%',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default Camera;
