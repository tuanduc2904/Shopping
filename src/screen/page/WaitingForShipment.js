import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';

import {colors} from "../../assets/color";
import {Card, Icon} from "native-base";
import FastImage from "react-native-fast-image";
import {Dimens} from "../../assets/Dimens";
import TextComponent from "../../Common/TextComponent/TextComponent";

export default class WaitingForShipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            user: {}
        }
    }

    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.container}>
                <TouchableOpacity   onPress={()=> {navigate('ProfileCart')}}>
                    <Card style={[styles.card]}>
                        <View>
                            <View style={[styles.viewHorizontal, {marginTop: 5, marginBottom: 5}]}>
                                <View style={styles.viewHorizontalLeft}>
                                    <FastImage style={styles.avatar}
                                        // source={{uri: item.product.avatarSource}}
                                    />
                                    <TextComponent>Ken</TextComponent>
                                </View>

                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 5
                        }}/>
                        <View style={[styles.viewItem]}>
                            <FastImage style={styles.imageNumColumns}
                                // source={{uri: item.product.images[0]}}
                            />
                            <View>
                                <Text style={{
                                    marginTop: 5,
                                    fontSize: 17,
                                    fontWeight: '600'
                                }}>name</Text>


                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 10,
                            marginBottom: 10
                        }}/>
                        <View style={[styles.viewHorizontal]}>
                            <TextComponent>5 sản phẩm</TextComponent>
                            <View style={{flexDirection: 'row',}}>
                                <TextComponent>Tổng Thanh Toán: </TextComponent>
                                <TextComponent
                                    style={styles.money}>2000 đ</TextComponent>
                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 10,
                            marginBottom: 10
                        }}/>
                        <View style={{ alignItems: 'center',justifyContent:'center'}}>

                            <TextComponent style={{color: colors.mediumGray, fontSize: 12, marginLeft: 10}}>Xem Thêm</TextComponent>
                        </View>

                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 10,
                            marginBottom: 10
                        }}/>
                        <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <Icon name='local-shipping' type='MaterialIcons'
                                  style={{fontSize: 20, color: colors.green,}}/>
                            <TextComponent style={{color: colors.green, fontSize: 12, marginLeft: 10}}>Đã giao hàng </TextComponent>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 10,
                            marginBottom: 10
                        }}/>
                        <View style={[styles.viewHorizontal]}>
                            <TextComponent style={{width: 200, color: colors.mediumGray}}>Nhận sản phẩm muộn nhất vào
                                ngày 30-04-2019 </TextComponent>
                            <TouchableOpacity style={styles.checkoutButtonStyle}
                            // onPress={() => {
                            //     this.checkout()}}
                            >
                            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Đánh Giá</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 10,
                            marginBottom: 10
                        }}/>
                    </Card>

                </TouchableOpacity>
            </View>
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
        width: Dimens.screen.width / 2.8,
        padding: 20,
        alignItems: 'center',
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: colors.background,
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
        fontSize: 15
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
        alignItems: 'center'
    },
    checkoutButtonStyle: {
        backgroundColor: colors.bgUser,
        padding: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 3,

    },


})


