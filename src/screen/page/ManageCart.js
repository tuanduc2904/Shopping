import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {colors} from "../../assets/color";
import {Icon,Container, Header, Content, Tab, Tabs,TabHeading} from "native-base";
import WaitingForShipment from "./WaitingForShipment";
import Moving from "./Moving";
import Receive from "./Receive";
import TextComponent from "../../Common/TextComponent/TextComponent";

export default class ManageCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'WaitingForShipment',
            user: {}
        }
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <Container>
                <Tabs tabBarUnderlineStyle={{backgroundColor:colors.red,height:2}}>
                    <Tab
                        heading={ <TabHeading style={{backgroundColor:colors.white}}><TextComponent >Chờ Chuyển </TextComponent></TabHeading>}>
                        <WaitingForShipment navigate={navigate}/>
                    </Tab>
                    <Tab
                        heading={ <TabHeading style={{backgroundColor:colors.white}}><TextComponent >Đang Giao</TextComponent></TabHeading>}>
                        <Moving navigate={navigate}/>
                    </Tab>
                    <Tab
                        heading={ <TabHeading style={{backgroundColor:colors.white}}><TextComponent >Đã Nhận</TextComponent></TabHeading>}>

                        <Receive navigate={navigate}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}


