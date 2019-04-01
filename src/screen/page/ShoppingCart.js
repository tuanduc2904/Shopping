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
    TouchableOpacity, Dimensions, Text
} from 'react-native';
const { width } = Dimensions.get('window');

import { Dimens } from '../../assets/Dimens';
import { Icon, Card } from "native-base";
import { colors } from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { firebaseApp } from "../../untils/firebase";
import FastImage from "react-native-fast-image";
import Header from "../../Components/cart/Header";
import ItemsContainer from "../../Components/cart/ItemsContainer";
import Footer from "../../Components/cart/Footer";
import { connect } from 'react-redux';
import { removeProduct, incrQuantity, decrQuantity } from '../../redux/actions/Cart'
class ShoppingCart extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <SafeAreaView style={styles.saf}>
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
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            let key = item.product.key;
                                                            this.props.removeProduct(key)
                                                        }}
                                                    >
                                                        <TextComponent style={[styles.textItemRight]}>X</TextComponent>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                        <Card style={[styles.viewItem]}>
                                            <FastImage style={styles.imageNumColumns}
                                                source={{ uri: item.product.images[0] }} />
                                            <View style={[styles.left10, {
                                                marginBottom: 20, marginTop: 5, flexDirection: 'column',
                                                justifyContent: 'space-between',
                                            }]}>
                                                <Text style={{ marginTop: 20, fontSize: 17, fontWeight: '400' }}>{item.product.productName}</Text>
                                                <Card style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    justifyContent: 'space-between', width: 120
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            let key = item.product.key;
                                                            this.props.decrQuantity(key)
                                                        }}
                                                    >
                                                        <Text style={{
                                                            fontSize: 25, paddingLeft: 10,
                                                            paddingRight: 10, fontWeight: 'bold'
                                                        }}>-</Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ fontSize: 20 }}>{item.quantity}</Text>

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            let key = item.product.key;
                                                            this.props.incrQuantity(key)
                                                        }}
                                                    >
                                                        <Text style={{
                                                            fontSize: 25, paddingLeft: 10,
                                                            paddingRight: 10, fontWeight: 'bold'
                                                        }}>+</Text>
                                                    </TouchableOpacity>
                                                </Card>
                                                <TextComponent style={styles.money}>{item.product.price}đ</TextComponent>
                                            </View>
                                        </Card>
                                    </Card>


                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>


                    <Footer />
                </View>
            </SafeAreaView>
        );
    }
}
function mapStateToProps(state) {
    return {
        carts: state.Cart.carts,
        totalMoney: state.Cart.totalMoney
    }
}
export default connect(mapStateToProps, { removeProduct, incrQuantity, decrQuantity })(ShoppingCart)

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
        marginLeft: 5,
        marginRight: 5,
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
        margin: 5
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
        width: width / 2.6,
        padding: 20,
        alignItems: 'center',
        height: 120,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        margin: 20

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
    }


})
