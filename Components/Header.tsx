// The Header is shown on top of every screens
// Is displayed :
// - on HomeScreen : Profile/Notifications and Parameters icons
// - on GameScreen : Return and Parameters icons

import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Constants } from "../Utils/Constants";
import { displayConditionStyle } from "../Utils/Styles";
import { ePopUpType } from "./HomeScreen";

const floatingPointSize = 10;   // size of the red point above th notifications icon
const mainViewPadding = 10;      // padding of the main view

export enum eHeaderType
{
    HomeScreen,
    GameScreen
}

interface HeaderProps {
    headerType : eHeaderType;
    newNotification : boolean;
    setPopUpType : CallableFunction;
}

const Header = (props : HeaderProps) => {

    let isHomeScreen = props.headerType === eHeaderType.HomeScreen;

    return (
        // Main container
        <View 
        style={ styles.mainContainer }
        >
            {/* Back button */}
            <Pressable 
            onPress={() => {}}
            style={ displayConditionStyle(!isHomeScreen).display }
            >
                <Image style={ styles.icon } source={require('../Images/Icons/icons_back_white_on_light_blue.png')} />
            </Pressable>
            
            {/* Profile and Notifications buttons */}
            <View 
            style={ {flexDirection: "row",  justifyContent: 'space-between' } }
            >
                
                {/* Profile button */}
                <Pressable 
                onPress={() => { props.setPopUpType(ePopUpType.Profile) }}
                style={ displayConditionStyle(isHomeScreen).display }  
                >
                <Image style={ styles.icon } source={require('../Images/Icons/icons_profile_white_on_light_blue.png')} />
                </Pressable>
                
                {/* Notifications button */}
                <View
                style={[ {marginLeft: 10}, displayConditionStyle(isHomeScreen).display ]}
                >
                    
                    {/* Icon */}
                    <Pressable
                    onPress={() => { props.setPopUpType(ePopUpType.Notifications) }}
                    style={[ styles.icon ]}  
                    >
                        <Image style={ styles.icon } source={require('../Images/Icons/icons_bell_white_on_light_blue.png')} />
                    </Pressable>
                    
                    {/* Floating indicator */}
                    <View 
                    style={[ styles.floatingPoint, displayConditionStyle(props.newNotification).display ]}
                    />
                    </View>
            </View>
    
            {/* Parameters button */}
            <Pressable onPress={() => { props.setPopUpType(ePopUpType.Parameters) }} 
                style={ styles.icon }
                >
                <Image style={ styles.icon } source={require('../Images/Icons/icons_parameters_white_on_light_blue.png')} />
            </Pressable>
        
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#574AE2',
        flexDirection: "row", 
        justifyContent: 'space-between',
        padding: mainViewPadding
    },
    icon: {
       backgroundColor: '#9C9CFF',
       height: Constants.ICON_SIZE,
       width: Constants.ICON_SIZE,
       borderRadius: Constants.ICON_SIZE,
       justifyContent: 'center',
       alignItems: 'center'
    },
    floatingPoint: {
        backgroundColor: '#FF0000',
        height: floatingPointSize,
        width: floatingPointSize,
        borderRadius: floatingPointSize,
        alignSelf: 'flex-end',
        position: 'absolute'
    }
});

export default Header;