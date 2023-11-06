// 

import { StyleSheet, View, Image, Pressable, ImageSourcePropType } from 'react-native';
import { displayConditionStyle } from "../Utils/Styles";

const CROSS_SIZE = 25;

interface PopUpParameters {
    children : JSX.Element;
    isDisplayed : boolean;
    iconImagepath : ImageSourcePropType;
    closePopUp : CallableFunction;
}

const GenericPopUp = (props : PopUpParameters) => {

    return (
        // Main container
        <View 
        style={[
            {
            backgroundColor: '#FAFAFA',
            borderRadius: 10,
            marginLeft: 10,
            marginTop: 10,
            position: 'absolute',
            alignSelf: 'center'
            },
            displayConditionStyle(props.isDisplayed).display
        ]}
        >
            <View 
            style={{
                backgroundColor: '#574AE2',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingBottom: 10}}
            >
                
                <Pressable 
                onPress={() => { props.closePopUp() }}
                >
                    <Image
                    style={[ styles.cross, {alignSelf: 'flex-end'} ]}
                    source={require('../Images/Icons/icons_cross_white.png')}/>
                </Pressable>

                <Pressable 
                onPress={() => {}}
                >
                    <Image
                    style={[ styles.icon, {alignSelf: 'center'} ]}
                    source={props.iconImagepath} />
                </Pressable>
            </View>
            
            <View 
            style={{
                padding: 50,
            }}
            >
                {props.children}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    cross: {
       height: CROSS_SIZE,
       width: CROSS_SIZE,
       borderRadius: CROSS_SIZE,
       margin: 5
    },
    icon: {
       height: 70,
       width: 70,
       borderRadius: 70
    },
});

export default GenericPopUp;