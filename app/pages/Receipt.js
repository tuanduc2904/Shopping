import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView
} from 'react-native';
import {colors} from '../assets/color'
import {connect} from 'react-redux';
import OrderSummary from '../components/OrderSummary.component';
import Logo from '../components/Logo.component';
import Cart from '../components/Cart.component';
import themes from '../styles/theme.style';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Receipt extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Receipt',
            headerLeft: <Logo navigation={navigation}/>,
            headerRight: <Cart navigation={navigation}/>
        }
    }

    getTotal() {
        let total = 0;
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            total = total + items[i].cost
        }
        return <View style={styles.hozotall}>
            <Text style={styles.totText}>Tổng: {(total).toFixed(2)} đ</Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Đặt Hàng</Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        const {customer, items, navigation} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.billings}>
                        <Text style={styles.billtext}>Thông Tin Người Đặt</Text>
                        <Text style={styles.text}>Tên: {customer.name}</Text>
                        <Text style={styles.text}>Phone: {customer.phone}</Text>
                        <Text style={styles.text}>Email: {customer.email}</Text>
                        <Text style={styles.text}>Địa chỉ: {customer.street}</Text>
                    </View>
                    <View style={styles.orderSumm}>
                        <Text style={styles.billtext}>Đơn Hàng</Text>
                        <FlatList
                            data={items}
                            renderItem={({item}) => <OrderSummary item={item}/>}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: '#34495e90'}}/>}
                        />
                        {this.getTotal()}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headings: {
        backgroundColor: '#34495e90',
        padding: 12,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderSumm: {
        flex: 1,
        margin: 10
    },
    billtext: {
        padding: 6,
        fontSize: 18,
        justifyContent: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: colors.red,
        color: colors.red
    },
    text: {
        margin: 5
    },
    billings: {
        height: 130,
        margin: 10
    },
    totText: {
        color: 'red',
        fontWeight: 'bold'
		},
		hozotall:{
			marginRight: 10,
			flexDirection:'row',
			justifyContent:'space-between',
			alignItems:'center'
		},
		btn: {
			backgroundColor: colors.red,
			borderRadius: 5,
			padding: 12,
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
    customer: state.order.order.customer,
    items: state.order.order.items
})

export default connect(mapStateToProps)(Receipt);