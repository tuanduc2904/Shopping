import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView,ScrollView} from 'react-native';
import TextComponent from "../../Common/TextComponent/TextComponent";
import ButtonComponent from "../../Common/ButtonComponent/ButtonComponent";
import {colors} from "../../assets/color";
import {Card, Icon} from "native-base";
import FastImage from "react-native-fast-image";

export default class ProfileCart extends Component {
    render() {
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={[styles.viewItem,{backgroundColor:colors.green}]}>
                            <Icon name='library-books' type='MaterialIcons' style={[styles.icon,{color:colors.white}]}/>
                            <View style={{marginLeft:10}}>
                                <TextComponent style={{fontWeight: 'bold',color:colors.white}}>Chờ thanh toán</TextComponent>
                                <TextComponent style={{color:colors.white}}>Vui lòng chờ nhận hàng và thanh toán hàng khi nhận hàng muộn nhất vào ngày 30-04-2019</TextComponent>
                            </View>
                        </View>
                        <View style={[styles.viewItem2,{backgroundColor:colors.white}]}>
                           <View style={{ flexDirection:'row'}}>
                               <Icon name='location-pin' type='SimpleLineIcons' style={[styles.icon,{color:colors.red}]}/>
                               <View style={{marginLeft:10}}>
                                   <TextComponent style={{fontWeight: '500',color:colors.black}}>Địa chỉ nhận hàng</TextComponent>
                                   <TextComponent style={{color:colors.black}}>Tên: Ken</TextComponent>
                                   <TextComponent style={{color:colors.black}}>Điện thoại: 0123456789</TextComponent>
                                   <TextComponent style={{color:colors.black}}>Địa chỉ: Ha Noi</TextComponent>
                               </View>

                           </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.background,
                                marginTop: 10,
                                marginBottom: 10
                            }}/>
                            <View style={{ flexDirection:'row',alignItems:'center'}}>
                                <Icon name='local-shipping' type='MaterialIcons'
                                      style={{fontSize: 25, color: colors.green,}}/>
                                      <View style={{marginLeft:10}}>
                                          <TextComponent style={{fontWeight: '500',color:colors.black}}>Thông tin vận chuyển</TextComponent>
                                          <TextComponent style={{color:colors.green}}>Đã lấy hàng</TextComponent>
                                          <TextComponent style={{color:colors.black,fontSize:12}}>02-04-219</TextComponent>
                                      </View>
                            </View>
                        </View>
                        <View style={[styles.viewItem2,{backgroundColor:colors.white}]}>
                            <View style={{ flexDirection:'row',alignItems:'center',marginBottom:10}}>
                                <Icon name='library-books' type='MaterialIcons' style={[styles.icon,{color:colors.green}]}/>
                                <View style={{marginLeft:10}}>
                                    <TextComponent style={{fontWeight: '500',color:colors.black}}>Thông Tin Thanh Toán</TextComponent>
                                </View>
                            </View>
                                <View style={styles.viewHorizontal}>
                                    <TextComponent style={{color:colors.black}}>Tổng tiền hàng</TextComponent>
                                    <TextComponent style={{color:colors.black}}>20000d</TextComponent>
                                </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={{color:colors.black}}>Vận chuyển</TextComponent>
                                <TextComponent style={{color:colors.black}}>20000d</TextComponent>
                            </View>
                            <View style={styles.viewHorizontal}>
                                <TextComponent style={{color:colors.black}}>Tổng tiền </TextComponent>
                                <TextComponent style={{color:colors.red}}>20000d</TextComponent>
                            </View>

                        </View>
                        <View style={[styles.viewItem2,{backgroundColor:colors.white}]}>
                            <View style={[styles.viewHorizontal,{alignItems:'center'}]}>
                                <View style={styles.viewHorizontalLeft}>
                                    <FastImage style={styles.avatar}
                                        // source={{uri: item.product.avatarSource}}
                                    />
                                    <TextComponent>Ken</TextComponent>
                                </View>
                                <TextComponent style={{color:colors.red,fontWeight:'bold'}}>20000d</TextComponent>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.background,
                                marginTop: 5,
                                marginBottom: 10
                            }}/>
                            <View style={[styles.viewHorizontal]}>
                            <View style={{ flexDirection:'row',alignItems:'center'}}>
                                <FastImage style={styles.image}
                                    // source={{uri: item.product.avatarSource}}
                                />
                                <TextComponent style={styles.title}>Giay</TextComponent>
                            </View>
                                <View style={{top:80}}>
                                    <TextComponent style={{color:colors.black}}>x1</TextComponent>
                                    <TextComponent style={{color:colors.black}}>20000d</TextComponent>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,

    },
    container: {

        flex: 1,
        backgroundColor: colors.background
    },
    icon:{
        fontSize:25,

    },
    viewItem:{
        marginBottom:10,
        paddingLeft:10,
        paddingRight:20,
        paddingBottom:10,
        paddingTop:10,
        flexDirection:'row'
    },
    viewItem2:{
        marginBottom:10,
        paddingLeft:10,
        paddingRight:20,
        paddingBottom:10,
        paddingTop:10,

    },
    viewHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:5

    },
    viewHorizontalLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderWidth: 1,
        borderColor: colors.bgUser,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: colors.background
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        backgroundColor: colors.background,
        borderRadius: 8
    },
    title:{
        fontWeight:'bold'
    }
})


