import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { colors } from '../../assets/color';
import { connect } from 'react-redux'
import ItemWaitingForShipment from '../../Components/ItemWaitingForShipment';

class WaitingForShipment extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.mySelling}
                    renderItem={({ item }) =>
                        <ItemWaitingForShipment navigate={navigate} item={item} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        mySelling: state.Order.mySelling
    }
}
export default connect(mapStateToProps)(WaitingForShipment)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
})


