import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from "react-native-fast-image";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { colors } from "../../assets/color";
import firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation';
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listComment: [],
            comment: '',
        };
    }
    componentDidMount() {
        const item = this.props.navigation.state.params.item;
        firebase.database().ref(`products`).child(item.uid)
            .child(item.key).child(`comment`).on('value', snapshoot => {
                if (snapshoot) {
                    let listComment = [];
                    snapshoot.forEach(item => {
                        listComment.push(item.val())
                    })
                    this.setState({
                        listComment: listComment
                    })
                }
            });

    }
    postComment() {
        if (this.props.user.loggedIn) {
            if (this.state.length > 0) {
                const item = this.props.navigation.state.params.item;
                let date = new Date().toLocaleDateString("en-US");
                firebase.database().ref(`products`).child(item.uid)
                    .child(item.key).child(`comment`).push({
                        avatarSource: this.props.user.avatarSource,
                        displayName: this.props.user.displayName,
                        date: date,
                        comment: this.state.comment
                    });
                this.setState({
                    comment: '',
                })
            }

        }
        else {
            Alert.alert(
                'Bạn chưa đăng nhập',
                'Bạn có muốn quay lại màn hình đăng nhập để tiếp tục mua hàng?',
                [
                    {
                        text: 'Để sau',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => this.navigateScreen('Login') },
                ],
                { cancelable: false },
            );
        }
    }
    navigateScreen(screen) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: screen })
            ]
        });
        this.props.navigation.dispatch(resetAction);
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
                            data={this.state.listComment}
                            showsVerticalScrollIndicator={false}

                            renderItem={({ item }) =>

                                <View style={{ width: '100%' }}>
                                    <View style={styles.itemview}>
                                        <FastImage style={styles.avatar} source={{ uri: item.avatarSource }} />
                                        <View>
                                            <View style={styles.viewText}>
                                                <TextComponent style={styles.title}>{item.displayName}</TextComponent>
                                                <TextComponent style={styles.textComment}>{item.comment}</TextComponent>
                                            </View>
                                            <View style={styles.viewTime}>
                                                <TextComponent style={{ fontSize: 12, paddingLeft: 10 }}>{item.date}</TextComponent>
                                            </View>
                                        </View>

                                    </View>

                                </View>
                            }
                            extraData={this.state.metaData}
                        />
                    </ScrollView>


                    <KeyboardAvoidingView behavior="padding"
                        keyboardVerticalOffset={44}>
                        <View style={styles.footer}>
                            <TextInput
                                value={this.state.typing}
                                style={styles.input2}
                                underlineColorAndroid="transparent"
                                placeholder="Viết bình luận"
                                value={this.state.comment}
                                onChangeText={(comment) => {
                                    this.setState({ comment });
                                }}
                            />
                            <TouchableOpacity onPress={() => {
                                this.postComment();
                            }}>
                                <Text style={styles.send}>Gửi</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>

            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.Auth
    }
}
export default connect(mapStateToProps)(Comment)
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        backgroundColor: colors.white

    },
    viewText: {
        flex: 1,
        width: '100%',
        // maxWidth: '85,2%',
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
        flex: 1,
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
        fontSize: 9,
        marginRight: 10

    },
    footer: {
        flexDirection: 'row',
        backgroundColor: colors.white
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