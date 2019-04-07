import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { colors } from "../assets/color";
import TextComponent from "../Common/TextComponent/TextComponent";
import FastImage from "react-native-fast-image";
import Loading from '../Components/Loading';
import { Toast, Icon } from 'native-base';
import { addProductToCart } from '../redux/actions/Cart'
import { Dimens } from "../assets/Dimens";
const { width } = Dimensions.get('window');




class ListCategory extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listProduct: [],
        }
    }

    componentDidMount() {
        let category = this.props.navigation.state.params.title;
        console.log(category);
        console.log(this.props.data);
        let data = this.props.data;
        let listProduct = data.filter(e => {
            return e.category === category;

        })
        this.setState({
            listProduct,
            isLoading: false
        })



    }
    formatVND(num) {
        var value = String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        return value
    }

    render() {

        return (

            <View style={styles.container}>

                {
                    this.state.listProduct.length > 0 ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.listProduct}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('Detaill', { item: item })
                                    }}
                                    style={[styles.viewItem]}>

                                    <FastImage style={styles.imageNumColumns}
                                        source={{ uri: item.images[0] }} />
                                    <View style={[styles.left10, { marginBottom: 5, marginTop: 5 }]}>
                                        <TextComponent style={styles.name}>{item.productName}</TextComponent>
                                        <TextComponent style={styles.money}>{this.formatVND(item.price)} đ</TextComponent>
                                        <TextComponent style={styles.shopid}>{item.nameShop}</TextComponent>
                                    </View>
                                    <View>
                                        <View style={[styles.viewHorizontal, { marginBottom: 10 }]}>
                                            <Icon name='hearto' type='AntDesign'
                                                style={{ fontSize: 20, color: colors.red }} />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.props.addProductToCart(item);
                                                    Toast.show({
                                                        text: "Sản phẩm đã được thêm vào giỏ hàng",
                                                        position: "bottom",
                                                        type: "success"
                                                    })
                                                }}
                                            >
                                                <Icon name='shoppingcart' type='AntDesign'
                                                    style={{ fontSize: 25, color: colors.red, paddingLeft: 10 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()
                            }
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            numColumns={2}
                        />
                        :
                        < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Không có sản phẩm nào</Text>
                        </View>
                }

                {this.state.isLoading ? <Loading /> : null}
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.Products.defaultProducts
    }
}

export default connect(mapStateToProps, { addProductToCart })(ListCategory);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colors.background
    },
    bar: {
        width: 4,
        height: 20,
        backgroundColor: colors.red,
        marginRight: 5
    },
    card: {
        borderRadius: 8,
        margin: 5
    },
    viewHorizontalLeft: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    bg: {
        width: Dimens.screen.width,
        height: Dimens.screen.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        marginTop: 50,
        marginBottom: 60
    },
    viewTextInput: {
        height: 60
    },
    btnSignIn: {
        marginTop: 30
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 60
    },
    text: {
        fontSize: 18,
        color: colors.red
    },
    image: {
        justifyContent: 'center',
        flex: 1,
        width: 100,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: colors.background,
        borderRadius: 8
    },
    imageNumColumns: {

        // backgroundColor: colors.background,
        // borderRadius: 8
        justifyContent: 'center',
        width: width / 2.2,
        flex: 1,
        alignItems: 'center',
        height: 150,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    viewItem: {
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 5,
    },
    //View Pager
    scrollContainer: {

        flex: 1,
        backgroundColor: colors.background
    },
    sliderContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 160,
        alignSelf: 'center'
    },
    sliderBtn: {
        height: 13,
        width: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    sliderBtnSelected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    sliderBtnContainer: {
        flexDirection: 'row', marginBottom: 24
    },
    viewPager: {
        marginTop: 10,
        marginBottom: 10
    },
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.red
    },
    left10: {
        left: 5
    },
    textItemRight: {
        color: colors.red
    },
    marginTop: {
        marginTop: 10,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    money: {
        color: colors.red
    },
    shopid: {}
})