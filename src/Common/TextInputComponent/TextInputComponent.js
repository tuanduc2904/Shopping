import React, {Component} from 'react';
import {View, Text, StyleSheet,TextInput} from 'react-native';
import {colors} from "../../assets/color";
import {Dimens} from "../../assets/Dimens";
export default class TextInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    style={[styles.text,this.props.style]}
                    underlineColorAndroid="transparent"
                    secureTextEntry = {this.props.secureTextEntry}
                    numberOfLines={this.props.numberOfLines}
                    keyboardType={this.props.keyboardType}
                    multiline={this.props.multiline}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize:18,
        color:colors.red,
        width: Dimens.screen.width / 1.2,

        // borderColor:colors.red,
        borderBottomColor:colors.red,
        borderBottomWidth:1
    }
});
