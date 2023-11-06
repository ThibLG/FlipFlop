import { StyleSheet } from 'react-native';

export const displayConditionStyle = (display : boolean) => StyleSheet.create({
    display: {
        display: display ? 'flex' : 'none'
    }
});