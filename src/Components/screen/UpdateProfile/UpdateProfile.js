import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator, Platform, StyleSheet, SafeAreaView, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { firebaseApp } from '../../../Services/firebase'
import { colors } from "../../../assets/color";
import FastImage from "react-native-fast-image";
import { Icon } from "native-base";
import TextComponent from "../../../Common/TextComponent/TextComponent";
import TextInputComponent from "../../../Common/TextInputComponent/TextInputComponent";
import { Dimens } from "../../../assets/Dimens";
import ButtonComponent from "../../../Common/ButtonComponent/ButtonComponent";
import { connect } from 'react-redux';
import { updateProfile } from '../../../redux/actions/Authenticate'


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const uploadImage = (uri, uid, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        console.log('uri : ' + uploadUri);
        const sessionID = uid;
        let uploadBlob = null;
        const imageRef = storage.ref('avatarUser').child(`${sessionID}.jpg`);

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            }).then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


class UpdateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: this.props.user.avatarSource,
            displayName: this.props.user.displayName,
            address: this.props.user.address,
            phoneNumber: this.props.user.phoneNumber,
            loadingImage: false
        }
    }

    imagePicker() {

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                this.setState({ loadingImage: true })
                uploadImage(response.uri, this.props.user.uid)
                    .then(url => {
                        this.setState({ avatarSource: url });

                        setTimeout(() => {
                            this.setState({ loadingImage: false })
                        }, 3000);
                    })
                    .catch(err => {
                        this.setState({ loadingImage: false })

                        console.log(err)
                    })

                // const source = { uri: response.uri };

                // // You can also display the image using data:
                // // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //   avatarSource: source,
                // });


            }
        });
    }



    checkForm() {
        let { avatarSource, displayName, phoneNumber, address } = this.state;
        let { email, uid, listProduct, listOrder, listSell } = this.props.user;
        let user = {
            avatarSource: avatarSource,
            displayName: displayName,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            uid: uid,
            listProduct: listProduct,
            listOrder: listOrder,
            listSell: listSell
        }
        console.log(avatarSource + `/` + displayName + `/` + phoneNumber + `/` + address)
        if (avatarSource.length < 3) {
            Alert.alert(
                'Bạn chưa thêm ảnh đại diện');
        }
        else if (displayName.length < 4) {
            Alert.alert(
                'Họ tên quá ngắn');
        }
        else if (phoneNumber.length !== 10) {
            Alert.alert(
                'Số điện thoại sai');
        }
        else if (address.length < 4) {
            Alert.alert(
                'Sai địa chỉ');
        }
        else {
            this.adUserToFirebase(user)
        }
    }

    adUserToFirebase(user) {
        firebaseApp.database().ref(`user`).child(user.uid).set({
            avatarSource: user.avatarSource,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email,
            uid: user.uid,
            listProduct: user.listProduct,
            listOrder: user.listOrder,
            listSell: user.listSell
        }).then((user) => {
            // this.props.updateProfile(user)
            console.log(user)
            Alert.alert(
                'Cập nhật thành công');
        }).catch((err) => {
            Alert.alert(
                err.message);
        })
    }

    render() {
        const { email } = this.props.user;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.heard}
                    onPress={() => {
                        this.imagePicker()
                    }}>
                    {
                        this.state.loadingImage ? <ActivityIndicator color="red" style={styles.avatar} size="large"/> :
                            <FastImage style={styles.avatar}
                                source={{ uri: this.state.avatarSource }}
                            />
                    }

                    <View style={styles.viewIcon}>
                        <Icon name='camera' type='FontAwesome'
                            style={{ fontSize: 20, color: colors.red }} />
                    </View>
                </TouchableOpacity>
                <View style={styles.viewHorizontal}>
                    <TextComponent style={styles.text}>Họ Tên: </TextComponent>
                    <TextInputComponent
                        style={styles.textInput}
                        value={this.state.displayName}
                        onChangeText={(displayName) => { this.setState({ displayName }) }}
                    />
                </View>
                <View style={styles.viewHorizontal}>
                    <TextComponent style={styles.text}>Địa Chỉ: </TextComponent>
                    <TextInputComponent
                        style={styles.textInput}
                        value={this.state.address}
                        onChangeText={(address) => { this.setState({ address }) }}
                    />
                </View>
                <View style={styles.viewHorizontal}>
                    <TextComponent style={styles.text}>Phone: </TextComponent>
                    <TextInputComponent
                        style={styles.textInput}
                        value={this.state.phoneNumber}
                        onChangeText={(phoneNumber) => { this.setState({ phoneNumber }) }}
                    />
                </View>
                <View style={{ marginLeft: 32, marginTop: 20 }}>
                    <TextComponent style={styles.text}>Email:
                    <Text style={{ fontWeight: 'bold' }}>
                            {email}
                        </Text>

                    </TextComponent>
                </View>
                <View style={styles.buttonBottom}>
                    <ButtonComponent
                        style={styles.button}
                        styleText={styles.textButton}
                        text='Cập Nhập Thông Tin'
                        onPress={() => {
                            this.checkForm()
                        }}
                    />
                </View>
            </View>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.Auth
    }
}

export default connect(mapStateToProps, { updateProfile })(UpdateProfile)
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    heard: {
        marginTop: 15,
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: colors.bgUser,
        backgroundColor: colors.white
    },
    viewIcon: {
        // position: 'absolute',

        width: 30,
        height: 30,
        borderColor: colors.bgUser,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderRadius: 30 / 2,
        bottom: 30,
        left: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewHorizontal: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: Dimens.screen.width / 1.5
    },
    text: {
        fontSize: 18
    },
    buttonBottom: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 100
    },
    button: {
        backgroundColor: colors.bgUser
    },
    textButton: {
        color: colors.white
    }
})


{/*{*/ }
{/*(() => {*/ }
{/*switch (this.state.avatarSource) {*/ }
{/*case null:*/ }
{/*return null;*/ }
{/*case '':*/ }
{/*return <ActivityIndicator/>*/ }
{/*default:*/ }
{/*return (*/ }
{/*<View>*/ }
{/*<Image source={{uri: this.state.avatarSource}}*/ }
{/*style={{height: 300, width: 300}}/>*/ }
{/*<Text>{this.state.avatarSource}</Text>*/ }
{/*</View>*/ }
{/*)*/ }
{/*}*/ }
{/*})()*/ }
{/*}*/ }
{/*<TouchableOpacity*/ }
{/*onPress={() => {*/ }
{/*this.imagePicker();*/ }
{/*}}*/ }
{/*>*/ }

{/*<Text>showImagePicker</Text>*/ }
{/*</TouchableOpacity>*/ }