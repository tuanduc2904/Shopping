import React, { Component } from 'react';
import {
    StyleSheet,
    View, FlatList
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
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.myOrdering}
                    renderItem={({ item }) =>
                        <ItemWaitingForReceive navigate={navigate} item={item} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
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


