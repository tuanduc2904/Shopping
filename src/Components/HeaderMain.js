import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import { Icon, Item, Input } from "native-base";
import { colors } from '../assets/color';
import { searchProductName } from '../redux/actions/Product';
import { connect } from 'react-redux';
import global from '../screen/global'


class HeaderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.header}>
                <View style={styles.viewHorizontal}>
                    {/* <Icon name='search1' type='AntDesign' style={{ fontSize: 30, color: colors.red }} /> */}
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search"
                            clearButtonMode='always'
                            onChangeText={(text) => {
                                this.props.searchProductName(text);
                                global.selectedTabSearch();
                                this.setState({ text })
                            }}
                            style={{ color: colors.red, width: 200 }} />
                        <TouchableOpacity onPress={() => {
                            navigate('Notification');
                        }}>
                            <Icon name="notifications" type='MaterialIcons' style={{ color: colors.red }} />
                        </TouchableOpacity>
                    </Item>
                </View>
            </View>
        )
    }
}
export default connect(null, { searchProductName })(HeaderMain)
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