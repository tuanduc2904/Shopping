import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FastImage from "react-native-fast-image";
import TextComponent from "../Common/TextComponent/TextComponent";
import { colors } from "../assets/color";
import { Card, Icon } from "native-base";
import global from '../screen/global'
const { width } = Dimensions.get('window');



export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // console.log(this.props.products);
    }
    render() {
        return (
            <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={this.props.products}
                renderItem={({ item }) =>
                    <TouchableOpacity style={[styles.viewItem]}
                        onPress={() => {
                            global.goToDetail(item)
                        }}
                    >
                        <FastImage style={styles.imageNumColumns}
                            source={{ uri: item.images[0] }} />
                        <View style={[styles.left10, { marginBottom: 5, marginTop: 5 }]}>
                            <TextComponent style={styles.name}>{item.item}</TextComponent>
                            <TextComponent style={styles.money}>{item.price}</TextComponent>
                            <TextComponent style={styles.shopid}>{item.nameShop}</TextComponent>
                        </View>
                        <View>
                            <View style={[styles.viewHorizontal, { marginBottom: 10 }]}>
                                <Icon name='hearto' type='AntDesign'
                                    style={{ fontSize: 20, color: colors.red }} />
                                <Icon name='local-shipping' type='MaterialIcons'
                                    style={{ fontSize: 20, color: colors.red }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => index.toString()}
            />

        );
    }
}
const styles = StyleSheet.create({

    scroll: {
        flex: 1,
        backgroundColor: colors.background
    },



    card: {
        borderRadius: 8,
        margin: 5
    },

    text: {
        fontSize: 18,
        color: colors.red
    },
    image: {
        justifyContent: 'center',
        flex: 1,
        width: 100,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: colors.background,
        borderRadius: 8
    },
    imageNumColumns: {
        justifyContent: 'center',
        width: width / 2.2,
        flex: 1,
        alignItems: 'center',
        height: 150,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    viewItem: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 5,
    },


    viewHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,

    },

    left10: {
        left: 5
    },

    marginTop: {
        marginTop: 10,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    money: {
        color: colors.red
    },
})
