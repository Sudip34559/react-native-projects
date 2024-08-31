import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const selectImage = () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };
  const photo = launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const uri = response.assets[0].uri;
      return uri;
    }
  });
  console.log(photo);
};

const takePhoto = () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
  };
  let photo;
  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
    } else {
      const uri = response.assets[0].uri;
      photo = uri;
    }
  });
  return photo;
};

export {selectImage, takePhoto};
