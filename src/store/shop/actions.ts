import { CartPayload } from '../../types/Cart';

export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const DELETE_CART = 'DELETE_CART';
export const RESET_CART = 'RESET_CART';

export function GetNumberCart(){
    return {
        type:'GET_NUMBER_CART'
    }
}

export function AddCart(payload: CartPayload){
    return {
        type:'ADD_CART',
        payload
    }
}

export function DeleteCart(payload: Number){
    return {
        type:'DELETE_CART',
        payload
    }
}

export function IncreaseQuantity(payload: Number){
    return { 
        type:'INCREASE_QUANTITY',
        payload
    }
}

export function DecreaseQuantity(payload: Number){
    return {
        type:'DECREASE_QUANTITY',
        payload
    }
}

export function ResetCart(){
    return {
        type:'RESET_CART',
    }
}

