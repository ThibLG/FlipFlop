// 

import { StyleSheet, View, Text, Pressable } from 'react-native';
import GenericPopUp from "./GenericPopUp";

interface PopUpParameters {
    isDisplayed : boolean;
    closePopUp : CallableFunction;
}

const ParametersPopUp = (props : PopUpParameters) => {

    return (
        <GenericPopUp
        iconImagepath = {require('../Images/Icons/icons_parameters_white.png')}
        isDisplayed = {props.isDisplayed}
        closePopUp = {props.closePopUp}
        > 
          <View >
              <Text 
              style={ styles.mainText } 
              >
                { "Choix de langue" } 
              </Text>
              
              <Text 
              style={ styles.mainText } 
              >
                { "Choix du thème" } 
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

export default ParametersPopUp;