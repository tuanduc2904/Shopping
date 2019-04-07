import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, Image, ActivityIndicator, Platform,
    StyleSheet, SafeAreaView, Alert, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { firebaseApp } from '../untils/firebase'
import { colors } from "../assets/color";
import FastImage from "react-native-fast-image";
import { Icon } from "native-base";
import TextComponent from "../Common/TextComponent/TextComponent";
import { Dimens } from "../assets/Dimens";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import { connect } from 'react-redux';
import { updateProfile } from '../redux/actions/Authenticate'
import { TextInputMask } from 'react-native-masked-text'

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

        const sessionID = uid;
        // let uploadBlob = null;
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


                    }).then(() => {
                        setTimeout(() => {
                            this.setState({ loadingImage: false })
                        }, 3000);
                    })
                    .catch(err => {
                        this.setState({ loadingImage: false })

                    })

            }
        });
    }



    checkForm() {
        let { avatarSource, displayName, phoneNumber, address } = this.state;
        let { email, uid, listProduct, listOrder, listSell, nameShop } = this.props.user;

        if (listProduct === undefined) {
            listProduct = null
        }
        if (listOrder === undefined) {
            listOrder = null
        }
        if (listSell === undefined) {
            listSell = null
        }

        let user = {
            avatarSource: avatarSource,
            displayName: displayName,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            uid: uid,
            listProduct: listProduct,
            listOrder: listOrder,
            listSell: listSell,
            nameShop: nameShop,
        }
        if (avatarSource.length < 3) {
            Alert.alert(
                'Bạn chưa thêm ảnh đại diện');
        }
        else if (displayName.length < 4) {
            Alert.alert(
                'Họ tên quá ngắn');
        }
        else if (phoneNumber.length !== 14) {
            Alert.alert(
                'Số điện thoại sai');
        }
        else if (address.length < 4) {
            Alert.alert(
                'Sai địa chỉ');
        }
        else {
            this.addUserToFirebase(user)
        }
    }

    addUserToFirebase(user) {
        firebaseApp.database().ref(`user`).child(user.uid).set({
            avatarSource: user.avatarSource,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email,
            uid: user.uid,
            listProduct: user.listProduct,
            listOrder: user.listOrder,
            listSell: user.listSell,
            nameShop: user.nameShop
        }).then(() => {
            this.props.updateProfile(user);
            Alert.alert(
                'Thành công',
                'Cập nhật thành công',
                [
                    {
                        text: 'Ok', onPress: () => {
                            this.props.navigation.goBack();
                        }
                    },
                ],
            );
        }).catch((err) => {
            Alert.alert(
                err.message);
        })
    }

    render() {
        const { email } = this.props.user;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={'padding'}
                    style={{ flex: 1 }}
                >
                    <TouchableWithoutFeedback style={{ flex: 1 }}
                        onPress={() => { Keyboard.dismiss }}>
                        <View style={styles.container}>
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
                                    <Text style={{ fontSize: 18 }}> Thông tin tài khoản</Text>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        onPress={() => {
                                            this.checkForm();
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
                            <TouchableOpacity style={styles.heard}
                                onPress={() => {
                                    this.imagePicker()
                                }}>
                                {
                                    this.state.loadingImage ? <ActivityIndicator color="red" style={styles.avatar} size="large" /> :
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
                                <TextInput
                                    style={styles.textInput}
                                    maxLength={40}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    value={this.state.displayName}
                                    onSubmitEditing={() => { this.refs.txtAddress.focus() }}
                                    onChangeText={(displayName) => { this.setState({ displayName }) }}
                                />
                            </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={styles.text}>Địa Chỉ: </TextComponent>
                                <TextInput
                                    style={styles.textInput}
                                    maxLength={40}
                                    ref={'txtAddress'}
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    value={this.state.address}
                                    onChangeText={(address) => { this.setState({ address }) }}
                                    onSubmitEditing={() => { this.refs.txtPhoneNumber.focus() }}

                                />
                            </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={styles.text}>Phone: </TextComponent>
                                <TextInputMask
                                    type={'cel-phone'}
                                    style={styles.textInput}
                                    maxLength={14}
                                    options={{
                                        maskType: 'BRL',
                                        withDDD: true,
                                        dddMask: '(99) '
                                    }}
                                    value={this.state.phoneNumber}
                                    onChangeText={phoneNumber => {
                                        this.setState({ phoneNumber });
                                    }}
                                    // add the ref to a local var
                                    ref={(ref) => this.phoneField = ref}
                                />

                                {/* <TextInput
                                    style={styles.textInput}
                                    maxLength={10}
                                    ref={'txtPhoneNumber'}
                                    keyboardType={'phone-pad'}
                                    value={this.state.phoneNumber}
                                    onChangeText={(phoneNumber) => { this.setState({ phoneNumber }) }}
                                /> */}
                            </View>
                            <View style={{ marginLeft: 32, marginTop: 20 }}>
                                <TextComponent style={styles.text}>Email:
                    <Text style={{ fontWeight: 'bold' }}>
                                        {email}
                                    </Text>

                                </TextComponent>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                {Platform.OS === 'ios' ? null :
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
                }
            </SafeAreaView>
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
        fontSize: 18,
        color: colors.red,
        // width: Dimens.screen.width / 1.2,

        // borderColor:colors.red,
        borderBottomColor: colors.red,
        borderBottomWidth: 1,
        width: Dimens.screen.width / 1.5,
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
})
