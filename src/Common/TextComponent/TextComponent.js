import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from "../../assets/color";

export default class TextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text
                    onPress={this.props.onPress}
                    style={[ this.props.style]}
                    numberOfLines={this.props.numberOfLines}>{this.props.children}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
