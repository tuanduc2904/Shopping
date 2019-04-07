/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert, TextInput, } from 'react-native';
import TextComponent from "../Common/TextComponent/TextComponent";
import TextInputComponent from "../Common/TextInputComponent/TextInputComponent";
import { colors } from "../assets/color";
import { Icon, List, ListItem, CheckBox, Body } from "native-base";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image';
import firebase from 'firebase';
import { updateMyProduct } from '../redux/actions/MyProduct'
import Loading from '../Components/Loading'
import { TextInputMask } from 'react-native-masked-text'

class EditProduct extends Component {

    static navigationOptions = ({ navigation }) => {
        if (Platform.OS === 'ios') {
            return {
                header: null
            }
        }
        else
            return {

            };
    }
    constructor() {
        super();
        this.state = {
            show: false,
            showCategories: false,
            colorBlue: false,
            colorYellow: false,
            colorBlack: false,
            colorWhite: false,
            category: 'Giày dép',
            productName: '',
            price: '',
            description: '',
            blobs: [],
            date: '',
            isLoading: false
        };

    }
    componentDidMount() {
        const item = this.props.navigation.state.params.item;
        this.setState({
            colorBlack: item.colors.colorBlack,
            colorBlue: item.colors.colorBlue,
            colorWhite: item.colors.colorWhite,
            colorYellow: item.colors.colorYellow,
            description: item.description,
            price: item.price,
            productName: item.productName
        })
    }
    upDateProduct() {
        const { key, uid } = this.props.navigation.state.params.item;

        let { productName, description, price } = this.state;

        if (productName.length < 1) {
            alert(`Chưa có tên sản phẩm`)
        }
        else if (description.length < 1) {
            alert(`Chưa có mô tả`)
        }
        else if (price.length < 3) {
            alert(`Giá sản phẩm ít nhất 3 giá trị`)
        }
        else {
            this.setState({
                isLoading: true
            })
            let product = { productName, description, price, uid, key };
            firebase.database().ref(`products`).child(uid).child(key).update(product).then(() => {
                this.setState({
                    isLoading: false
                })
                this.props.updateMyProduct(product);
                Alert.alert(
                    'Sửa sản phẩm',
                    'Sửa thành công',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.goBack() },
                    ],
                    { cancelable: false },
                );

            }).catch(err => {
                this.setState({
                    isLoading: false
                })
                alert(`Cập nhật thất bại : ` + err)
            })
        }
    }

    showColors() {
        this.setState({
            show: !this.state.show,
            showCategories: false
        })
    }

    showCategories() {
        this.setState({
            showCategories: !this.state.showCategories,
            show: false,
        })
    }
    setCategory(category) {
        this.setState({
            category,
            showCategories: false,
        })
    }

    getColors() {
        let { colorYellow, colorBlack, colorBlue, colorWhite } = this.state;
        return { colorYellow, colorBlack, colorBlue, colorWhite };
    }
    renderImage(uri) {
        return <FastImage style={styles.image} source={{ uri: uri }} />
    }

    render() {
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.container}>
                    {/* header */}
                    {Platform.OS === 'ios' ?
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row' }}
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}
                            >
                                <Icon name="ios-arrow-back" type="Ionicons"
                                    style={{ color: '#177EFB', paddingTop: 4 }}

                                />
                                <Text style={{ color: '#177EFB', fontSize: 18, paddingTop: 9, paddingLeft: 3 }}>
                                    Back</Text></TouchableOpacity>
                            <Text style={{ fontSize: 18 }}>Sửa sản phẩm</Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row' }}
                                onPress={() => {
                                    Alert.alert(
                                        'Lưu thay đổi',
                                        'Bạn có muốn lưu thay đổi này không?',
                                        [
                                            {
                                                text: 'Không',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Đồng ý', onPress: () => {
                                                    this.upDateProduct();
                                                }
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                }}

                            >
                                {/* <Icon name="save" type="AntDesign" style={{ fontSize: 22, color: '#2D8DFB' }} /> */}
                                <Text style={{ fontSize: 15, color: '#2D8DFB', paddingTop: 2 }}>HOÀN THÀNH</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                    <View style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: colors.background,
                        marginTop: 1,
                        marginBottom: 1
                    }} />
                    <View style={styles.topView}>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false}>
                            {this.props.navigation.state.params.item.images.map(i =>
                                <View
                                    key={i}>{this.renderImage(i)}</View>
                            )}

                        </ScrollView>
                        <View style={styles.bar} />
                    </View>
                    <ScrollView>
                        <View>
                            <View style={styles.viewTextInput}>
                                <TextComponent style={{ paddingLeft: 14, fontSize: 18 }}> <Icon name="rename-box" type="MaterialCommunityIcons"
                                    style={{ fontSize: 16 }} /> Tên sản phẩm:</TextComponent>
                                <TextInput
                                    placeholder='Tên Sản Phẩm '
                                    numberOfLines={2}
                                    maxLength={25}
                                    numberOfLines={2}
                                    style={styles.textInput}
                                    returnKeyType='next'
                                    value={this.state.productName}
                                    onChangeText={(productName) => this.setState({ productName })}
                                    onSubmitEditing={() => { this.refs.txtDescription.focus() }}

                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextComponent style={{ paddingLeft: 14, fontSize: 18 }}>
                                    <Icon name="description" type="MaterialIcons"
                                        style={{ fontSize: 16 }} /> Mô tả sản phẩm:</TextComponent>
                                <TextInput
                                    placeholder='Mô tả'
                                    numberOfLines={2}
                                    maxLength={100}
                                    multiline={true}
                                    style={[styles.textInput, { maxHeight: 150 }]}
                                    value={this.state.description}
                                    onChangeText={(description) => this.setState({ description })}
                                    ref={'txtDescription'}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextComponent style={{ paddingLeft: 14, fontSize: 18 }}>
                                    <Icon name="ios-pricetags" type="Ionicons"
                                        style={{ fontSize: 16 }} /> Giá sản phẩm:</TextComponent>

                                <TextInputMask
                                    style={styles.textInput}
                                    keyboardType='number-pad'
                                    type={'money'}
                                    options={{
                                        precision: 0,
                                        separator: '.',
                                        delimiter: ',',
                                        unit: 'đ ',
                                        suffixUnit: ''
                                    }}
                                    maxLength={12}
                                    ref={(ref) => this.moneyField = ref}
                                    value={this.state.price}
                                    onChangeText={() => {
                                        this.setState({
                                            price: this.moneyField.getRawValue()
                                        });
                                    }}
                                />
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.showColors()}
                                    style={[styles.button, styles.viewTextInput]}>
                                    <TextComponent style={{ fontSize: 18 }}><Icon name="ios-color-wand" type="Ionicons"
                                        style={{ fontSize: 18 }} /> Chọn Màu</TextComponent>
                                    <Icon name='color-lens' type='MaterialIcons'
                                        style={{ fontSize: 25, color: colors.red }} />
                                </TouchableOpacity>
                                {
                                    this.state.show ?
                                        <View>
                                            <ListItem
                                                onPress={() => {
                                                    this.setState({
                                                        colorBlack: !this.state.colorBlack
                                                    })
                                                }}
                                            >
                                                <CheckBox checked={this.state.colorBlack} color="red" />
                                                <Body>
                                                    <Text>Màu đen</Text>
                                                </Body>
                                            </ListItem>
                                            <ListItem
                                                onPress={() => {
                                                    this.setState({
                                                        colorBlue: !this.state.colorBlue
                                                    })
                                                }}
                                            >
                                                <CheckBox checked={this.state.colorBlue} color="red" />
                                                <Body>
                                                    <Text>Màu xanh</Text>
                                                </Body>
                                            </ListItem>
                                            <ListItem
                                                onPress={() => {
                                                    this.setState({
                                                        colorWhite: !this.state.colorWhite
                                                    })
                                                }}
                                            >
                                                <CheckBox checked={this.state.colorWhite} color="red" />
                                                <Body>
                                                    <Text>Màu trắng</Text>
                                                </Body>
                                            </ListItem>
                                            <ListItem
                                                onPress={() => {
                                                    this.setState({
                                                        colorYellow: !this.state.colorYellow
                                                    })
                                                }}
                                            >
                                                <CheckBox checked={this.state.colorYellow} color="red" />
                                                <Body>
                                                    <Text>Màu vàng</Text>
                                                </Body>
                                            </ListItem>
                                        </View>

                                        : null}

                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.showCategories()}
                                    style={[styles.button, styles.viewTextInput]}>
                                    <TextComponent style={{ fontSize: 18 }}>
                                        <Icon name="content-duplicate" type="MaterialCommunityIcons"
                                            style={{ fontSize: 16 }} /> Chọn Danh Mục</TextComponent>
                                    <TextComponent style={{ marginRight: 10 }}>{this.state.category}</TextComponent>

                                </TouchableOpacity>
                                {
                                    this.state.showCategories ?
                                        <View>
                                            <TouchableOpacity onPress={() => this.setCategory('Giày dép')}>
                                                <TextComponent style={[styles.category]}>Giày dép</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Thời trang')}>
                                                <TextComponent style={styles.category}>Thời trang</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Phụ kiện')}>
                                                <TextComponent style={styles.category}>Phụ kiện</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Đồ gia dụng')}>
                                                <TextComponent style={styles.category}>Đồ gia dụng</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Máy tính & Laptop')}>
                                                <TextComponent style={styles.category}>Máy tính & Laptop</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Trang sức')}>
                                                <TextComponent style={styles.category}>Trang sức</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Điện thoại')}>
                                                <TextComponent style={styles.category}>Điện thoại</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Đồ điện tử')}>
                                                <TextComponent style={styles.category}>Đồ điện tử</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Đồ chơi')}>
                                                <TextComponent style={styles.category}>Đồ chơi</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Sản phẩm khác')}>
                                                <TextComponent style={styles.category}>Sản phẩm khác</TextComponent>
                                            </TouchableOpacity>
                                        </View>
                                        : null}
                            </View>

                        </View>


                    </ScrollView>
                    {Platform.OS === 'ios' ? null :
                        <View style={styles.body}>
                            <ButtonComponent
                                onPress={() => {
                                    Alert.alert(
                                        'Lưu thay đổi',
                                        'Bạn có muốn lưu thay đổi này không?',
                                        [
                                            {
                                                text: 'Không',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Đồng ý', onPress: () => {
                                                    this.upDateProduct();
                                                }
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                }}
                                text='Cập nhật sản phẩm' />
                        </View>
                    }

                    {this.state.isLoading ? <Loading /> : null}
                </View>
            </SafeAreaView>

        );

    }
}

export default connect(null, { updateMyProduct })(EditProduct);
const styles = StyleSheet.create({
    saf: {
        flex: 1,
    },
    container: {
        flex: 1,

    },
    button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.bgUser,
        paddingLeft: 10,
        paddingRight: 10
    },
    textInput: {
        width: '100%',
        paddingLeft: 15,
        paddingRight: 5,
        fontSize: 18,
        color: colors.red,
        // width: Dimens.screen.width / 1.2,

        // borderColor:colors.red,
        borderBottomColor: colors.red,
        borderBottomWidth: 1,
        maxHeight: 150
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    viewTextInput: {
        marginTop: 10,
        marginBottom: 10

    },
    addImage: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderColor: colors.bgUser,
        marginLeft: 10
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 15,
        padding: 10
    },
    topView: {
        marginTop: 10,
        marginBottom: 10,
    },
    textAdd: {
        fontSize: 12,
        fontWeight: '200'
    },
    body: {
        backgroundColor: 'white',
        alignItems: 'center',
        bottom: 15
    },
    bar: {
        width: '100%',
        marginTop: 10,
        height: 1,
        backgroundColor: colors.lightGray
    },
    category: {
        marginLeft: 10,
        paddingTop: 2,
        fontSize: 18
    },
    header: {
        height: 40,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    }

});

