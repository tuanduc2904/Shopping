import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator,Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { firebaseApp } from '../../../Services/firebase'



const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionID = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('avatarUser').child(`${sessionID}.jpg`);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      }).then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


export default class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  imagePicker() {
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({
        avatarSource: ''
      })
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {
        uploadImage(response.uri)
          .then(url => this.setState({ avatarSource: url }))
          .catch(err => console.log(err))

        // const source = { uri: response.uri };

        // // You can also display the image using data:
        // // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });


      }
    });
  }
  render() {
    return (
      <View>
        {
          (() => {
            switch (this.state.avatarSource) {
              case null:
                return null;
              case '':
                return <ActivityIndicator />
              default:
                return (
                  <View>
                    <Image source={{ uri: this.state.avatarSource }}
                      style={{ height: 300, width: 300 }} />
                    <Text>{this.state.avatarSource}</Text>
                  </View>
                )
            }
          }) ()
        }
        <TouchableOpacity
          onPress={() => {
            this.imagePicker();
          }}
        >

          <Text>showImagePicker</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
