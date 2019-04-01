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
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity, Dimensions, ScrollView
} from 'react-native';
import ListShop from '../../Components/ListShop'
import { Card, Icon } from "native-base";
import FastImage from "react-native-fast-image";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { colors } from "../../assets/color";
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');
class ShopSell extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <SafeAreaView style={styles.saf}>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.props.storeProducts}
                        renderItem={({ item }) =>
                            <View style={styles.container}>
                                <Card style={[styles.card]}>
                                    <View style={[styles.viewHorizontal, { marginTop: 5, marginBottom: 5 }]}>
                                        <View style={styles.viewHorizontalLeft}>
                                            <FastImage style={styles.avatar}
                                                source={{ uri: item.avatarSource }}
                                            />
                                            <TextComponent style={[styles.title]}>{item.nameShop}</TextComponent>
                                        </View>
                                        <View>
                                            <TextComponent style={[styles.textItemRight]}>{item.products.avatarSource}</TextComponent>
                                        </View>
                                    </View>
                                </Card>
                                <ListShop products={item.products} />
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}

                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
mapStateToProps = (state) => {
    return {
        storeProducts: state.Products.storeProducts
    }
}
export default connect(mapStateToProps)(ShopSell)
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

        // backgroundColor: colors.background,
        // borderRadius: 8
        justifyContent: 'center',
        width: width / 2.2,
        flex: 1,
        alignItems: 'center',
        height: 150,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    viewItem: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 5,
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
        color: colors.black
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
        color: colors.red
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
