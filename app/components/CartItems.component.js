import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert, Image
} from 'react-native';

import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {colors} from "../assets/color";
import { removeItem } from '../redux/actions/cartActions';
import Icon from 'react-native-vector-icons/Ionicons';
class CartItems extends Component {

    state = {
        activeRowKey: null
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => { this.setState({activeRowKey: null})},
            onOpen: (secId, rowId, direction) => { this.setState({activeRowKey: this.props.item.id})},
            right: [
                {
                    onPress: () => {
                        const deleteRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                            {text: 'No', onPress:() => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress:() => { this.props.removeItem({index: this.props.index, item: this.props.item})}},
                            ],
                            { cancelable: true}
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        const { item, index } = this.props;
        return (
            <Swipeout {...swipeSettings}>
                <View style={[styles.containerStyle,styles.lastItemStyle]}>
                    
                    {/*<View style={styles.productDes}>*/}
                        {/*<Image source={item.picture} style={{width:80,height:80}}/>*/}
                        {/*<Text style={styles.textName}>{item.title}</Text>*/}
                        {/*<Text style={styles.text}>${(item.cost).toFixed(2)}</Text>*/}
                    {/*</View>*/}

                        <Image source={item.picture} style={{width:80,height:80}}/>

                        <View style={styles.textStyle}>
                            <Text style={{fontSize:16,width:160,}}>{item.title}</Text>
                            <View style={styles.priceStyle}>
                                <Text style={{ fontSize: 14,color:colors.red}}>{item.cost} đ</Text>
                            </View>
                        </View>

                        <View style={styles.counterStyle}>
                            <TouchableOpacity style={{
                                borderRadius: 15,
                                backgroundColor: colors.red,
                                height: 30,
                                width: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon
                                    name="ios-remove"
                                    size={25}
                                    color='#fff'
                                    backgroundColor='#fff'

                                    iconStyle={{marginRight: 0}}
                                />
                            </TouchableOpacity>
                            <Text>1</Text>
                            <TouchableOpacity style={{
                                borderRadius: 15,
                                backgroundColor: colors.red,
                                height: 30, width: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon
                                    name="ios-add"
                                    size={25}
                                    color='#fff'
                                    backgroundColor='#fff'

                                    iconStyle={{marginRight: 0}}
                                />
                            </TouchableOpacity>

                        </View>

                </View>
            </Swipeout>
    );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    textName:{

    },
    text: {
        fontSize: 14,
        padding: 10
    },
    containerStyle: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#e2e2e2',
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#fff'
    },
    lastItemStyle: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginRight: 20
    },
    textStyle: {
        flex: 2,
        marginLeft: 5,
        justifyContent: 'center'
    },
    priceStyle: {
        width: 120,
        marginTop: 3,
        borderRadius: 3
    },
    counterStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default connect(null,{removeItem})(CartItems);
