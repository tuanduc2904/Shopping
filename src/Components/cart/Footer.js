import React from 'react';
import { View, Text } from 'react-native';
import {colors} from "../../assets/color";

const Footer = () => {
    const {
        containerStyle,
        buttonContainerStyle,
        closeButtonStyle,
        checkoutButtonStyle } = styles;
    return (
        <View style={containerStyle}>

            <View style={buttonContainerStyle}>
                <View style={styles.totalStyle}>
                    <Text>Tổng - </Text>
                    <Text>$300</Text>
                </View>

                <View style={checkoutButtonStyle}>
                    <Text style={{ color: '#fff',fontWeight: 'bold' }}>Mua Hàng</Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        paddingRight: 15,
        paddingLeft: 15,
        borderTopWidth: 1,
        borderColor: '#e2e2e2',


    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom:15,
        alignItems:'center'
    },
    closeButtonStyle: {
        backgroundColor: '#7f8c8d',
        padding: 10,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 3,
    },
    checkoutButtonStyle: {
        backgroundColor: colors.bgUser,
        padding: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 3,
    },
    totalStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};

export default Footer;