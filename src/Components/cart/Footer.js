import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from "../../assets/color";
import { connect } from 'react-redux';
import FormCheckOut from '../FormCheckout';
import global from '../../screen/global'
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout: false
        }
    }
    formatVND(num) {
        var value = String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        return value
    }
    checkout = () => {
        if (this.props.user.loggedIn) {
            this.setState({ checkout: !this.state.checkout })
        }
        else {
            Alert.alert(
                'Bạn chưa đăng nhập',
                'Bạn có muốn quay lại màn hình đăng nhập để tiếp tục mua hàng?',
                [
                    {
                        text: 'Để sau',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => global.goBackNavigation() },
                ],
                { cancelable: false },
            );
        }
    }

    render() {
        var choose = '';
        if (this.state.checkout) {
            choose = 'Ẩn'
        }
        else choose = 'Mua Ngay'
        return (
            <View style={styles.containerStyle}>
                {this.state.checkout ? <FormCheckOut navigation={this.props.navigation} /> : null}
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background,
                    marginTop: 1,
                    marginBottom: 1
                }} />
                <View style={styles.buttonContainerStyle}>
                    <View style={styles.totalStyle}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Tổng : </Text>
                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 15 }}>{this.formatVND(this.props.totalMoney)} đ</Text>
                    </View>

                    <TouchableOpacity style={styles.checkoutButtonStyle}
                        onPress={() => {
                            this.checkout()
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{choose}</Text>

                    </TouchableOpacity>

                </View>
            </View>
        );
    };
};
const mapStateToProps = (state) => {
    return {
        totalMoney: state.Cart.totalMoney,
        user: state.Auth,
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
        backgroundColor: colors.white
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
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

