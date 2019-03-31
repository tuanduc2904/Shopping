import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const data = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Orange',
        price: 10,
        amountTaken: 3
    }, {
        id: 2,
        image: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Tomato',
        price: 5,
        amountTaken: 4
    }, {
        id: 3,
        image: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Salmon fillet',
        price: 16,
        amountTaken: 2
    }, {
        id: 4,
        image: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Greens',
        price: 3,
        amountTaken: 3
    }, {
        id: 5,
        image: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Rye Bread',
        price: 20,
        amountTaken: 1
    },
];

class Item extends Component {
    _renderItem({item, index}) {
        const {
            containerStyle,
            lastItemStyle,
            imageStyle,
            textStyle,
            counterStyle,
            priceStyle
        } = styles;

        return (
            <View style={(index + 1 === data.length) ? lastItemStyle : containerStyle}>
                <Image source={{uri: item.image}} style={imageStyle}/>

                <View style={textStyle}>
                    <Text style={{color: '#2e2f30'}}>{item.name}</Text>
                    <View style={priceStyle}>
                        <Text style={{color: '#2e2f30', fontSize: 12}}>${item.price}</Text>
                    </View>
                </View>

                <View style={counterStyle}>
                    <TouchableOpacity style={{
                        borderRadius: 15,
                        backgroundColor: '#bbb',
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
                    <Text>{item.amountTaken}</Text>
                    <TouchableOpacity style={{
                        borderRadius: 15,
                        backgroundColor: '#bbb',
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
            </View>);
    }


    render() {
        return (
            <FlatList
                data={data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }
}

const styles = {
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
        justifyContent: 'center'
    },
    priceStyle: {
        backgroundColor: '#ddd',
        width: 40,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    counterStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
};

export default Item;