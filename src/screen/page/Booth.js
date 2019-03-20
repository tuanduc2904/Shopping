import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, Image } from 'react-native';
import {colors} from "../../assets/color";
import {Dimens} from "../../assets/Dimens";

const { width } = Dimensions.get('window');
const height = width * 0.5;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            sliderIndex: 0,
            maxSlider: 2,
            banners: [
                {_id: 1, imageUrl: 'https://png.pngtree.com/thumb_back/fh260/back_pic/00/15/30/4656e81f6dc57c5.jpg'},
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
        setInterval(function() {
            const { sliderIndex, maxSlider } = this.state
            let nextIndex = 0

            if (sliderIndex < maxSlider) {
                nextIndex = sliderIndex + 1
            }

            this.scrollToIndex(nextIndex, true)
            this.setState({sliderIndex: nextIndex})
        }.bind(this), 3000)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <FlatList
                        ref={this.setRef}
                        data={this.state.banners}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        keyExtractor={item => item._id.toString()}
                        renderItem={({item, i}) => (
                            <View key={i} style={{ height, width}}>
                                <Image style={{ height, width }} source={{ uri: item.imageUrl }} />
                            </View>
                        )}
                        onMomentumScrollEnd={(event) => {
                            let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x/width : 0
                            this.setState({sliderIndex})
                        }}
                    />
                    <View style={styles.sliderContainer}>
                        {
                            this.state.banners.map(function(item, index) {
                                return (
                                    <View key={index} style={styles.sliderBtnContainer}>
                                        <View style={styles.sliderBtn}>
                                            {
                                                this.state.sliderIndex == index ? <View style={styles.sliderBtnSelected}/> : null
                                            }
                                        </View>
                                    </View>
                                )
                            }.bind(this))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,

    },
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
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
    },
    //View Pager
    scrollContainer: {
        flex: 1,
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
        position: 'absolute',
        top: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#ffffffad'
    },
    viewHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    titleItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.red
    }

})