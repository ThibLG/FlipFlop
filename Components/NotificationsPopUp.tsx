// 

import { StyleSheet, View, Text, Pressable } from 'react-native';
import GenericPopUp from "./GenericPopUp";

interface PopUpParameters {
    isDisplayed : boolean;
    closePopUp : CallableFunction;
}

const NotificationsPopUp = (props : PopUpParameters) => {

    return (
        <GenericPopUp
        iconImagepath = {require('../Images/Icons/icons_bell_white.png')}
        isDisplayed = {props.isDisplayed}
        closePopUp = {props.closePopUp}
        > 
          <View >
              <Text 
              style={ styles.mainText } 
              >
                { "Matthieu attend votre tour" } 
              </Text>
              
              <Text 
              style={ styles.mainText } 
              >
                { "Steven attend votre tour" } 
              </Text>
          </View>
        </GenericPopUp>
    );
};

const styles = StyleSheet.create({
    mainText: {
        fontSize: 15,
        color: '#574AE2'
    }
});

export default NotificationsPopUp;