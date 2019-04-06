import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import TextComponent from "../../Common/TextComponent/TextComponent";
import ButtonComponent from "../../Common/ButtonComponent/ButtonComponent";
import { colors } from "../../assets/color";
import { Card, Icon } from "native-base";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ProfileCart extends Component {
    formatVND(num) {
        var value = String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        return value
    }
    render() {
        const { navigate } = this.props.navigation;
        const item = this.props.navigation.state.params.item;
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={[styles.viewItem, { backgroundColor: colors.green }]}>
                            <Icon name='library-books' type='MaterialIcons' style={[styles.icon, { color: colors.white }]} />
                            <View style={{ marginLeft: 10 }}>
                                <TextComponent style={{ fontWeight: 'bold', color: colors.white }}>Chờ thanh toán</TextComponent>
                                <TextComponent style={{ color: colors.white }}>Vui lòng chờ nhận hàng và thanh toán hàng khi nhận hàng muộn nhất vào ngày 30-04-2019</TextComponent>
                            </View>
                        </View>
                        <View style={[styles.viewItem2, { backgroundColor: colors.white }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='location-pin' type='SimpleLineIcons' style={[styles.icon, { color: colors.red }]} />
                                <View style={{ marginLeft: 10 }}>
                                    <TextComponent style={{ fontWeight: '500', color: colors.black }}>Địa chỉ nhận hàng</TextComponent>
                                    <TextComponent style={{ color: colors.black }}>Tên: {item.address.name}</TextComponent>
                                    <TextComponent style={{ color: colors.black }}>Điện thoại: {item.address.phone}</TextComponent>
                                    <TextComponent style={{ color: colors.black }}>Địa chỉ: {item.address.address}</TextComponent>
                                    <TextComponent style={{ color: colors.black }}>Ngày mua: {item.date}</TextComponent>

                                </View>

                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.background,
                                marginTop: 10,
                                marginBottom: 10
                            }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='local-shipping' type='MaterialIcons'
                                    style={{ fontSize: 25, color: colors.green, }} />
                                <View style={{ marginLeft: 10 }}>
                                    <TextComponent style={{ fontWeight: '500', color: colors.black }}>Thông tin vận chuyển</TextComponent>
                                    <TextComponent style={{ color: colors.green }}>Chờ nhận hàng</TextComponent>

                                </View>
                            </View>
                        </View>
                        <View style={[styles.viewItem2, { backgroundColor: colors.white }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Icon name='library-books' type='MaterialIcons' style={[styles.icon, { color: colors.green }]} />
                                <View style={{ marginLeft: 10 }}>
                                    <TextComponent style={{ fontWeight: '500', color: colors.black }}>Thông Tin Thanh Toán</TextComponent>
                                </View>
                            </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={{ color: colors.black }}>Tổng tiền hàng</TextComponent>
                                <TextComponent style={{ color: colors.black }}>{this.formatVND(item.totalMoney)} đ</TextComponent>
                            </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={{ color: colors.black }}>Vận chuyển</TextComponent>
                                <TextComponent style={{ color: colors.black }}>0 đ</TextComponent>
                            </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={{ color: colors.black }}>Tổng tiền </TextComponent>
                                <TextComponent style={{ color: colors.red }}>{this.formatVND(item.totalMoney)} đ</TextComponent>
                            </View>

                        </View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={item.carts}
                            renderItem={({ item }) =>
                                <View style={[styles.viewItem2, { backgroundColor: colors.white }]} >
                                    <View style={[styles.viewHorizontal, { alignItems: 'center' }]}>
                                        <View style={styles.viewHorizontalLeft}>
                                            <FastImage style={styles.avatar}
                                                source={{ uri: item.product.avatarSource }}
                                            />
                                            <TextComponent>Ken</TextComponent>
                                        </View>
                                        <TextComponent style={{ color: colors.red, fontWeight: 'bold' }}>{item.product.price * item.quantity} đ</TextComponent>
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        height: 1,
                                        backgroundColor: colors.background,
                                        marginTop: 5,
                                        marginBottom: 10
                                    }} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('Detaill', { item: item.product });
                                        }}
                                    >
                                        <View style={[styles.viewHorizontal]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <FastImage style={styles.image}
                                                    source={{ uri: item.product.images[0] }}
                                                />
                                                <TextComponent style={[styles.title, { paddingBottom: 20 }]}>{item.product.productName}</TextComponent>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <TextComponent style={{ color: colors.black }}>Số lượng: {item.quantity}</TextComponent>
                                                <TextComponent style={{ color: colors.black }}>{this.formatVND(item.product.price)} đ</TextComponent>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
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
        backgroundColor: colors.background
    },
    icon: {
        fontSize: 25,

    },
    viewItem: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    viewItem2: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,

    },
    viewHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5

    },
    viewHorizontalLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

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
    image: {
        width: 100,
        height: 100,
        margin: 5,
        backgroundColor: colors.background,
        borderRadius: 8
    },
    title: {
        fontWeight: 'bold'
    }
})


