import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Status from '../screen/Status';
import Calls from '../screen/Calls';
import Chats from '../screen/Chats';
import Communities from '../screen/Communities';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTabs = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff', // Tab bar background color
          borderTopColor: 'transparent', // Hide border line
          height: 70, // Height of the tab bar
        },
      }}>
      <Tab.Screen
        name="Chats"
        component={Chats}
        initialParams={{modal: modalVisible}}
        options={{
          tabBarLabel: 'Chats',
          tabBarLabelStyle: {
            marginBottom: 10,
            display: 'none',
          },
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                {focused ? (
                  <>
                    <View
                      style={{
                        width: 60,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: '#a7f3d0',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="chatbox-ellipses"
                        size={23}
                        color="#15803d"
                      />
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      width: 60,
                      height: 34,
                      borderRadius: 17,
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="chatbox-ellipses-outline"
                      size={25}
                      color="#000000"
                    />
                  </View>
                )}
                <Text
                  style={{
                    color: focused ? 'black' : 'gray',
                    fontSize: 12,
                    marginTop: 2,
                  }}>
                  Chats
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarLabel: 'Status',
          tabBarLabelStyle: {
            marginBottom: 10,
            display: 'none',
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              {focused ? (
                <View
                  style={{
                    width: 60,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#a7f3d0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="compass-sharp" size={23} color="#15803d" />
                </View>
              ) : (
                <View
                  style={{
                    width: 60,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="compass-outline" size={25} color="#000000" />
                </View>
              )}
              <Text
                style={{
                  color: focused ? 'black' : 'gray',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Status
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="communities"
        component={Communities}
        options={{
          tabBarLabel: 'Communities',
          tabBarLabelStyle: {
            marginBottom: 10,
            display: 'none',
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              {focused ? (
                <View
                  style={{
                    width: 60,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#a7f3d0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={23}
                    color="#15803d"
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 60,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={25}
                    color="#000000"
                  />
                </View>
              )}
              <Text
                style={{
                  color: focused ? 'black' : 'gray',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Communities
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{
          tabBarLabel: 'Calls',
          tabBarLabelStyle: {
            marginBottom: 10,
            display: 'none',
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              {focused ? (
                <View
                  style={{
                    width: 60,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#a7f3d0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={23}
                    color="#15803d"
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 60,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={25}
                    color="#000000"
                  />
                </View>
              )}
              <Text
                style={{
                  color: focused ? 'black' : 'gray',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Calls
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
