import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    if(selectedImage == null)
        alert('You did not select any image.');

    const imageSource = selectedImage !== null
      ? { uri: selectedImage } : placeholderImageSource;
    return (
        <View >
        <Image 
            source={imageSource}
            style={styles.image} 
        />
         </View>
         );
  }

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 480,
    borderRadius: 18,
    paddingTop: 58,
    resizeMode:"contain",
  },
});