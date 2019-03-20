import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import ButtonComponent from '../../Common/ButtonComponent/ButtonComponent';
import TextInputComponent from '../../Common/TextInputComponent/TextInputComponent';
import { colors } from '../../assets/color';
import { connect } from 'react-redux';
import { firebaseApp } from '../../untils/firebase';
import { updateProfile } from '../../redux/actions/Authenticate';

class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameShop: ''
        }
    }

    addShopToFirebase(nameShop) {
        let user = {
            avatarSource: this.props.user.avatarSource,
            displayName: this.props.user.displayName,
            phoneNumber: this.props.user.phoneNumber,
            address: this.props.user.address,
            email: this.props.user.email,
            uid: this.props.user.uid,
            listProduct: this.props.user.listProduct,
            listOrder: this.props.user.listOrder,
            listSell: this.props.user.listSell,
            nameShop: nameShop
        };
        let uid = user.uid;
        firebaseApp.database().ref(`user`).child(uid).set({
            address: user.address,
            avatarSource: user.avatarSource,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            uid: user.uid,
            // listProduct: user.listProduct,
            // listOrder: user.listOrder,
            // listSell: user.listSell,
            nameShop: user.nameShop,
        }).then((snap) => {
            this.props.updateProfile(user);
            // console.log(this.props.user.nameShop);
            Alert.alert(
                'Mở cửa hàng thành công');
        }).catch((err) => {
            Alert.alert(
                err.message);
        })
    }

    change_alias(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
        str = str.replace(/ + /g, "");
        str = str.replace(" ", "")
        str = str.trim();
        return str;
    }

    checkForm() {
        let nameShop = this.change_alias(this.state.nameShop);
        if (nameShop.length > 3) {
            this.addShopToFirebase(nameShop);
        }
        else {
            Alert.alert('Tên shop quá ngắn');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Bạn chưa mở cửa hàng, để mở cửa hàng bạn cần nhập tên cửa hàng
                (Viết liền không dấu và ít nhất 3 ký tự).</Text>
                <Text>Lưu ý: Tên cửa hàng chỉ được tạo 1 lần và không được thay đổi</Text>
                <View style={styles.viewTextInput}>
                    <TextInputComponent
                        placeholder='Tên cửa hàng'
                        value={this.state.nameShop}
                        onChangeText={(nameShop) => this.setState({ nameShop })}
                    />
                </View>
                <ButtonComponent
                    text='Mở cửa hàng'
                    onPress={() => {
                        this.checkForm()
                    }}
                />
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.Auth,
    }
}
export default connect(mapStateToProps, { updateProfile })(AddShop);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 100
    },
    viewTextInput: {
        height: 60,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})