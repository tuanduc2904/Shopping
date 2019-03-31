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
const db = firebase.database();

export const finish = () => {
    return {
        type: 'FINISH'
    }
}

export const addProduct = (product, user) => {
    return (dispatch) => {
        dispatch(startAdd());
        let mime = 'application/octet-stream';
        let urls = [];
        let itemsProcessed = 0;
        product.blobs.forEach((item, index, arr) => {
            storage.ref('imgProduct').child(`${item.key}.jpg`)
                .put(item.blob, { contentType: mime })
                .then(snapshoot => {
                    return snapshoot.ref.getDownloadURL();
                }).then(downloadURL => {
                    itemsProcessed++;
                    urls = urls.concat(downloadURL);
                    let date = new Date().toLocaleDateString("en-US");
                    if (itemsProcessed === arr.length) {
                        db.ref(`products`).child(user.uid).push({
                            productName: product.productName,
                            description: product.description,
                            colors: product.colors,
                            price: product.price,
                            category: product.category,
                            images: urls,
                            uid: user.uid,
                            nameShop: user.nameShop,
                            avatarSource: user.avatarSource,
                            date: date
                        }).then((snap) => {
                            let newProduct = {
                                productName: product.productName,
                                description: product.description,
                                colors: product.colors,
                                price: product.price,
                                category: product.category,
                                images: urls,
                                uid: user.uid,
                                nameShop: user.nameShop,
                                avatarSource: user.avatarSource,
                                key: snap.key,
                                date: date
                            };
                            dispatch(addSuccess(newProduct))
                        })
                    }
                }).catch(err => {
                    dispatch(err())
                })
        });


    }
}