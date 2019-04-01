import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';

import {colors} from "../../assets/color";
import {Icon} from "native-base";
export default class Receive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            user: {}
        }
    }
    render() {
        return (
            <View>

                <Text>fef</Text>
            </View>
        );
    }
}


