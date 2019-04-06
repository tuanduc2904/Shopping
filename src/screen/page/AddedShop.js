import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { colors } from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { Card, Icon } from "native-base";
import FastImage from "react-native-fast-image";
import { getProduct } from '../../redux/actions/MyProduct';
import Loading from '../../Components/Loading';
const { width } = Dimensions.get('window');
import { removeInMyProduct } from '../../redux/actions/MyProduct';
import { getDefaulProduct } from '../../redux/actions/Product'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class AddedShop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProduct(this.props.user);
  }
  formatVND(num) {
    var value = String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
    return value
  }

  render() {

    return (

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('PostProduct') }}
        >
          <Card style={[styles.card]}>
            <View style={[styles.viewHorizontal, { marginTop: 5, marginBottom: 5 }]}>
              <View style={styles.viewHorizontalLeft}>
                <FastImage
                  source={{ uri: this.props.user.avatarSource }}
                  style={styles.avatar} />
                <View>
                  <TextComponent style={[styles.text, { color: colors.red, fontWeight: '500' }]}>{this.props.user.nameShop}</TextComponent>
                  <TextComponent style={[styles.text]}>Thêm sản phẩm mới...</TextComponent>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
        <View>
          {this.props.myProduct.myProducts.length > 0 ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.myProduct.myProducts}
              style={{ height: '100%' }}
              renderItem={({ item }) =>
                <View style={[styles.viewItem]}>
                  <FastImage style={styles.imageNumColumns}
                    source={{ uri: item.images[0] }} />
                  <View style={[styles.left10, { marginBottom: 5, marginTop: 5 }]}>
                    <TextComponent style={styles.name}>{item.productName}</TextComponent>
                    <TextComponent style={[styles.money, { fontWeight: 'bold' }]}>{this.formatVND(item.price)} đ</TextComponent>
                  </View>
                  <View style={[styles.viewHorizontal, { marginBottom: 10 }]}>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Xóa sản phẩm',
                          'Bạn có chắc muốn xóa sản phẩm này không?',
                          [
                            {
                              text: 'Không',
                              style: 'cancel',
                            },
                            {
                              text: 'Xóa', onPress: () => {
                                this.props.removeInMyProduct(item);
                                this.props.getDefaulProduct();
                              }
                            },
                          ],
                          { cancelable: false },
                        );

                      }}
                    >
                      <Icon name='trash' type='EvilIcons'
                        style={{ fontSize: 30, color: colors.red, paddingRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('EditProduct', { item: item })
                      }}
                    >
                      <Icon name='edit' type='AntDesign'
                        style={{ fontSize: 25, color: colors.red, paddingLeft: 10 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              }
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            /> :
            <View style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TextComponent style={{ fontSize: 20 }}>Chưa có sản phẩm nào</TextComponent>
            </View>
          }

        </View>
        {this.props.myProduct.isLoading ? <Loading /> : null}
      </View>

    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.Auth,
    myProduct: state.MyProduct
  }
}

export default connect(mapStateToProps, { getProduct, removeInMyProduct, getDefaulProduct })(AddedShop);


const styles = StyleSheet.create({


  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: colors.background
  },


  card: {
    borderRadius: 8,
    margin: 5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: colors.bgUser,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: colors.background
  },
  viewHorizontalLeft: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  viewTextInput: {
    height: 60
  },

  text: {
    fontSize: 16,
    color: colors.black
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
    fontSize: 15,
    width: 120,
  },
  money: {
    color: colors.red,
    width: 120
  },

})