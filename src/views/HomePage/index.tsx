import './homePage.css';

import React, { useState } from 'react';

import axios from 'axios';
import cogoToast from 'cogo-toast';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { AddCart } from '../../store/shop/actions';
import { CartPayload } from '../../types/Cart';

const HomePage = (props:Props) => {
    const [productData, setProductData] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    useEffectOnce(() => {
        getProductsData();
    })

    const getProductsData = () => {
        axios.get('http://localhost:3000/products').then((response) => {
            setProductData(response.data);
        }).catch((err) => {
            console.error(err)
        })
    }

    const addToCartBtnClick = (data: CartPayload) => {
        props.AddCart(data);
        cogoToast.success('Item Added To Cart');
    }

    return (
        <>
             <Header />
            <div className='hp66SeeTxt'>Latest Accessories and Clothing</div>
            <input 
                className='hp66Input'
                type="text" 
                placeholder='Search for accessories and clothing' 
                onChange={(event) => {
                    setsearchTerm(event.target.value);
                }}
            />
            <div className="hp66BoxModel">
                {
                    productData.filter((val: CartPayload) => {
                        if(searchTerm === '') {
                            return val;
                        } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        } 
                    }).map((data: CartPayload) => {
                        return (
                        <div className='hp66CardDiv' key={data.id}>
                                <div className='hp66ProductImg'>
                                    <img loading="lazy" alt={data.title} src={data.image} width={150} height={150}/>
                                </div>
                                <div className='hp66TitleDesc'>
                                    <div>
                                        <h2 className='hp66Title'>{data.title}</h2>
                                    </div>
                                    <div>
                                        <h3 className='hp66Desc'>{data.description}</h3>
                                    </div>
                                </div>
                                <div className='hp66CartBtn'>
                                    <Button
                                        onClick={() => { addToCartBtnClick(data)}}
                                        buttonText="Add To Cart"
                                        width="115px"
                                        height="40px"
                                        buttonType="Primary"
                                    />
                                </div>
                        </div>
                        )
                    })
                }
            </div>
        </>
    )
}

type Props = {
    AddCart: Function
}

export default connect(null,{ AddCart })(HomePage);