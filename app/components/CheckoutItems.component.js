import React, {Component} from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView
} from 'react-native';

import CartItems from './CartItems.component';
import CustomerForm from './CustomerForm.component';

class CheckoutItems extends Component {
    render() {
        const {cartItems, navigation, cartTotal} = this.props;
        return (
            <View style={styles.container}>
               
                <View style={styles.ckitems}>
                    <FlatList
                        data={cartItems}
                        renderItem={({item, index}) => <CartItems item={item} index={index}/>}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{height: 0.3, backgroundColor: '#34495e90'}}/>}
                    />
                    
                </View>
                <View style={styles.custForm}>
                    <CustomerForm navigation={navigation}/>
                    <View style={styles.viewTong}>
                    <Text style={styles.text}>Tổng: {(cartTotal).toFixed(2)} đ</Text>
                    </View>
                </View>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    custForm: {
        flex: 1
    },
    ckitems: {
        height: 300
    },
    annouc: {
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#34495e90',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    },
    anncText: {
        textAlign: 'center',
        color: '#fff'
    },
    viewTong:{
        position:'absolute',
        top:250,
        left:10
    }
});

export default CheckoutItems;