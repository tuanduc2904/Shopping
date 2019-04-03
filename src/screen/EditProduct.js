/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
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

class EditProduct extends Component {

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
                alert(`Cập nhật thành công`);

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
                    <View style={styles.header}>
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
                                <TextComponent style={{ paddingLeft: 14 }}>Mô tả:</TextComponent>
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
                                this.upDateProduct();
                            }}
                            text='Cập nhật sản phẩm' />
                    </View>
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
        padding: 10
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
        position: 'absolute', left: 30, right: 30, bottom: 25
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

