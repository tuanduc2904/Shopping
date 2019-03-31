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
import { Icon, Card } from "native-base";
const { width } = Dimensions.get('window');
const height = width * 0.5;
import { firebaseApp } from "../../untils/firebase";
import FastImage from "react-native-fast-image";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { connect } from 'react-redux'

class Home extends Component {
    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false,
            sliderIndex: 0,
            maxSlider: 2,
            banners: [
                { _id: 1, imageUrl: 'https://png.pngtree.com/thumb_back/fh260/back_pic/00/15/30/4656e81f6dc57c5.jpg' },
                {
                    _id: 2,
                    imageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                },
                {
                    _id: 3,
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhcSnO3gsJmdH3kQX_2uJ9dMoG447FVNEwhuDh9dZDt0LQX07h'
                },
                {
                    _id: 4,
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhcSnO3gsJmdH3kQX_2uJ9dMoG447FVNEwhuDh9dZDt0LQX07h'
                },
            ],
        }
    }






    setRef = (c) => {
        this.listRef = c;
    }

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
    }

    componentWillMount() {
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


    render() {
        const {navigate} = this.props.navigation;
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
                        {/*san pham moi*/}
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
                                showsVerticalScrollIndicator={false}
                                data={this.props.newProducts}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('Detaill',{item:item});
                                        }}>
                                        <View style={styles.left10}>
                                            <FastImage style={styles.image}
                                                source={{ uri: item.images[0] }} />
                                            <View style={[styles.left10, { marginBottom: 5 }]}>
                                                <TextComponent style={styles.name}>{item.productName}</TextComponent>
                                                <TextComponent style={styles.money}>{item.price}</TextComponent>
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
                                <View style={[styles.viewHorizontalLeft,{marginTop:5,marginBottom:5,justifyContent:'center'}]}>
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
                                data={this.props.defaultProducts}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('Detaill',{item:item});
                                        }}
                                        style={[styles.viewItem]}>

                                        <FastImage style={styles.imageNumColumns}
                                            source={{ uri: item.images[0] }} />
                                        <View style={[styles.left10, { marginBottom: 5, marginTop: 5 }]}>
                                            <TextComponent style={styles.name}>{item.productName}</TextComponent>
                                            <TextComponent style={styles.money}>{item.price}</TextComponent>
                                            <TextComponent style={styles.shopid}>{item.nameShop}</TextComponent>
                                        </View>
                                        <View>
                                            <View style={[styles.viewHorizontal, { marginBottom: 10 }]}>
                                                <Icon name='hearto' type='AntDesign'
                                                    style={{ fontSize: 20, color: colors.red }} />
                                                <Icon name='local-shipping' type='MaterialIcons'
                                                    style={{ fontSize: 20, color: colors.red }} />
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
export default connect(mapStateToProps)(Home);
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