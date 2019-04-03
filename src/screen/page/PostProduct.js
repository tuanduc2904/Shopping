/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextComponent from "../../Common/TextComponent/TextComponent";
import TextInputComponent from "../../Common/TextInputComponent/TextInputComponent";
import { colors } from "../../assets/color";
import { Icon, List, ListItem, CheckBox, Body } from "native-base";
import ButtonComponent from "../../Common/ButtonComponent/ButtonComponent";
// import * as actionCreator from '../../redux/actions';
import { addProduct, finish } from '../../redux/actions/MyProduct'
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux'

import Loading from '../../Components/Loading';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;



class PostProduct extends Component {

    constructor() {
        super();
        this.state = {
            images: null,
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
        };
    }

    addProduct() {
        let colors = this.getColors();
        let { productName, description, price, category, blobs } = this.state;

        if (productName.length < 1) {
            alert(`Chưa có tên sản phẩm`)
        }
        else if (description.length < 1) {
            alert(`Chưa có mô tả`)
        }
        else if (price.length < 3) {
            alert(`Giá sản phẩm ít nhất 3 giá trị`)
        }
        else if (blobs.length < 1) {
            alert(`Chưa chọn ảnh`)
        }
        else {
            let product = { colors, productName, description, price, category, blobs };
            let user = this.props.user;
            this.props.addProduct(product, user);
        }
    }

    imageAddBlob = (images, uid, mime = 'img/jpg') => {
        this.setState({ blobs: [] });
        images.forEach((image) => {
            new Promise((resolve, reject) => {
                const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
                const key = new Date().getTime();

                fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    }).then((blob) => {
                        this.setState({
                            blobs: this.state.blobs.concat({ blob, key })
                        })
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        })
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



    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(images => {
            this.setState({
                images: images.map(i => {
                    return { uri: i.path, width: i.width / 3, height: i.height / 3, mime: i.mime };
                })
            });
        }).then(() => {
            this.imageAddBlob(this.state.images);
        }).catch(e => { });
    }

    renderImage(image) {
        return <Image style={styles.image} source={image} />
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return null;
        }

        return this.renderImage(image);
    }

    getColors() {
        let { colorYellow, colorBlack, colorBlue, colorWhite } = this.state;
        return { colorYellow, colorBlack, colorBlue, colorWhite };
    }

    render() {
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.header}>
                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity
                                    onPress={this.pickMultiple.bind(this)}
                                    style={styles.addImage}>
                                    <Icon name='camerao' type='AntDesign'
                                        style={{ fontSize: 30, color: colors.red }} />
                                    <TextComponent style={styles.textAdd}>Thêm Ảnh</TextComponent>
                                </TouchableOpacity>
                                {this.state.images ? this.state.images.map(i =>
                                    <View
                                        key={i.uri}>{this.renderAsset(i)}</View>
                                ) : null}

                            </ScrollView>
                            <View style={styles.bar} />
                        </View>
                        <View>
                            <View style={styles.viewTextInput}>
                                <TextComponent style={{ paddingLeft: 14 }}>Tên sản phẩm:</TextComponent>
                                <TextInputComponent
                                    placeholder='Tên Sản Phẩm '
                                    numberOfLines={2}
                                    multiline={true}
                                    style={styles.textInput}
                                    value={this.state.productName}
                                    onChangeText={(productName) => this.setState({ productName })}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextComponent style={{ paddingLeft: 14 }}>Mô tả sản phẩm:</TextComponent>
                                <TextInputComponent
                                    placeholder='Mô tả'
                                    numberOfLines={2}
                                    multiline={true}
                                    style={styles.textInput}
                                    value={this.state.description}
                                    onChangeText={(description) => this.setState({ description })}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                            <TextComponent style={{ paddingLeft: 14 }}>Giá sản phẩm:</TextComponent>
                                <TextInputComponent
                                    style={styles.textInput}
                                    placeholder='Giá sản phẩm'
                                    multiline={true}
                                    value={this.state.price}
                                    keyboardType='number-pad'
                                    onChangeText={(price) => this.setState({ price })}
                                />
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.showColors()}
                                    style={[styles.button, styles.viewTextInput]}>
                                    <TextComponent>Chọn Màu</TextComponent>
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
                                    <TextComponent>Chọn Danh Mục</TextComponent>
                                    <TextComponent style={{ marginRight: 10 }}>{this.state.category}</TextComponent>

                                </TouchableOpacity>
                                {
                                    this.state.showCategories ?
                                        <View>
                                            <TouchableOpacity onPress={() => this.setCategory('Giày dép')}>
                                                <TextComponent style={[styles.category]}>Giày dép</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Quần áo')}>
                                                <TextComponent style={styles.category}>Quần áo</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setCategory('Phụ kiện')}>
                                                <TextComponent style={styles.category}>Phụ kiện</TextComponent>
                                            </TouchableOpacity>
                                        </View>
                                        : null}
                            </View>

                        </View>

                    </ScrollView>

                    <View style={styles.body}>
                        <ButtonComponent
                            onPress={() => {
                                this.addProduct();
                            }}
                            text='Đăng Sản Phẩm' />
                    </View>


                </View>
                {this.props.myProduct.isLoading ? <Loading /> : null}
                {this.props.myProduct.success ? Alert.alert(
                    'Thành công!',
                    'Đăng thành công',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.props.navigation.goBack();
                                this.props.finish();
                            }
                        },
                    ],
                ) : null}
                {this.props.myProduct.err ? Alert.alert(
                    'Thất bại',
                    'Kiểm tra lại kết nối',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.props.finish();
                            }
                        },
                    ],
                ) : null}
            </SafeAreaView>

        );

    }
}

export default connect((state) => {
    return {
        user: state.Auth,
        myProduct: state.MyProduct
    }
}, { addProduct, finish })(PostProduct);
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
        paddingRight: 5
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
    },
    header: {
        marginTop: 10,
        marginBottom: 10
    },
    textAdd: {
        fontSize: 12,
        fontWeight: '200'
    },
    body: {
        alignItems: 'center',
        position: 'absolute', left:30, right: 30, bottom: 30
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
    }

});

