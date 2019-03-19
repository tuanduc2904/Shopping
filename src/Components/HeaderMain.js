import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon, Item,Input } from "native-base";
import { colors } from '../assets/color'


export default class HeaderMain extends Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.viewHorizontal}>
                    {/* <Icon name='search1' type='AntDesign' style={{ fontSize: 30, color: colors.red }} /> */}
                    <Item>
                        <Icon name="ios-search"  />
                        <Input placeholder="Search" style={{color: colors.red}}/>
                        <Icon name="ios-notifications-outline" style={{color: colors.red}}/>
                    </Item>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        top: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#ffffffcc'
    },
    viewHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,

    },

})