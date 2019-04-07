import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    Dimensions,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Text, Platform
} from 'react-native';
import { colors } from "../../assets/color";
import { Dimens } from "../../assets/Dimens";
import { Icon, Card, Toast, Root } from "native-base";
const { width } = Dimensions.get('window');
const height = width * 0.5;
import { firebaseApp } from "../../untils/firebase";
import FastImage from "react-native-fast-image";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { connect } from 'react-redux';
import { addProductToCart } from '../../redux/actions/Cart';
import Category from '../../Components/Category'
class Home extends Component {
    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            dataSource: [],
            refreshing: false,
            sliderIndex: 0,
            maxSlider: 3,
            banners: [
                { _id: 1, imageUrl: 'https://chonhangchuan.com/wp-content/uploads/2018/08/tung-bung-ngay-sieu-flash-sale-gia-khuynh-dao.jpg' },
                {
                    _id: 2,
                    imageUrl: 'https://cdn-images-1.medium.com/max/1200/1*IDV0DLWDt0EVMh0BAML5NA.png'
                },
                {
                    _id: 3,
                    imageUrl: 'https://salt.tikicdn.com/media/upload/landingpage/banners/48857a34498b41762f2ca326ed9149eb.png'
                },
                {
                    _id: 4,
                    imageUrl: 'https://saledenroi.com/wp-content/uploads/2017/07/banner-tiki-khuyen-mai.jpg'
                },
            ],
            _isMounted: false
        }
    }

    formatVND(num) {
        var value = String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        return value
    }

    setRef = (c) => {
        this.listRef = c;
    }

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
    }

    componentDidMount() {
        this.setState({ _isMounted: true });
        if (this.state._isMounted) {
            setInterval(function () {
                const { sliderIndex, maxSlider } = this.state
                let nextIndex = 0

                if (sliderIndex < maxSlider) {
                    nextIndex = sliderIndex + 1
                }

                this.scrollToIndex(nextIndex, true)
                this.setState({ sliderIndex: nextIndex })
            }.bind(this), 3000)
        }
    }
    componentWillUnmount() {
        this.setState({ _isMounted: false })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={styles.saf}>
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    {/*view slilde show*/}
                    <FlatList
                        ref={this.setRef}
                        data={this.state.banners}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item, i }) => (
                            <View key={i} style={{ height, width }}>
                                <Image style={{ height, width }} source={{ uri: item.imageUrl }} />
                            </View>
                        )}
                        onMomentumScrollEnd={(event) => {
                            let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x / width : 0
                            this.setState({ sliderIndex })
                        }}
                    />
                    <View style={styles.sliderContainer}>
                        {
                            this.state.banners.map(function (item, index) {
                                return (
                                    <View key={index} style={styles.sliderBtnContainer}>
                                        <View style={styles.sliderBtn}>
                                            {
                                                this.state.sliderIndex == index ?
                                                    <View style={styles.sliderBtnSelected} /> : null
                                            }
                                        </View>
                                    </View>
                                )
                            }.bind(this))
                        }
                    </View>

                    <View style={styles.container}>
                        {/*Danh muc*/}
                        <Category navigate={navigate} />
                        <Card style={[styles.card, styles.marginTop]}>

                            <View style={[styles.viewHorizontal, styles.marginTop]}>
                                <View style={styles.viewHorizontalLeft}>
                                    <View style={styles.bar} />
                                    <Text style={[styles.title]}>Sản Phẩm Mới</Text>
                                </View>
                                <View>
                                    <Text style={[styles.textItemRight]}>Xem Thêm >></Text>
                                </View>
                            </View>

                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={this.props.newProducts.slice(0, 6)}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('Detaill', { item: item });
                                        }}>
                                        <View style={styles.left10}>
                                            <FastImage style={styles.image}
                                                source={{ uri: item.images[0] }} />
                                            <View style={[styles.left10, { marginBottom: 5 }]}>
                                                <TextComponent style={styles.name}>{item.productName}</TextComponent>
                                                <TextComponent style={styles.money}>{this.formatVND(item.price)} đ</TextComponent>
                                                <TextComponent style={styles.shopid}>{item.nameShop}</TextComponent>
                                            </View>


                                        </View>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()}

                            />
                        </Card>
                        {/*view goi y hom nay*/}
                        <Card style={[styles.card]}>
                            <View style={[styles.viewHorizontal, { maNayrginTop: 5, marginBottom: 5 }]}>
                                <View style={[styles.viewHorizontalLeft, { marginTop: 5, marginBottom: 5, justifyContent: 'center' }]}>
                                    <View style={styles.bar} />
                                    <Text style={[styles.title]}>Gợi Ý Hôm </Text>
                                </View>
                                <View>
                                    <Text style={[styles.textItemRight]}>Xem Thêm >></Text>
                                </View>
                            </View>

                        </Card>
                        <View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.props.defaultProducts.slice(0, 6)}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('Detaill', { item: item });
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
                                keyExtractor={(item, index) => index.toString()}
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh}
                                numColumns={2}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 50 }} />
                </ScrollView>

            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        defaultProducts: state.Products.defaultProducts,
        newProducts: state.Products.newProducts
    }
}
export default connect(mapStateToProps, { addProductToCart })(Home);
const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,

    },

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
        left: 10
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