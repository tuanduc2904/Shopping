import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { colors } from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { Card, Icon } from "native-base";
import { firebaseApp } from "../../untils/firebase";
import { Dimens } from "../../assets/Dimens";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get('window');

class AddedShop extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      isLoading: true,
      dataSource: [],
      refreshing: false,
    }

  }

  getProducts(itemRef) {
    let items = [];

    this.itemRef.ref('Products').on('value', (dataSnapshot) => {

      dataSnapshot.forEach((child) => {
        items.push({
          image: child.val().image,
          name: child.val().name,
          describe: child.val().describe,
          cmt: child.val().cmt,
          like: child.val().like,
          money: child.val().money,
          shopid: child.val().shopid,
          key: child.key
        })
      })
      this.setState({
        isLoading: false,
        dataSource: items,
        refreshing: false,
      })
    })
  }

  componentDidMount() {
    this.getProducts(this.itemRef)
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.getProducts(this.itemRef)
    })
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
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <TouchableOpacity style={[styles.viewItem]}>

                <FastImage style={styles.imageNumColumns}
                  source={{ uri: item.image }} />
                <View style={[styles.left10, { marginBottom: 5, marginTop: 5 }]}>
                  <TextComponent style={styles.name}>{item.name}</TextComponent>
                  <TextComponent style={styles.money}>{item.money}</TextComponent>
                  <TextComponent style={styles.shopid}>{item.shopid}</TextComponent>
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

        <View>

        </View>
      </View >

    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.Auth,
  }
}

export default connect(mapStateToProps)(AddedShop);


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
