/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    ScrollView,
    TouchableOpacity, Dimensions, Text, Alert
} from 'react-native';

const { width } = Dimensions.get('window');
import { Icon, Card } from "native-base";
import { colors } from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import FastImage from "react-native-fast-image";
import Footer from "../../Components/cart/Footer";
import { connect } from 'react-redux';
import { removeProduct, incrQuantity, decrQuantity } from '../../redux/actions/Cart';
import Loading from '../../Components/Loading'
import { doneAdd } from '../../redux/actions/Order'

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <SafeAreaView style={styles.saf}>

                {this.props.isLoading ? <Loading /> : null}
                {this.props.carts.length > 0 ?
                    <View style={styles.container}>
                        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                            <FlatList
                                vertical
                                showsVerticalScrollIndicator={false}
                                data={this.props.carts}
                                renderItem={({ item }) =>
                                    <View style={styles.container}>
                                        <Card style={[styles.card]}>
                                            <View>
                                                <View style={[styles.viewHorizontal, { marginTop: 5, marginBottom: 5 }]}>
                                                    <View style={styles.viewHorizontalLeft}>
                                                        <FastImage style={styles.avatar}
                                                            source={{ uri: item.product.avatarSource }}
                                                        />
                                                        <Text>{item.product.nameShop}</Text>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                let key = item.product.key;
                                                                this.props.removeProduct(key)
                                                            }}
                                                        >
                                                            <TextComponent
                                                                style={[styles.textItemRight]}>X</TextComponent>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{
                                                width: '100%',
                                                height: 0.5,
                                                backgroundColor: colors.background,
                                                marginTop: 5
                                            }} />
                                            <View style={[styles.viewItem]}>
                                                <FastImage style={styles.imageNumColumns}
                                                    source={{ uri: item.product.images[0] }} />
                                                <View style={[styles.left10, {
                                                    marginBottom: 20, marginTop: 5, flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                }]}>
                                                    <Text style={{
                                                        marginTop: 20,
                                                        fontSize: 17,
                                                        fontWeight: '600'
                                                    }}>{item.product.productName}</Text>
                                                    <TextComponent
                                                        style={styles.money}>{item.product.price} đ</TextComponent>
                                                    <View style={styles.counterStyle}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                let key = item.product.key;
                                                                this.props.decrQuantity(key)
                                                            }}
                                                            style={{
                                                                borderRadius: 15,
                                                                // backgroundColor: colors.red,
                                                                height: 30,
                                                                width: 30,
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                            <Icon
                                                                name="ios-arrow-dropleft"
                                                                type ="Ionicons"
                                                                size={25}
                                                                style={{ color: colors.mediumGray }}
                                                            />
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 20, marginLeft: 5, marginRight: 5 }}>{item.quantity}</Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                let key = item.product.key;
                                                                this.props.incrQuantity(key)
                                                            }}
                                                            style={{
                                                                borderRadius: 15,
                                                                // backgroundColor: colors.red,
                                                                height: 30, width: 30,
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                            <Icon
                                                                name="ios-arrow-dropright"
                                                                type="Ionicons"
                                                                size={25}
                                                                style={{ color: colors.mediumGray }}
                                                            />
                                                        </TouchableOpacity>

                                                    </View>

                                                </View>
                                            </View>
                                        </Card>


                                    </View>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </ScrollView>
                        <Footer navigation={this.props.navigation} />
                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20 }}>Chưa có sản phẩm nào trong giỏ hàng</Text>
                    </View>}
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        carts: state.Cart.carts,
        totalMoney: state.Cart.totalMoney,
        isLoading: state.Order.isLoading,
        addDone: state.Order.addDone
    }
}

export default connect(mapStateToProps, { removeProduct, incrQuantity, decrQuantity, doneAdd })(ShoppingCart)

const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,

    },
    scroll: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {

        flex: 1,
        backgroundColor: colors.background
    },

    bar: {
        width: 4,
        height: 20,
        backgroundColor: colors.red,
        marginRight: 5
    },
    card: {
        borderRadius: 8,
        marginLeft: 10,
        marginRight: 10
    },
    viewHorizontalLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        fontSize: 18,
        color: colors.red
    },
    image: {
        justifyContent: 'center',
        flex: 1,
        width: 100,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: colors.background,
        borderRadius: 8
    },
    imageNumColumns: {
        justifyContent: 'center',
        width: width / 2.8,
        padding: 20,
        alignItems: 'center',
        height: 120,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        margin: 5

    },
    viewItem: {
        backgroundColor: colors.white,
        margin: 5,
        flexDirection: 'row',
    },

    header: {
        top: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#ffffffcc'
    },
    viewHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.red
    },
    left10: {
        left: 5
    },
    textItemRight: {
        color: colors.black,
        paddingRight: 10,
    },
    marginTop: {
        marginTop: 10,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    money: {
        color: colors.red,
        fontWeight: 'bold',
        fontSize: 17
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderWidth: 1,
        borderColor: colors.bgUser,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: colors.background
    },
    counterStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    }


})
