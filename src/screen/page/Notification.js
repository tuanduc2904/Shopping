import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    Dimensions,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Text, Platform
} from 'react-native';
import {colors} from "../../assets/color";
import {Card, Icon} from "native-base";
import TextComponent from "../../Common/TextComponent/TextComponent";
import FastImage from "react-native-fast-image";

export default class Notification extends Component {
    render() {
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.container}>
                   <View style={styles.margin}>
                       <TouchableOpacity>
                           <Card style={styles.card}>
                               <View style={styles.view1}>
                                   {/*<View style={styles.bor}>*/}
                                       {/*<TextComponent style={{fontSize:18}}>2</TextComponent>*/}
                                   {/*</View>*/}
                                   <TextComponent style={styles.day}>03-04-19</TextComponent>
                                   <TextComponent style={styles.time}>9:00</TextComponent>
                               </View>
                               <View style={{height:'100%',width:1,backgroundColor:colors.background}}/>
                               <View style={{marginLeft: 10,marginBottom:10}}>
                                   <View style={{flexDirection: 'row', alignItems:'center',marginTop:10,}}>
                                       <FastImage style={styles.avatar}
                                           // source={{uri: item.product.avatarSource}}
                                       />
                                       <TextComponent style={{fontSize:12}}>Ken</TextComponent>
                                   </View>
                                  <View style={{marginTop: 10}}>
                                      <TextComponent style={{fontSize:16}}>Thong bao san pham moi</TextComponent>
                                  </View>
                               </View>
                           </Card>
                       </TouchableOpacity>
                   </View>
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
    margin:{
        marginLeft:5,
        marginRight:5
    },
    card: {
        borderRadius: 10,
        marginTop:10,
        marginBottom:10,
        flexDirection: 'row'

    },
    bor:{
        width:35,
        height:35,
        borderRadius: 35/2,
        borderWidth:1,
        borderColor:colors.red,
        alignItems:'center',
        justifyContent:'center'

    },
    day:{
        textAlign: 'center',
        marginTop:10,
        fontSize:11
    },
    view1:{
        marginTop:10,
        marginBottom:10,
        width: 80,
        alignItems:'center'
    },
    time:{
        textAlign: 'center',
        fontSize:16

    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 40 / 2,
        marginRight: 10,
        backgroundColor:colors.background

    },
})


