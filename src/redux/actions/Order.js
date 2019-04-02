import { UPDATE_MYSELLING, UPDATE_MYORDERING, LOADING_ORDER, FINISH_ORDER, DONE_ADD_ORDER, FINISH_ADD_ORDER } from '../actions/types'
import { removeAllCart } from './Cart'
import firebase from 'firebase';
const db = firebase.database();

const dpUpdateMyOrdering = (myOrdering) => {
    return {
        type: UPDATE_MYORDERING,
        myOrdering
    }
}
const dpUpdateMySelling = (mySelling) => {
    return {
        type: UPDATE_MYSELLING,
        mySelling
    }
}
const dpLoadingOrder = () => {
    return {
        type: LOADING_ORDER,
    }
}
export const dpFinishOrder = () => {
    return {
        type: FINISH_ORDER,
    }
}

const dpFinishAdd = () => {
    return {
        type: FINISH_ADD_ORDER
    }
}
export const doneAdd = () => {
    return {
        type: DONE_ADD_ORDER
    }
}

export const getSell = () => {
    return (dispatch, getState) => {
        dispatch(dpLoadingOrder);
        const uid = getState().Auth.uid;
        db.ref('orders').once('value').then(listUIDOrder => {
            let mySelling = [];
            listUIDOrder.forEach(UIDOrder => {
                UIDOrder.forEach(order => {
                    let carts = order.val().carts
                    carts.forEach(item => {
                        if (item.product.uid === uid) {
                            let productSell = {};
                            productSell.uidBuy = UIDOrder.key;
                            productSell.quantity = item.quantity;
                            productSell.addressBuy = order.val().address;
                            productSell.date = order.val().date;
                            productSell.status = order.val().status;
                            productSell.totalMoney = order.val().totalMoney;
                            productSell.product = item.product;
                            mySelling.push(productSell);
                        }
                    })
                })

            })
            return mySelling
        }).then(mySelling => {
            dispatch(dpFinishOrder());
            dispatch(dpUpdateMySelling(mySelling))
        }).catch(error => {
            console.log('error', error);
        });
    }
}

export const getOrder = () => {
    return (dispatch, getState) => {
        dispatch(dpLoadingOrder());
        const uid = getState().Auth.uid;

        db.ref('orders').child(uid).once('value').then(list => {
            let orders = [];
            list.forEach(item => {
                let order = {};
                order.key = item.key;
                order.address = item.val().address;
                order.carts = item.val().carts;
                order.date = item.val().date;
                order.status = item.val().status;
                order.totalMoney = item.val().totalMoney;
                orders.push(order);
            })
            return orders
        }).then(orders => {
            dispatch(dpFinishOrder());
            dispatch(dpUpdateMyOrdering(orders));
        }).catch(error => {
            console.log('error', error);
        });

    }
}

export const addOrder = (address) => {
    return (dispatch, getState) => {
        const carts = getState().Cart.carts;
        const totalMoney = getState().Cart.totalMoney;
        const uid = getState().Auth.uid;
        const date = new Date().toLocaleDateString("en-US");
        dispatch(dpLoadingOrder());
        db.ref(`orders`).child(uid).push({
            carts: carts,
            date: date,
            totalMoney: totalMoney,
            status: 'Chờ lấy hàng',
            address: address
        }).then((snap) => {
            dispatch(dpFinishAdd());
            dispatch(removeAllCart());
        }).catch(err => { });
    }
}