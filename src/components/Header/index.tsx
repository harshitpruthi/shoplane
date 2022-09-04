import './header.css';

import React from 'react';

import { connect } from 'react-redux';
import {
  useHistory,
  withRouter,
} from 'react-router';

import cartImg from './images/cart.png';

const Header = (props: Props | any) => {
    const history = useHistory();

    const onCartBtnClick = () => {
        history.push('/cart');
    }

    return (
        <div className="head12Div">
            <h1 className='head12Logo' onClick={() => {history.push('/')}}>SHOPLANE</h1>
            <div className='head12CartImg' onClick={onCartBtnClick}>
                <img src={cartImg} alt="cart" width={35} height={35} />
                <span className='head12CartQuantity'>{props.numberCart}</span>
            </div>
        </div>
    )
}

type Props = {
    data: any
}

const mapStateToProps = (state: any) => {
    return{
        numberCart:state._todoProduct.numberCart
    }
}

export default connect(mapStateToProps,null)(withRouter(Header))
