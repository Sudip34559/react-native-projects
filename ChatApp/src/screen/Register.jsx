import {
  Alert,
  Button,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {takePhoto, selectImage} from '../picker/imagePiker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {register} from '../API/backendAPI';
import {getData, saveData} from '../asyncStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({route, navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [originalname, setOriginalname] = useState(null);
  const [mimetype, setMimetype] = useState(null);
  const [size, setSize] = useState(null);

  const [name, setName] = useState('');
  const {phoneNumber} = route.params;
  const selectImage = async () => {
    // if (Platform.OS === 'android') {
    //   try {
    //     const permission = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //       {
    //         title: 'Access Photos',
    //         message: 'This app needs access to your photos to upload them.',
    //         buttonNeutral: 'Ask Me Later',
    //         buttonNegative: 'Cancel',
    //         buttonPositive: 'OK',
    //       },
    //     );
    //     console.log(permission);
    //     if (permission === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log('You can use the photo gallery');

    //       const options = {
    //         mediaType: 'photo',
    //         maxWidth: 1000,
    //         maxHeight: 1000,
    //         quality: 1,
    //         includeBase64: false,
    //         allowsEditing: true,
    //       };
    //       launchImageLibrary(options, response => {
    //         if (response.didCancel) {
    //           console.log('User cancelled image picker');
    //         } else if (response.error) {
    //           console.log('ImagePicker Error: ', response.error);
    //         } else if (response.assets && response.assets.length > 0) {
    //           const {uri, fileName, type, fileSize} = response.assets[0];
    //           setImageUri(uri);
    //           setOriginalname(fileName);
    //           setMimetype(type);
    //           setSize(fileSize);
    //         }
    //       });
    //     } else {
    //       console.log('Photo gallery permission denied');
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }

    const options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      includeBase64: false,
      allowsEditing: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const {uri, fileName, type, fileSize} = response.assets[0];
        setImageUri(uri);
        setOriginalname(fileName);
        setMimetype(type);
        setSize(fileSize);
      }
    });
  };

  const registerUser = async () => {
    const fromData = new FormData();
    fromData.append('phoneNumber', phoneNumber);
    fromData.append('name', name);
    fromData.append('profileImage', {
      uri: imageUri,
      name: originalname,
      type: mimetype,
    });
    register(fromData)
      .then(async res => {
        if (res.data.success) {
          // console.log(res.data.data);
          saveData('user', JSON.stringify(res.data.data));
          navigation.replace('BottomTabs');
        } else {
          Alert('Failed to register');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log(imageUri);
  // const data = getData('user');
  // console.log(data);
  return (
    <ImageBackground
      source={{
        uri: 'https://cdn.wallpapersafari.com/87/66/g7uPjL.jpg',
      }}
      style={styles.container}>
      <View style={styles.form}>
        <View>
          <Image
            source={{
              uri: imageUri
                ? imageUri
                : 'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg',
            }}
            style={styles.image}
          />
          <Pressable
            style={styles.press}
            onPress={() => {
              selectImage();
            }}>
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={20}
              color="#fff"
            />
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          placeholder={'Enter your name '}
          placeholderTextColor="#ffff"
          onChangeText={text => setName(text)}
        />
        <Pressable style={styles.button} onPress={() => registerUser()}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
            Register
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginTop: 20,
    borderRadius: 35, // Added for better visualization
  },
  form: {
    width: '90%',
    height: 300,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 20,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    paddingBottom: 60,
    alignItems: 'center',
    position: 'relative',
  },
  press: {
    width: 30,
    height: 30,
    backgroundColor: '#16a34a',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 100,
    padding: 8,
    fontSize: 20,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 7,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    color: 'white',
    marginTop: 30,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});
