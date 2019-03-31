import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';
import FastImage from "react-native-fast-image";

class OrderSummary extends Component {

    render() {
        const { item } = this.props;
            return (
        <View style={styles.container}>
            
            <View style={styles.productDes}>
                <FastImage source={item.picture} style={{width:60,height:60}}/>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>${(item.cost).toFixed(2)}</Text>
            </View>
        </View>
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
        margin: 5,
    },
    text: {
        fontSize: 14,
        margin: 5,
        width: 220
    }
});

export default OrderSummary;
