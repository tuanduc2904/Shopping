/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Button,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TouchableOpacity, Image,
} from 'react-native';
import {Dimens} from '../../../assets/Dimens';
import {Icon} from "native-base";
import {colors} from "../../../assets/color";
import TextComponent from "../../../Common/TextComponent/TextComponent";
import {firebaseApp} from "../../../Services/firebase";
import FastImage from "react-native-fast-image";
import UpdateProfile from '../UpdateProfile/UpdateProfile'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false,
        }

    }

    getProducts(itemRef) {
        let items = [];

        this.itemRef.ref('Products').on('value', (dataSnapshot) => {

            dataSnapshot.forEach((child) => {
                items.push({
                    image: child.val().image,
                    name: child.val().name,
                    describe: child.val().describe,
                    cmt: child.val().cmt,
                    like: child.val().like,
                    money: child.val().money,
                    shopid: child.val().shopid,
                    key: child.key
                })
            })
            this.setState({
                isLoading: false,
                dataSource: items,
                refreshing: false,
            })
        })
    }

    componentDidMount() {
        this.getProducts(this.itemRef)
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.getProducts(this.itemRef)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<UpdateProfile />*/}
                <View style={styles.heard}>
                    <View style={styles.viewHorizontalLeft}>
                        <FastImage style={styles.avatar}/>
                        <View style={styles.viewAccout}>
                            <TextComponent style={styles.title}>Ken</TextComponent>
                            <TextComponent style={styles.text}>ID: 123</TextComponent>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,
    },
    height: Platform.OS === 'ios' ? 200 : 100,
    heard: {
        height: 160,
        backgroundColor: colors.bgUser,

    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    viewHorizontalLeft: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        flexDirection: 'row',
        alignItems:'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.background
    },
    viewAccout:{
        marginLeft:15,


    },
    title:{
        color:colors.white,
        fontSize:22,
        fontWeight: 'bold'
    },
    text:{
        marginTop:5,
        color:colors.white,
    }

})
