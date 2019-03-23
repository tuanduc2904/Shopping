/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextComponent from "../../Common/TextComponent/TextComponent";
import TextInputComponent from "../../Common/TextInputComponent/TextInputComponent";
import { colors } from "../../assets/color";
import { Icon, List, ListItem, CheckBox, Body } from "native-base";
import ButtonComponent from "../../Common/ButtonComponent/ButtonComponent";

export default class PostProduct extends Component {

    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
            show: false,
            show2: false,
            colorBlue: false,
            colorYellow: false,
            colorBlack: false,
            colorWhite: false
        };
    }


    showview() {
        this.setState({
            show: !this.state.show,
            show2: false
        })
    }

    resetview() {
        this.setState({
            show: false,

        })
    }
    showview2() {
        this.setState({
            show2: !this.state.show2,
            show: false,
        })
    }
    resetview2() {
        this.setState({

            show2: false,
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
                image: null,
                images: images.map(i => {
                    console.log('received image', i);
                    return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
                })
            });
        }).catch(e => alert(e));
    }


    renderImage(image) {
        return <Image style={styles.image} source={image} />
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
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
                                {this.state.image ? this.renderAsset(this.state.image) : null}
                                {this.state.images ? this.state.images.map(i => <View
                                    key={i.uri}>{this.renderAsset(i)}</View>) : null}

                            </ScrollView>
                            <View style={styles.bar} />
                        </View>
                        <View>
                            <View style={styles.viewTextInput}>
                                <TextInputComponent
                                    placeholder='Tên Sản '
                                    numberOfLines={2}
                                    multiline={true}
                                    style={styles.textInput}
                                // value={this.state.nameShop}
                                // onChangeText={(nameShop) => this.setState({ nameShop })}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextInputComponent
                                    style={styles.textInput}
                                    placeholder='Giá sản phẩm'
                                    multiline={true}
                                    value={this.state.nameShop}
                                    keyboardType='number-pad'
                                    onChangeText={(nameShop) => this.setState({ nameShop })}
                                />
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.showview()}
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
                                                <CheckBox checked={this.state.colorBlack} color="red"/>
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
                                                <CheckBox checked={this.state.colorBlue} color="red"/>
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
                                                <CheckBox checked={this.state.colorWhite} color="red"/>
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
                                                <CheckBox checked={this.state.colorYellow} color="red"/>
                                                <Body>
                                                    <Text>Màu màu vàng</Text>
                                                </Body>
                                            </ListItem>
                                        </View>

                                        : null}
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.showview2()}
                                    style={[styles.button, styles.viewTextInput]}>
                                    <TextComponent>Chọn Danh Mục</TextComponent>
                                    <Icon name='color-lens' type='MaterialIcons'
                                        style={{ fontSize: 25, color: colors.red }} />
                                </TouchableOpacity>
                                {
                                    this.state.show2 ?
                                        <View>
                                            <TouchableOpacity onPress={() => this.resetview2()}>
                                                <TextComponent style={[styles.text]}>White</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.resetview2()}>
                                                <TextComponent style={styles.text}>Black</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.resetview2()}>
                                                <TextComponent style={styles.text}>Red</TextComponent>
                                            </TouchableOpacity>
                                        </View>

                                        : null}
                            </View>

                        </View>

                    </ScrollView>

                    <View style={styles.body}>
                        <ButtonComponent

                            text='Đăng Sản Phẩm' />
                    </View>


                </View>
            </SafeAreaView>
        );

    }
}

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
        alignItems: 'center'
    },
    bar: {
        width: '100%',
        marginTop: 10,
        height: 1,
        backgroundColor: colors.lightGray
    },

});

