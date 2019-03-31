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
import { addOrder } from '../redux/actions/orderAction';
import { emptyCart } from '../redux/actions/cartActions';

class CustomerForm extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    street: '',
  }

  renderTextfield(options) {
    return (
      <TextInput style={styles.textField} onChangeText={(value) => this.setState({ [options.name]: value })}
        placeholder={options.label} value={this.state[options.name]} keyboardType={options.keyboard || 'default'} />
    );
  }

  onPressButton = () => {
    const { name, phone, email, street } = this.state;
    const { cartItems, navigation, addOrder, emptyCart } = this.props;
    if (name === '') { return Alert.alert('enter name') }
    if (phone === '') { return Alert.alert('enter phone') }
    if (email === '') { return Alert.alert('enter email') }
    if (street === '') { return Alert.alert('enter street') }
    let customer = { name: name, phone: phone, email: email, street: street }
    addOrder({ cartItems: cartItems, customer: customer });
    emptyCart();
    this.setState({ name: '' });
    this.setState({ phone: '' });
    this.setState({ email: '' });
    this.setState({ street: '' });
    navigation.navigate('Receipt');
  }



  render() {
    return (
      <View style={styles.panel}>
        {this.renderTextfield({ name: 'name', label: 'Tên' })}
        {this.renderTextfield({ name: 'phone', label: 'Số điện thoại', keyboard: 'phone-pad' })}
        {this.renderTextfield({ name: 'email', label: 'Email', keyboard: 'email-address' })}
        {this.renderTextfield({ name: 'street', label: 'Địa chỉ' })}
        <View style={{alignItems:'flex-end'}}>
        <TouchableOpacity style={styles.btn} onPress={this.onPressButton}>
          <Text style={styles.btnText}>Mua Hàng</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10,
    margin: 10
  },
  textField: {
    height: 40,
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
  },
  btn: {
    backgroundColor: colors.red,
    borderRadius: 5,
    padding: 12,
    left: 10,
    width: 150,
    alignItems: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => ({
  cartItems: state.cart.cart
})
export default connect(mapStateToProps, { addOrder, emptyCart })(CustomerForm);