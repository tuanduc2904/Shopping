import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {colors} from "../../assets/color";
import {Icon} from "native-base";
import FastImage from "react-native-fast-image";
import TextComponent from "../../Common/TextComponent/TextComponent";
import ButtonComponent from "../../Common/ButtonComponent/ButtonComponent";

export class Detaill extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <Icon name='left' type='AntDesign' style={{fontSize: 25, color: colors.red}}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <ScrollView>
                        <FastImage style={styles.image}
                                   source={{uri: item.images[0]}}
                        />
                        <View style={{backgroundColor: colors.white, marginBottom: 10}}>
                            <View style={styles.horizontall}>
                                <TextComponent style={styles.name}>{item.productName}</TextComponent>
                                <TextComponent style={styles.money}>{item.price} đ</TextComponent>
                            </View>

                            <View style={styles.viewAvatar}>
                                <FastImage style={styles.avatar}
                                           source={{uri: item.images[0]}}
                                />
                                <TextComponent style={styles.shopid}>{item.nameShop}</TextComponent>
                            </View>
                            <View style={{
                                marginLeft: 10,
                                marginRight: 10,
                            }}>
                                <TextComponent style={styles.infoTitle}>Mô tả sản phẩm</TextComponent>
                                <TextComponent> san pham ....</TextComponent>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Comment');
                            }}
                            style={{backgroundColor: colors.white, marginBottom: 10}}>
                            <View style={[styles.horizontall,{marginBottom:10}]}>
                                <View
                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 30, color: colors.yellow}}/>
                                    <TextComponent style={styles.danhgia}>Đánh Giá Sản Phẩm</TextComponent>
                                </View>
                                <TouchableOpacity>
                                    <TextComponent style={{fontSize:12,color:colors.red}}>Xem Thêm >></TextComponent>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewAvatar}>
                                <FastImage style={styles.avatar}
                                           source={{uri: item.images[0]}}
                                />
                                <View>
                                    <TextComponent style={styles.shopid}>{item.nameShop}</TextComponent>
                                    <TextComponent> San pham rat tot</TextComponent>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                    <View style={styles.footer}>
                        <ButtonComponent
                        text='Thêm Vào Giỏ Hàng'
                        styleText={{color:colors.white,fontWeight:'bold'}}
                        style={{backgroundColor:colors.red}}/>
                    </View>
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
    header: {
        height: 50,
        backgroundColor: '#ffffff47',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    backButton: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        left: 10
    },
    image: {
        width: '100%',
        height: 250
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 250,
    },
    money: {
        color: colors.red,
        fontWeight: 'bold'
    },
    horizontall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderWidth: 1,
        borderColor: colors.red
    },
    viewAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    shopid: {
        marginLeft: 5,
        fontWeight: 'bold'
    },
    infoTitle: {
        fontWeight: 'bold',
        color: colors.red,
        fontSize: 15,

    },
    danhgia: {
        fontWeight: 'bold',
        color: colors.red,
        fontSize: 16,
    },
    footer:{
        position: 'absolute',
        bottom:10,
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    }
})

export default Detaill