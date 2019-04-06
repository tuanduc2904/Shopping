import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { colors } from "../assets/color";
import { Icon, Toast, Root } from "native-base";
import FastImage from "react-native-fast-image";
import TextComponent from "../Common/TextComponent/TextComponent";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import { addProductToCart } from '../redux/actions/Cart'
import firebase from 'firebase';
import Loading from '../Components/Loading'
const { width } = Dimensions.get('window');
const height = width * 0.5;

class Detaill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            item: {},
            sliderIndex: 0,
            maxSlider: 3,
        };
    }

    componentDidMount() {
        const item = this.props.navigation.state.params.item;
        firebase.database().ref(`products`).child(item.uid)
            .child(item.key).on('value', snapshoot => {
                if (snapshoot.val()) {
                    let obj = snapshoot.val();
                    obj.key = snapshoot.key
                    this.setState({
                        item: obj,
                        maxSlider: snapshoot.val().images.length
                    });

                    setTimeout(() => {
                        this.setState({
                            isLoading: false
                        })
                    }, 100);
                }
            });

    }
    formatVND(num) {
        var value = String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        return value
    }
    setRef = (c) => {
        this.listRef = c;
    }

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={styles.saf}>

                <View style={styles.container}>
                    <ScrollView>
                        <FlatList
                            ref={this.setRef}
                            data={this.state.item.images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, i }) =>
                                (
                                    <View key={i} style={{ height, width }}>
                                        <FastImage style={{ height, width }} source={{ uri: item }} />
                                    </View>
                                )}
                            onMomentumScrollEnd={(event) => {
                                let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x / width : 0
                                this.setState({ sliderIndex })
                            }}
                        />

                        <View style={{ backgroundColor: colors.white, marginBottom: 10 }}>
                            <View style={styles.horizontall}>
                                <TextComponent style={styles.name}>{this.state.item.productName}</TextComponent>
                                <TextComponent style={styles.money}>Giá:  {this.formatVND(this.state.item.price)} đ</TextComponent>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.background,
                                marginTop: 1,
                                marginBottom: 1
                            }} />
                            <View style={styles.viewAvatar}>
                                <FastImage style={styles.avatar}
                                    source={{ uri: this.state.item.avatarSource }}
                                />
                                <TextComponent style={styles.shopid}>{this.state.item.nameShop}</TextComponent>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.background,
                                marginTop: 1,
                                marginBottom: 1
                            }} />
                            <View style={{
                                marginLeft: 10,
                                marginRight: 10,
                            }}>
                                <TextComponent style={styles.infoTitle}>Mô tả sản phẩm</TextComponent>

                                <TextComponent style={{ paddingBottom: 30, paddingTop: 15 }}>{this.state.item.description}</TextComponent>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.background,
                                marginTop: 1,
                                marginBottom: 1
                            }} />
                            <View style={{
                                marginLeft: 10,
                                marginRight: 10,
                            }}>
                                <TextComponent style={{ paddingBottom: 30, paddingTop: 15 }}>Ngày đăng: {this.state.item.date}</TextComponent>
                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: colors.background,
                            marginTop: 1,
                            marginBottom: 1
                        }} />
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Comment', { item: this.state.item });
                            }}
                            style={{ backgroundColor: colors.white, marginBottom: 10 }}>
                            <View style={[styles.horizontall, { marginBottom: 10 }]}>
                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='star' type='AntDesign' style={{ fontSize: 30, color: colors.yellow }} />
                                    <TextComponent style={styles.danhgia}>Đánh Giá Sản Phẩm</TextComponent>
                                </View>
                                <TouchableOpacity>
                                    {/* <TextComponent style={{ fontSize: 12, color: colors.red }}>Xem Thêm >></TextComponent> */}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewAvatar}>
                                <FastImage style={styles.avatar}
                                    source={{ uri: this.state.item.avatarSource }}
                                />
                                <View>
                                    <TextComponent style={styles.shopid}>{this.state.item.nameShop}</TextComponent>
                                    <TextComponent> San pham rat tot</TextComponent>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
                <View style={styles.footer}>
                    <ButtonComponent
                        text='Thêm Vào Giỏ Hàng'
                        styleText={{ color: colors.white, fontWeight: 'bold' }}
                        style={{ backgroundColor: colors.red, marginTop: 10 }}
                        onPress={() => {
                            this.props.addProductToCart(this.state.item);
                            Toast.show({
                                text: "Sản phẩm đã được thêm vào giỏ hàng",
                                position: "bottom",
                                type: "success"
                            })
                        }}
                    />
                </View>
                {this.state.isLoading ? <Loading /> : null}
            </SafeAreaView>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        carts: state.Cart.carts
    }
}

export default connect(mapStateToProps, { addProductToCart })(Detaill);

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
        fontWeight: 'bold',
        padding: 10,
        marginRight: 10
    },
    horizontall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        paddingTop: 10,

    },
    danhgia: {
        fontWeight: 'bold',
        color: colors.red,
        fontSize: 16,
    },
    footer: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
})

