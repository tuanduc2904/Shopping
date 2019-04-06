import { AsyncStorage } from 'react-native';
export const saveCart = async (carts) => {
    await AsyncStorage.setItem('@cart', JSON.stringify(carts));
};

export const getCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@cart');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        return [];
    }
};

export const saveUser = async (user) => {
    await AsyncStorage.setItem('@user', JSON.stringify(user));

};

export const getUser = async () => {
    try {
        const value = await AsyncStorage.getItem('@user');
        if (value !== null) {
            return JSON.parse(value);
        }
        return {};
    } catch (error) {
        return {};
    }
};

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@token', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};


