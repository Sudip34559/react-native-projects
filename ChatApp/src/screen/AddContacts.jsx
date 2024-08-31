import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUserByPhonr} from '../API/backendAPI';

const AddContacts = ({navigation}) => {
  const [contacts1, setContacts1] = useState([]);
  const [contacts2, setContacts2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [keyboardType, setKeyboardType] = useState(true);
  const searchInputRef = useRef(null);

  const getUsers = (contacts, array) => {
    if (loading) {
      getUserByPhonr(contacts)
        .then(res => {
          if (res.data.success) {
            const data = dispalyUser(array, res.data.data);
            setContacts1(data[0]);
            setContacts2(data[0]); // Set contacts2 initially to the full list
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const dispalyUser = (array1, array2) => {
    const phoneArray = array1.map(cont1 => {
      return array2.map(cont2 => {
        const th = cont1.phoneNumber === cont2.phoneNumber;
        if (th) {
          cont2.name = cont1.name;
          setLoading(false);
        }
        return cont2;
      });
    });
    return phoneArray;
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        if (Platform.OS === 'android') {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Permission',
              message: 'This app needs access to your contacts.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
            setError('Contacts permission denied');
            setLoading(false);
            return;
          }
        }

        const contactsList = await Contacts.getAll();
        const Array = contactsList
          .map(item => ({
            name: item.givenName,
            phoneNumber: item.phoneNumbers[0].number,
          }))
          .map(number => ({
            name: number.name,
            phoneNumber: number.phoneNumber.replace(/\s+/g, ''),
          }));

        const phoneArray = contactsList
          .map(item => item.phoneNumbers[0].number)
          .map(number => number.replace(/\s+/g, ''));
        getUsers(phoneArray, Array);
      } catch (e) {
        console.log(e);
        setError('Failed to load contacts');
      }
    };
    getContacts();
  }, []);

  // Sort contacts alphabetically by name
  const sortedContacts = contacts1.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  function searchList(data, search) {
    if (search === '') {
      return setContacts2(sortedContacts); // Return the full sorted list if the search is empty
    }
    const lowerCaseSearchTerm = search.toLowerCase();
    const filteredData = data.filter(item => {
      const name = item.name ? item.name.toLowerCase() : '';
      const phoneNumber = item.phoneNumber
        ? item.phoneNumber.replace('+91', '').toLowerCase()
        : '';

      return (
        name.includes(lowerCaseSearchTerm) ||
        phoneNumber.includes(lowerCaseSearchTerm)
      );
    });

    // Sort the filtered data to prioritize phone numbers that start with the search term
    filteredData.sort((a, b) => {
      const phoneA = a.phoneNumber.replace('+91', '').toLowerCase();
      const phoneB = b.phoneNumber.replace('+91', '').toLowerCase();

      const startsWithA = phoneA.startsWith(lowerCaseSearchTerm);
      const startsWithB = phoneB.startsWith(lowerCaseSearchTerm);

      if (startsWithA && !startsWithB) return -1;
      if (!startsWithA && startsWithB) return 1;
      return 0;
    });

    setContacts2(filteredData);
  }
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        {!searchOpen && (
          <>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-sharp" size={23} color="black" />
            </Pressable>
            <View style={styles.headerTextCon}>
              <Text style={styles.headerText}>Select contacts</Text>
              <Text style={styles.headerText2}>
                {`${contacts1.length} contacts`}
              </Text>
            </View>
            <View style={styles.searchCon}>
              <Pressable onPress={() => setSearchOpen(true)}>
                <Ionicons name="search-sharp" size={23} color="black" />
              </Pressable>

              <Entypo name="dots-three-vertical" size={20} color="#000000" />
            </View>
          </>
        )}
        {searchOpen && (
          <View style={styles.cearchInput}>
            <Pressable
              onPress={() => {
                setSearchOpen(false);
                setSearchTerm('');
              }}>
              <Ionicons name="arrow-back-sharp" size={23} color="black" />
            </Pressable>
            <TextInput
              keyboardType={keyboardType ? 'default' : 'numeric'}
              style={styles.input}
              value={searchTerm}
              ref={searchInputRef}
              onChangeText={text => {
                setSearchTerm(text);
                searchList(contacts1, text); // Update the filtered list
              }}
              placeholder="Search..."
            />
            <Pressable
              onPress={() => {
                setKeyboardType(!keyboardType);
              }}>
              {!keyboardType ? (
                <MaterialCommunityIcons
                  name="keyboard-outline"
                  size={26}
                  color="black"
                />
              ) : (
                <Ionicons name="keypad" size={23} color="black" />
              )}
            </Pressable>
          </View>
        )}
      </View>
      <FlatList
        data={contacts2} // Use the filtered list
        ListHeaderComponent={
          <>
            <View style={styles.newContainer}>
              <Pressable style={styles.newItems}>
                <View style={[styles.iconCon, {paddingLeft: 5}]}>
                  <MaterialIcons name="group-add" size={27} color="#ffffff" />
                </View>
                <Text style={styles.addText}>New group</Text>
              </Pressable>
              <Pressable style={styles.newItems}>
                <View style={[styles.iconCon, {paddingLeft: 5}]}>
                  <MaterialIcons
                    name="person-add-alt-1"
                    size={27}
                    color="#ffffff"
                  />
                </View>
                <Text style={styles.addText}>New contact</Text>
                <Pressable style={{marginLeft: 170}}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={27}
                    color="#000000"
                  />
                </Pressable>
              </Pressable>
              <Pressable style={styles.newItems}>
                <View style={styles.iconCon}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={30}
                    color="#ffffff"
                  />
                </View>
                <Text style={styles.addText}>New community</Text>
              </Pressable>
            </View>
            <View style={{padding: 10, marginTop: 10}}>
              <Text style={[styles.headerText2, {fontSize: 12}]}>
                Contacts on WhatsApp
              </Text>
            </View>
          </>
        }
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Pressable style={[styles.contactContainer]}>
            <View style={[styles.iconCon, {overflow: 'hidden'}]}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{
                  uri: item.profileImage,
                }}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  contactContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  phoneNumber: {
    fontSize: 14,
    color: 'black',
  },
  head: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d8',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'fixed',
    zIndex: 100,
    top: 0,
    width: '100%',
  },
  headerTextCon: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  headerText2: {
    fontSize: 11,
    color: 'black',
    paddingLeft: 2,
  },
  searchCon: {
    width: 70,
    flexDirection: 'row',
    height: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newContainer: {
    gap: 20,
    padding: 10,
    justifyContent: 'space-between',
  },
  newItems: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  iconCon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    marginLeft: 13,
  },
  cearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    margin: 10,
    backgroundColor: '#e7e5e4',
    width: '95%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default AddContacts;
