/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextComponent from "../../Common/TextComponent/TextComponent";
import TextInputComponent from "../../Common/TextInputComponent/TextInputComponent";

export default class PostProduct extends Component {

    constructor() {
        super();
        this.state = {
            image: null,
            images: null
        };
    }


    cleanupImages() {
        ImagePicker.clean().then(() => {
            console.log('removed tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
    }

    cleanupSingleImage() {
        let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
        console.log('will cleanup image', image);

        ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
            console.log(`removed tmp image ${image.uri} from tmp directory`);
        }).catch(e => {
            alert(e);
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
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            });
        }).catch(e => alert(e));
    }


    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image}/>
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
                    <View style={styles.viewTextInput}>
                        <TextInputComponent
                            placeholder='Tên Sản '
                            // value={this.state.nameShop}
                            // onChangeText={(nameShop) => this.setState({ nameShop })}
                        />
                    </View>
                    <View style={styles.viewTextInput}>
                        <TextInputComponent
                            placeholder='Giá sản phẩm'
                            value={this.state.nameShop}
                            onChangeText={(nameShop) => this.setState({nameShop})}
                        />
                    </View>
                    {this.state.image ? this.renderAsset(this.state.image) : null}
                    {this.state.images ? this.state.images.map(i => <View
                        key={i.uri}>{this.renderAsset(i)}</View>) : null}
                </ScrollView>


                <TouchableOpacity onPress={this.pickMultiple.bind(this)} >
                    <Text style={styles.text}>Them Anh</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} >
                    <Text style={styles.text}>Cleanup All Images</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} >
                    <Text style={styles.text}>Dang san pham</Text>
                </TouchableOpacity>

            </View>
            </SafeAreaView>
                );

    }
}

const styles = StyleSheet.create({
    saf:{
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        marginBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    viewTextInput: {
        marginTop: 10,
        marginBottom: 10

    }
});

