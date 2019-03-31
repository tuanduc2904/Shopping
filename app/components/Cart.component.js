import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Animated,Platform
} from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import {colors} from '../assets/color'
export class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			opacity: new Animated.Value(1)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.cartItems !== this.props.cartItems) {
			this.startAnimation();
		}
	}

	startAnimation() {
		Animated.timing(this.state.opacity,
			{
				toValue: 0,
				duration: 500
			}).start(() => {
				setTimeout(() => {
					this.endAnimation()
				}, 100);
			})
	}

	endAnimation() {
		Animated.timing(this.state.opacity,
			{
				toValue: 1,
				duration: 500
			}).start()
	}

	onPress = () => {
		this.props.navigation.navigate('Checkout');
	}
	render() {
		const { cartItems } = this.props;
		let animatedStyle = { opacity: this.state.opacity }
		return (
			// <Animated.View style={[styles.container, animatedStyle]}>
			// 	<TouchableOpacity onPress={this.onPress}>
			// 	<Icon name="ios-cart" size={30} />
			// 		<Text style={styles.cart}> {(cartItems).length}</Text>
			// 	</TouchableOpacity>
			// </Animated.View>
			<View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null]}>
			<TouchableOpacity onPress={this.onPress}>
				<View style={{
					position: 'absolute', height: 25, width: 25, borderRadius: 15, backgroundColor: 'blue', right: 20, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

				}}>
					<Text style={{ color: 'white', fontWeight: 'bold' }}>{(cartItems).length}</Text>
					
				</View>
				{/* <Icon  name="ios-cart" size={30} /> */}
				<Icon name='shoppingcart' type='AntDesign'
                            style={{ fontSize: 30, color: colors.red }} />
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	cartItems: state.cart.cart
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cart: {
		color: 'black',
		fontSize: 14
	},
	iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
})

export default connect(
	mapStateToProps
)(Cart);
