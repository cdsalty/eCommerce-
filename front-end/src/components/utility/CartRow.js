import React from 'react';

// export default (props)=>{}

function CartRow(props){
	const product = props.product;
	return(
		<tr>
			<td>{product.productName}</td>
			<td>{product.buyPrice}</td>
			<td><button className="btn btn-danger">Delete</button></td>
		</tr>
	)
}

export default CartRow;