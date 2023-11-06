import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from "./Header";
import { eHeaderType } from "./Header";
import { useState } from 'react';
import { displayConditionStyle } from "../Utils/Styles";
import ProfilePopUp from "./ProfilePopUp";
import NotificationsPopUp from "./NotificationsPopUp";
import ParametersPopUp from "./ParametersPopUp";


export enum ePopUpType
{
  None,
  Profile,
  Notifications,
  Parameters
}


interface ListElement {
  id : Number,
  name : String,
  birthYear : String
}

const DATA : ListElement[] = [
  {
    id: 1,
    name: 'Romain',
    birthYear: 'En attente de votre adversaire ...',
  },
  {
    id: 2,
    name: 'Steven',
    birthYear: 'A votre tour !',
  },
  {
    id: 3,
    name: 'Matthieu',
    birthYear: 'En attente de votre adversaire ...',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [showPopUp, setShowPopUp] = useState(ePopUpType.None);

  const setPopUpState = (state : ePopUpType) => {
    console.log('setPopUpState : ' + showPopUp + ' to ' + state);
    setShowPopUp(state);
  }

  const closePopUp = () => {
    setShowPopUp(ePopUpType.None);
  }

  const displayPopUp = () => {

    switch(showPopUp) {
      case ePopUpType.Profile :
        return (
          <ProfilePopUp 
          isDisplayed = {showPopUp === ePopUpType.Profile}
          closePopUp = {closePopUp}
          />
        )
      case ePopUpType.Notifications :
        return (
          <NotificationsPopUp 
          isDisplayed = {showPopUp === ePopUpType.Notifications}
          closePopUp = {closePopUp}
          />
        )
      case ePopUpType.Parameters :
        return (
          <ParametersPopUp 
          isDisplayed = {showPopUp === ePopUpType.Parameters}
          closePopUp = {closePopUp}
          />
        )
      default :
          return null;
    }

  }

  const renderListItems = ( item : ListElement ) => {
    return (
        
    <View >
        <Pressable
            onPress={() =>
            navigation.navigate('Details', {
                name: item.name,
                birthYear: item.birthYear,
            })
            }
        >
            <View style={{ flexDirection: 'row', backgroundColor: '#9C9CFF' }}>
                <Text
                style={{ fontSize: 14, paddingHorizontal: 12, paddingVertical: 12, flex: 1, color: 'white' }}
                numberOfLines={1}
                >
                {item.name}
                </Text>
                <Text
                style={{ fontSize: 14, paddingHorizontal: 12, paddingVertical: 12, flex: 4, color: 'white' }}
                >
                {item.birthYear}
                </Text>
            </View>

            <View
            style={{
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: '#ccc',
            }}
            />
        </Pressable>

      </View>
    );
  };

  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center'
    }}
    >

      <Header
      headerType = {eHeaderType.HomeScreen}
      newNotification = {false}
      setPopUpType = {setPopUpState}
      />
          
      <View style={ {backgroundColor: '#574AE2', height: 75, alignItems: 'center', justifyContent: 'center' }}>
          <Text
              style={{ fontSize: 20, color: 'white' }}
              >
              {"TITLE"}
          </Text>
      </View>
          
      <View style={ { marginHorizontal: 10, marginVertical: 10, flex: 1 }}>
          <Text
              style={{ backgroundColor: '#574AE2', fontSize: 18, color: 'white', 
              paddingVertical: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, textAlign: 'center' }}
              >
              {"Parties en cours"}
              </Text>
          <FlatList
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderListItems(item)}
          />
      </View>
      
      <View style={ { marginHorizontal: 10, marginVertical: 10 }}>
          <Pressable style={{ backgroundColor: 'orange', marginHorizontal: 50, marginVertical: 10, borderRadius: 5, alignItems: 'center' }} >
              <Text
              style={{ fontSize: 18, color: 'white', paddingVertical: 15 }}
              >
              {"Nouvelle partie Online"}
              </Text>
          </Pressable>
          
          <Pressable style={{ backgroundColor: 'orange', marginHorizontal: 50, marginVertical: 10, borderRadius: 5, alignItems: 'center' }} >
              <Text
              style={{ fontSize: 18, color: 'white', paddingVertical: 15 }}
              >
              {"Nouvelle partie Offline"}
              </Text>
          </Pressable>
      </View>
          
      <View style={ {backgroundColor: '#DDDDDD', height: 75, alignItems: 'center', justifyContent: 'center' }}>
          <Text
              style={{ fontSize: 20, color: 'white' }}
              >
              {"FOOTER"}
          </Text>
      </View>
      
      <View 
      style={[{
        backgroundColor: '#000000',
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        opacity: 0.75},
        displayConditionStyle(showPopUp != ePopUpType.None).display
      ]}
      />

      { displayPopUp() }

    </View>
  );
};

export default HomeScreen;