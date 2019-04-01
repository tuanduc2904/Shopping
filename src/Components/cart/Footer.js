import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from "../../assets/color";
import { connect } from 'react-redux';
class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.buttonContainerStyle}>
                    <View style={styles.totalStyle}>
                        <Text style={{ fontWeight: 'bold' }}>Tổng : </Text>
                        <Text style={{ fontWeight: 'bold',color:'red' }}>{this.props.totalMoney} đ</Text>
                    </View>
                    <View style={styles.checkoutButtonStyle}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Mua Hàng</Text>
                    </View>
                </View>
            </View>
        );
    };
};
const mapStateToProps = (state) => {
    return {
        totalMoney: state.Cart.totalMoney
    }
}
export default connect(mapStateToProps)(Footer);

const styles = StyleSheet.create({
    containerStyle: {
        paddingRight: 15,
        paddingLeft: 15,
        borderTopWidth: 1,
        borderColor: '#e2e2e2',
        bottom: 0,


    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center'
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
});

