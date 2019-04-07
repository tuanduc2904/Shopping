import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from "../assets/color";
import { addOrder, doneAdd } from "../redux/actions/Order"


class FromCheckOut extends Component {
    state = {
        name: this.props.user.displayName,
        phone: this.props.user.phoneNumber,
        email: this.props.user.email,
        address: this.props.user.address,
    }

    renderTextfield(options) {
        return (
            <TextInput style={styles.textField} onChangeText={(value) => this.setState({ [options.name]: value })}
                placeholder={options.label} value={this.state[options.name]} keyboardType={options.keyboard || 'default'} />
        );
    }

    onPressButton = () => {
        if (this.props.user.displayName.length > 0) {
            let customer = {
                name: this.props.user.displayName,
                phone: this.props.user.phoneNumber,
                email: this.props.user.email,
                address: this.props.user.address
            };
            this.props.addOrder(customer);
            Alert.alert(
                'Mua hàng thành công',
                'Bạn có muốn chuyển đến Quản lý đơn hàng?',
                [
                    {
                        text: 'Để sau',
                        onPress: () => {
                            this.props.doneAdd();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'Chuyển đến', onPress: () => {
                            this.props.doneAdd();
                            this.props.navigation.navigate('ManageOrder')
                        }
                    },
                ],
                { cancelable: false },
            )
        }
        else {
            Alert.alert('Cần cập nhật thông tin tài khoản trước khi mua hàng')
        }


    }



    render() {
        return (
            <View style={styles.panel}>
                <Text style={{ fontSize: 20, fontWeight: '400', paddingBottom: 10 }}>Xác nhận thông tin mua hàng</Text>
                {/* {this.renderTextfield({ name: 'name', label: 'Tên' })}
                {this.renderTextfield({ name: 'phone', label: 'Số điện thoại', keyboard: 'phone-pad' })}
                {this.renderTextfield({ name: 'email', label: 'Email', keyboard: 'email-address' })}
                {this.renderTextfield({ name: 'address', label: 'Địa chỉ' })} */}
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background,
                    marginTop: 1,
                    marginBottom: 1
                }} />
                <Text style={styles.textField}>Họ tên: {this.state.name}</Text>
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background,
                    marginTop: 1,
                    marginBottom: 1
                }} />
                <Text style={styles.textField}>Số điện thoại: {this.state.phone}</Text>
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background,
                    marginTop: 1,
                    marginBottom: 1
                }} />
                <Text style={styles.textField}>Địa chỉ: {this.state.address}</Text>
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background,
                    marginTop: 1,
                    marginBottom: 1
                }} />
                <Text style={styles.textField}>Email: {this.state.email}</Text>

                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background,
                    marginTop: 1,
                    marginBottom: 1
                }} />
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        Alert.alert(
                            'Mua hàng',
                            'Bạn có muốn đặt hàng với thông tin trên?',
                            [
                                {
                                    text: 'Không',
                                    style: 'cancel',
                                },
                                { text: 'Mua ngay', onPress: () => { this.onPressButton() } },
                            ],
                            { cancelable: false },
                        );
                    }
                    }>
                        <Text style={styles.btnText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.Auth
    }
}
export default connect(mapStateToProps, { addOrder, doneAdd })(FromCheckOut);

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        margin: 10
    },
    textField: {
        marginTop: 10,
        marginLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.red,
        fontSize: 15,
        paddingVertical: 10,
    },
    btn: {
        backgroundColor: colors.red,
        borderRadius: 5,
        padding: 12,
        left: 10,
        width: 150,
        alignItems: 'center',
        marginLeft: 10,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

