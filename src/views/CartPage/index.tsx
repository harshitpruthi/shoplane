import './cartPage.css';

import React, { useState } from 'react';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import Popup from '../../components/ui/Popup';
import {
  DecreaseQuantity,
  DeleteCart,
  IncreaseQuantity,
  ResetCart,
} from '../../store/shop/actions';

const Cart = (props: Props) => {
    const { items, IncreaseQuantity, DecreaseQuantity, DeleteCart, ResetCart} = props;
    const [isVisible,setVisibility]= useState(false);
    const [emailId,setEmailId]= useState('');
    const [errorMsg,setErrorMsg]= useState('');
    const [btnLoader,setBtnLoader]= useState(false);
    
    let ListCart : String[]= [];
    let TotalCart = 0;

    Object.keys(items.Carts).forEach(function(item){
        TotalCart+=items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
    });

    function TotalPrice(price:number,quantity:number){
        return Number(price * quantity).toLocaleString('en-US');
    }

    const onEmailIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg('');
        setEmailId(e.target.value);
    }

    const onCompleteOrderClick = (amount: Number) => {
        if(emailId !== '') {
            setBtnLoader(true);
            const headers = {
                "Content-Type": "application/json"
            }
            const url ='http://localhost:3000/confirm-order';
            const data = {
                emailId: emailId,
                amount: amount
            }

            axios.post(url,data,{headers}).then((response) => {
                if(response.status === 200) {
                    setErrorMsg('');
                    setBtnLoader(false);
                    setVisibility(false);
                    setEmailId('');
                    ResetCart();
                    cogoToast.success('Order Placed Successfully');
                }
            }).catch((err) => {
                setErrorMsg('Order Failed');
                console.error(err)
                setBtnLoader(false);
            })
        } else {
            setErrorMsg('Please enter your Email Id')
        }
    }

    const onCheckoutBtnClick = () => {
        setEmailId('');
        setVisibility(true);
    }
    
    return(
        <>
         <Header />
        <div className="row">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className='cp44TableHeader'>Name</th>
                        <th className='cp44TableHeader'>Image</th>
                        <th className='cp44TableHeader'>Price</th>
                        <th className='cp44TableHeader'>Quantity</th>
                        <th className='cp44TableHeader'>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    ListCart.map((item:any,key:any)=>{
                        return(
                            <tr key={key} className='cp44TableRow'>    
                            <td className='cp44TableRow'>
                                <div className='cp44CrossBtnDiv'><i className="cp44CrossBtn" onClick={()=>DeleteCart(key)}>X</i></div>
                            </td>
                            <td className='cp44TableRow'>{item.title}</td>
                            <td className='cp44TableRow'><img src={item.image} alt={item.name} style={{width:'50px',height:'50px'}}/></td>
                            <td className='cp44TableRow'>{item.price} $</td>
                            <td className='cp44TableRow'>
                                <div className='cp44QuantityDiv'>
                                    <Button onClick={()=>DecreaseQuantity(key)} buttonText="-" buttonType="Primary" width={30} height={30}/>
                                    <Button onClick={()=>{}} buttonText={item.quantity} buttonType="Tertiary" width={30} height={30}/>
                                    <Button onClick={()=>IncreaseQuantity(key)} buttonText="+" buttonType="Primary" width={30} height={30}/>
                                </div>
                            </td>
                            <td className='cp44TableRow'>{ TotalPrice(item.price,item.quantity)} $</td>
                        </tr>
                        )
                    })
                        
                }
                </tbody>
              
            </table>
            <div className='cp44TotalAmtDiv'>
                    <div>Cart Total</div>
                    <div className='cp44CartTotal'>{Number(TotalCart).toLocaleString('en-US')} $</div>
                </div>
            </div>

            <div className='cp44CheckoutBtn'>
                {
                    TotalCart > 0 &&
                    <Button 
                        onClick={onCheckoutBtnClick} 
                        buttonText="CHECKOUT" 
                        buttonType="Primary" 
                    />
                }
            </div>

            <Popup  
                visible={isVisible}
                onClose={() => setVisibility(false)}
                customStyles={{ width: 500}}
            >   
                <div className='cp44PopupStyle'>
                    <div className='cp44EmailDiv'>
                        <div>Email Id:</div>
                        <input type="text" className='cp44EmailInput' onInput={onEmailIdInput}/>
                    </div>
                    <div className='cp44AmountDiv'>
                        <div>Total Amount:</div>
                        <div>{Number(TotalCart).toLocaleString('en-US')} $</div>
                    </div>

                    {
                        <div className='cp44ErrorMsgTxt'>{errorMsg}</div>
                    }

                    <div className='cp44CheckoutBtn'>
                        <Button 
                            onClick={() => onCompleteOrderClick(Number(TotalCart))} 
                            buttonText="COMPLETE ORDER" 
                            buttonType="Primary" 
                            showLoader={btnLoader}
                        />
                    </div>
                </div>
            </Popup>
        </>
    )
}

type Props = {
    items: any,
    IncreaseQuantity: Function,
    DecreaseQuantity: Function
    DeleteCart: Function,
    ResetCart: Function
}

const mapStateToProps = (state: any) => {
    return {
        items:state._todoProduct
    }
}

export default connect(mapStateToProps,{IncreaseQuantity,DecreaseQuantity,DeleteCart, ResetCart})(Cart);
