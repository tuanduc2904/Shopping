import firebase from 'firebase';
addSuccess = (product) => {
    return {
        type: 'ADD_SUCCESS',
        product
    }
}
startAdd = () => {
    return {
        type: 'START_ADD'
    }
}
err = () => {
    return {
        type: 'ADD_ERR'
    }
}

const storage = firebase.storage();

upLoadImageToFirebase = (item) => {
    return storage.ref('imgProduct').child(`${item.key}.jpg`)
        .put(item.blob, { contentType: 'application/octet-stream' })
}

export const addProduct = (product) => {
    return (dispatch) => {
        let { blobs } = product;
        let urls = [];
        dispatch(startAdd());
        let req = blobs.forEach((item) => {
            upLoadImageToFirebase(item).then((snapshoot) => {
                urls = urls.concat(snapshoot.ref.getDownloadURL());
            }).catch(err => {
                console.log(err)
            })
        })
        
    }
}