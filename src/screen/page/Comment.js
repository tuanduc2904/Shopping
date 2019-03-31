import React, { Component } from 'react';
import {  StyleSheet,
    View,
    TextInput,
    Button,
    ScrollView,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    NativeModules,
    StatusBarIOS,
    Modal } from 'react-native';
import {Icon,Spinner} from 'native-base';
import { connect } from 'react-redux';
import FastImage from "react-native-fast-image";
import TextComponent from "../../Common/TextComponent/TextComponent";
import {colors} from "../../assets/color";

export  class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceListCommnet: [
                { id: 1,
                    avatar: 'https://png.pngtree.com/thumb_back/fh260/back_pic/00/15/30/4656e81f6dc57c5.jpg',
                name:'ken',
                    content:'Hihi'},
                {
                    id: 2,
                    avatar: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                , name:'ken'},
                {
                    id: 3,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhcSnO3gsJmdH3kQX_2uJ9dMoG447FVNEwhuDh9dZDt0LQX07h'
                , name:'ken'},
                {
                    id: 4,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhcSnO3gsJmdH3kQX_2uJ9dMoG447FVNEwhuDh9dZDt0LQX07h'
                , name:'ken'},
            ],
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.saf}>
                <View style={styles.container}>
                    <ScrollView
                        keyboardDismissMode="interactive"
                    >
                        <FlatList
                            // inverted
                            data={this.state.dataSourceListCommnet}
                            showsVerticalScrollIndicator={false}

                            renderItem={({item}) =>
                                <View>
                                    <View style={styles.itemview}>
                                        <FastImage style={styles.avatar} source={{uri: item.avatar}}/>
                                        <View>
                                            <View style={styles.viewText}>
                                                <TextComponent style={styles.title}>{item.name}</TextComponent>
                                                <TextComponent style={styles.textComment}>{item.content}</TextComponent>
                                            </View>
                                            <View style={styles.viewTime}>
                                                <TextComponent>{item.created_date}</TextComponent>


                                            </View>
                                        </View>

                                    </View>

                                </View>
                            }
                            extraData={this.state.metaData}
                        />
                    </ScrollView>


                    <KeyboardAvoidingView behavior="padding"
                                          keyboardVerticalOffset={44 + this.state.statusBarHeight}>
                        <View style={styles.footer}>
                            <TextInput
                                value={this.state.typing}
                                style={styles.input2}
                                underlineColorAndroid="transparent"
                                placeholder="Type something nice"
                                // onChangeText={(content) => {
                                //     this.setState({content});
                                // }}
                                // value={this.state.content}
                            />
                            <TouchableOpacity onPress={() => {
                                // this.getComment(), this.remove(),this.load()
                            }}>
                                <Text style={styles.send}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        backgroundColor: colors.white

    },
    key: {
        backgroundColor: colors.white
    },
    viewText: {
        maxWidth: '85,2%',
        marginLeft: 10,
        paddingLeft: 10,
        marginBottom: 5,
        borderRadius: 15,
        paddingRight: 5,
        backgroundColor: colors.background,

    },


    textInputView: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    textInput: {
        flexGrow: 1,
        borderRadius: 10,
        backgroundColor: colors.black,
        padding: 10,
        fontSize: 16,
        marginRight: 10,
        textAlignVertical: 'top'
    },
    // textInput: {
    //     flexGrow: 1,
    //     borderRadius: 15,
    //     paddingLeft: 10,
    //     fontSize: 16,
    //     marginRight: 5,
    //     textAlignVertical: 'top',
    //     backgroundColor: '$TextInput'
    // },
    headerMagin: {
        marginLeft: 5,
        marginRight: 5,
    },
    back: {
        fontSize: 23,

    },
    viewHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: colors.iOSBlue,
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 10
    },
    viewBottom: {
        justifyContent: 'center',
        backgroundColor: colors.white

    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        justifyContent: 'center',
        borderColor: '#d7dade',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    textAreaContainer: {
        marginTop: 10,
        marginLeft: 10,
        flex: 1,
        paddingLeft: 10,
        width: 100,
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 20,
        paddingRight: 10,
        borderColor: '#d7dade',
        justifyContent: 'center',
    },

    // textInput: {
    //     paddingBottom: 10,
    //     paddingTop: 10,
    //     justifyContent: "flex-start",
    //     color: '$textColor'
    //
    // },
    text: {
        padding: 10,
        color: 'white',
    },
    textBubbleBackground: {
        backgroundColor: '#2f7bf6',
        borderRadius: 20,
        width: 110,
        margin: 20,
    },
    itemview: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 5,
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderWidth: 1,
        borderColor: colors.red,
        backgroundColor: colors.white

    },

    title: {
        fontWeight: 'bold',
        marginTop: 5,
        color: colors.black
    },
    textComment: {
        marginBottom: 5,
        color: colors.black
    },
    viewTime: {
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor:colors.white
    },
    input2: {
        paddingHorizontal: 20,
        fontSize: 18,
        flex: 1
    },
    send: {
        alignSelf: 'center',
        color: 'lightseagreen',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#ffffff80',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
export default Comment