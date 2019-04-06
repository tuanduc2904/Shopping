import firebase from 'firebase';
import { ADD_TO_PRODUCT } from './types'

addToProduct = (newProduct) => {
    return {
        type: ADD_TO_PRODUCT,
        newProduct
    }
}
getSuccessData = (myProducts) => {
    return {
        type: 'GET_SUCCESS_DATA',
        myProducts
    }
}
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

export const updateMyProduct = (product) => {
    return {
        type: 'UPDATE_PRODUCT',
        product
    }
}
export const finish = () => {
    return {
        type: 'FINISH'
    }
}
export const getProduct = (user) => {
    return (dispatch) => {
        dispatch(startAdd());
        db.ref('products').child(user.uid).once('value', snapshot => {
            let myProducts = [];
            snapshot.forEach((child) => {
                let product = child.val();
                product.key = child.key;
                myProducts.push(product);
            });
            dispatch(getSuccessData(myProducts));
        }, err => {
            dispatch(err());
        })
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
                    let today = new Date();
                    let date = today.toLocaleDateString("en-US")
                    let time = `${today.getHours()}:${today.getMinutes()}`;
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
                            date: date,
                            time: time
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
                                date: date,
                                time: time
                            };

                            dispatch(addSuccess(newProduct));
                            dispatch(addToProduct(newProduct))
                        })
                    }
                }).catch(err => {
                    dispatch(err())
                })
        });


    }
}