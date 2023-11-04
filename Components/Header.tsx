// The Header is shown on top of every screens
// Is displayed :
// - on HomeScreen : Profile/Notifications and Parameters icons
// - on GameScreen : Return and Parameters icons

import { StyleSheet, View, Text, Pressable } from 'react-native';

const iconSize = 35;            // size of the round icons inside the header (return, parameters, profile, notifications)
const floatingPointSize = 10;   // size of the red point above th notifications icon
const mainViewPadding = 10;      // padding of the main view

export enum eHeaderType
{
    HomeScreen,
    GameScreen
}

interface HeaderProps {
    headerType: eHeaderType;
    newNotification: boolean;
    children: React.ReactNode
}

const Header = (props : HeaderProps) => {

    let isHomeScreen = props.headerType === eHeaderType.HomeScreen;

    return (
        // Main container
        <View 
        style={ styles.mainContainer }
        >
            <Pressable 
            onPress={() => {}}
            style={[ styles.icon, displayConditionStyle(!isHomeScreen).display ]}
            >
                <Text
                style={{ fontSize: 15, color: 'white' }}
                >
                    {"R"}
                </Text>
            </Pressable>
            
            {/* Profile and Notifications buttons */}
            <View 
            style={ {flexDirection: "row",  justifyContent: 'space-between' } }
            >
                
                {/* Profile button */}
                <Pressable 
                onPress={() => {}}
                style={[ styles.icon, displayConditionStyle(isHomeScreen).display ]}  
                >
                    <Text
                    style={{ fontSize: 15, color: 'white' }}
                    > 
                        {"Pr"}
                    </Text>
                </Pressable>
                
                {/* Notifications button */}
                <View
                style={[ {marginLeft: 10}, displayConditionStyle(isHomeScreen).display ]}
                >
                    
                    {/* Icon */}
                    <Pressable
                    onPress={() => {}}
                    style={[ styles.icon ]}  
                    >
                        <Text
                        style={{ fontSize: 15, color: 'white' }}
                        > 
                            {"N"}
                        </Text>
                    </Pressable>
                    
                    {/* Floating indicator */}
                    <View 
                    style={[ styles.floatingPoint, displayConditionStyle(props.newNotification).display ]}
                    />
                    </View>
            </View>
    
            {/* Parameters button */}
            <Pressable onPress={() => {}} 
                style={ styles.icon }
                >
                <Text
                    style={{ fontSize: 15, color: 'white' }}
                    >
                    {"Pa"}
                </Text>
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
       height: iconSize,
       width: iconSize,
       borderRadius: iconSize,
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

const displayConditionStyle = (display : boolean) => StyleSheet.create({
display: {
    display: display ? 'flex' : 'none'
}
});

export default Header;