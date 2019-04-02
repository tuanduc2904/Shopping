import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { colors } from "../assets/color";
import { Icon, Container, Header, Content, Tab, Tabs, TabHeading } from "native-base";
import WaitingForShipment from "./page/WaitingForShipment";
import WaitingForReceive from "./page/WaitingForReceive";
import TextComponent from "../Common/TextComponent/TextComponent";
import { getOrder, getSell } from '../redux/actions/Order';
import { connect } from 'react-redux';
import Loading from '../Components/Loading';
class ManageOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'WaitingForShipment',
            user: {}
        }
    }
    componentDidMount() {
        this.props.getOrder();
        this.props.getSell()
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            < Container >
                {this.props.isLoading ? <Loading /> : null}
                <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.red, height: 2 }}>
                    <Tab
                        heading={<TabHeading style={{ backgroundColor: colors.white }}><TextComponent >Chờ Nhận Hàng</TextComponent></TabHeading>}>
                        <WaitingForReceive navigate={navigate} />
                    </Tab>
                    <Tab
                        heading={<TabHeading style={{ backgroundColor: colors.white }}><TextComponent >Chờ Chuyển Hàng</TextComponent></TabHeading>}>
                        <WaitingForShipment navigate={navigate} />
                    </Tab>
                </Tabs>
            </Container >
        );
    }
}


export default connect(
    (state) => {
        return {
            isLoading: state.Order.isLoading
        }
    },
    { getOrder, getSell })(ManageOrder)