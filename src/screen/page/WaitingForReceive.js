import React, { Component } from 'react';
import {
    StyleSheet, View, FlatList,Text
} from 'react-native';
import ItemWaitingForReceive from '../../Components/ItemWaitingForReceive'
import { colors } from "../../assets/color";
import { connect } from 'react-redux';


class WaitingForReceive extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.container}>
                {this.props.myOrdering.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.myOrdering}
                        renderItem={({ item }) =>
                            <ItemWaitingForReceive navigate={navigate} item={item} />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Chưa có đơn hàng nào</Text>
                    </View>}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        myOrdering: state.Order.myOrdering
    }
}
export default connect(mapStateToProps)(WaitingForReceive)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
})


