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
    TouchableOpacity, Image, Dimensions, ScrollView
} from 'react-native';
import {Card, Icon} from "native-base";
import FastImage from "react-native-fast-image";
import {firebaseApp} from "../untils/firebase";
import TextComponent from "../Common/TextComponent/TextComponent";
import {colors} from "../assets/color";
import {Dimens} from "../assets/Dimens";
const {width} = Dimensions.get('window');
const height = width * 0.5;
export default class SeeMore extends Component {

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
            <SafeAreaView style={styles.saf}>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Card style={[styles.card]}>
                            <View style={[styles.viewHorizontal, {marginTop: 5, marginBottom: 5}]}>
                                <View style={styles.viewHorizontalLeft}>
                                    <FastImage style={styles.avatar}/>
                                    <TextComponent style={[styles.title]}>Ken</TextComponent>


                                </View>
                                <View>
                                    <TextComponent style={[styles.textItemRight]}>1h </TextComponent>
                                </View>
                            </View>

                        </Card>
                        <FlatList
                            horizontal
                            showsVerticalScrollIndicator={false}
                            data={this.state.dataSource}
                            renderItem={({item}) =>
                                <TouchableOpacity style={[styles.viewItem]}>

                                    <FastImage style={styles.imageNumColumns}
                                               source={{uri: item.image}}/>
                                    <View style={[styles.left10, {marginBottom: 5, marginTop: 5}]}>
                                        <TextComponent style={styles.name}>{item.name}</TextComponent>
                                        <TextComponent style={styles.money}>{item.money}</TextComponent>
                                        <TextComponent style={styles.shopid}>{item.shopid}</TextComponent>
                                    </View>
                                    <View>
                                        <View style={[styles.viewHorizontal, {marginBottom: 10}]}>
                                            <Icon name='hearto' type='AntDesign'
                                                  style={{fontSize: 20, color: colors.red}}/>
                                            <Icon name='local-shipping' type='MaterialIcons'
                                                  style={{fontSize: 20, color: colors.red}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
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
