import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {loginUser, sendOtpMessage, verifyOtp} from '../API/backendAPI';
import {getData, saveData} from '../asyncStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyPhone = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(true);

  const sendVerificationCode = async () => {
    await sendOtpMessage(phoneNumber)
      .then(response => {
        // console.log(response.data);
        if (response.data.success) {
          setModalVisible(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const verifyCode = async () => {
    const data = {
      phoneNumber: phoneNumber,
      code: verificationCode,
    };
    await verifyOtp(data)
      .then(res => {
        if (res.data.success) {
          navigation.replace('Register', {
            phoneNumber: phoneNumber,
          });
        } else {
          alert('Invalid OTP');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const login = () => {
    if (loading) {
      loginUser(phoneNumber)
        .then(async res => {
          if (res.data.statusCode === 200) {
            setModalVisible(false);
            saveData('user', JSON.stringify(res.data.data));
            navigation.replace('BottomTabs');
            setLoading(false);
          }
          if (res.data.statusCode === 201) {
            setModalVisible(false);
            Alert.alert(res.data.message);
            console.log(res.data);
            // navigation.replace('VerifyPhone');
            // setLoading(false);
          }
        })
        .catch(err => {
          setModalVisible(false);
          navigation.replace('Register', {
            phoneNumber: phoneNumber,
          });
        });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://cdn.wallpapersafari.com/87/66/g7uPjL.jpg',
      }}
      style={styles.container}>
      <Text style={styles.hesderText}>Verify your Phone Number</Text>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginTop: 7,
            }}>
            +91
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'Enter phone number '}
            placeholderTextColor="#ffff"
            keyboardType="numeric"
            onChangeText={text => setPhoneNumber(`+91${text}`)}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#ffff'}}>
            We’ll send a 6-digit code to this number
          </Text>
        </View>
        <View
          style={{
            marginTop: 70,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={styles.button}
            onPress={() => {
              // sendVerificationCode()
              setModalVisible(true);
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
              Send Code
            </Text>
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter the verification code</Text>
            <TextInput
              style={[styles.input, {color: '#16a34a'}]}
              placeholder={'Enter code '}
              placeholderTextColor="#16a34a"
              keyboardType="numeric"
              onChangeText={text => setVerificationCode(text)}
            />
            <Pressable
              style={[
                styles.button,
                {
                  marginTop: 50,
                },
              ]}
              onPress={() => {
                // verifyCode();
                login();
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
                Verify
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default VerifyPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    gap: 100,
    paddingTop: 30,
    alignItems: 'center',
  },
  hesderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#16a34a',
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
  },
  form: {
    width: '90%',
    height: 250,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 20,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    paddingBottom: 60,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingBottom: 240,
  },
  modalView: {
    width: 360,
    padding: 20,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#16a34a',
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
