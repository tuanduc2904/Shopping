import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    Dimensions,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Text, Platform
} from 'react-native';
import { colors } from "../assets/color";
import { Dimens } from "../assets/Dimens";
import { Card } from "native-base";
const { width } = Dimensions.get('window');
import FastImage from "react-native-fast-image";
import TextComponent from "../Common/TextComponent/TextComponent";
import { connect } from 'react-redux'

class Category extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props;
        return (
            <Card style={[styles.card, styles.marginTop]}>
                <View style={[styles.viewHorizontal, styles.marginTop]}>
                    <View style={styles.viewHorizontalLeft}>
                        <View style={styles.bar} />
                        <Text style={[styles.title]}>Danh Mục</Text>
                    </View>
                    <View>
                    </View>
                </View>
                <ScrollView
                    horizontal>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 6 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Thời trang' });
                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_ao.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Thời trang</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Trang sức' });
                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_dongho.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Trang sức</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 6 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Đồ gia dụng' });
                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_giadung.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Đồ gia dụng</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Giày dép' });
                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_giay.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Giày dép</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 6 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Máy tính & Laptop' });
                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_laptop.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Máy tính & Laptop</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Điện thoại' });
                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_phone.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Điện thoại</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 6 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Phụ kiện' });

                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_phukien.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Phụ kiện</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Đồ điện tử' });

                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_tv.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Đồ điện tử</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 6 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Đồ chơi' });

                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_dochoi.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Đồ chơi</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ListCategory', { title: 'Sản phẩm khác' });

                            }}>
                            <View style={styles.left10}>
                                <FastImage style={styles.image}
                                    source={require('../assets/images/ic_category/ic_khac.jpg')} />
                                <View style={[styles.left10, { marginBottom: 5 }]}>
                                    <TextComponent style={styles.name}>Sản phẩm khác</TextComponent>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Card>
        );
    }
}

export default Category;
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,

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
    },
    image: {
        justifyContent: 'center',
        flex: 1,
        width: 70,
        alignItems: 'center',
        height: 70,
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
    //View Pager
    scrollContainer: {

        flex: 1,
        backgroundColor: colors.background
    },
    sliderContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 160,
        alignSelf: 'center'
    },
    sliderBtn: {
        height: 13,
        width: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    sliderBtnSelected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    sliderBtnContainer: {
        flexDirection: 'row', marginBottom: 24
    },
    viewPager: {
        marginTop: 10,
        marginBottom: 10
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    textItemRight: {
        color: colors.red
    },
    marginTop: {
        marginTop: 10,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    money: {
        color: colors.red
    },
    shopid: {}

})