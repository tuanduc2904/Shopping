/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Button,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TouchableOpacity,Image
} from 'react-native';
import {Dimens} from '../../assets/Dimens';
import {Icon} from "native-base";
import {colors} from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import {firebaseApp} from "../../untils/firebase";
import FastImage from "react-native-fast-image";
export default class ShoppingCart extends Component<Props> {

    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false,
        }

    }

    getProducts(itemRef) {
        let items = [];

        this.itemRef.ref('Products').on('value', (dataSnapshot) => {

            dataSnapshot.forEach((child) => {
                items.push({
                    image: child.val().image,
                    name: child.val().name,
                    describe: child.val().describe,
                    cmt: child.val().cmt,
                    like: child.val().like,
                    money: child.val().money,
                    shopid: child.val().shopid,
                    key: child.key
                })
            })
            this.setState({
                isLoading: false,
                dataSource: items,
                refreshing: false,
            })
        })
    }

    componentDidMount() {
        this.getProducts(this.itemRef)
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.getProducts(this.itemRef)
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.dataSource}
                        renderItem={({item}) =>
                            <TouchableOpacity >


                                <View >
                                    <FastImage style={{width:200,height:200}}
                                               source={{uri: item.image}}/>
                                    <Text style={styles.name}>{item.name}</Text>


                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg: {
        width: Dimens.screen.width,
        height: Dimens.screen.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        marginTop: 50,
        marginBottom: 60
    },
    viewTextInput: {
        height: 60
    },
    btnSignIn: {
        marginTop: 30
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 60
    },
    text: {
        fontSize: 18,
        color: colors.red
    }

})
