export const getUpdatedItems = ( products, newQty, key ) => {

	// Create an empty array.
	const updatedItems = [];

	// Loop through the product array.
	products.map( ( cartItem ) => {

		// If you find the cart key of the product user is trying to update, push the key and new qty.
		if ( cartItem.key === key ) {
			updatedItems.push( {
				key: cartItem.key,
				quantity: parseInt( newQty )
			} );

			// Otherwise just push the existing qty without updating.
		} else {
			updatedItems.push( {
				key: cartItem.key,
				quantity: cartItem.quantity
			} );
		}
	} );

	// Return the updatedItems array with new Qtys.
	return updatedItems;

};
