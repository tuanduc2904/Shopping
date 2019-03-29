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

upLoadImageToFirebase = (blobs) => {
    let mime = 'img/jpg';
    let urls = [];
    let promise = blobs.map((item) => {
        return storage.ref('imgProduct').child(`${item.key}.jpg`)
            .put(item.blob, { contentType: mime })
            .then(snapshoot => {
                return snapshoot.ref.getDownloadURL()
            }).then(downloadURL => {
                return urls = urls.concat(downloadURL);
            })
    });
    Promise.all(promise).then((urls) => {
        console.log(`urls : ${urls}`);
        return urls;
    })
}

export const addProduct = (product) => {
    return (dispatch) => {
        dispatch(startAdd());
        dispatch(upLoadImageToFirebase(product.blobs))
    }
}