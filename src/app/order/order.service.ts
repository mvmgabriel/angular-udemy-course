import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";

import 'rxjs/add/operator/map';

import {MEAT_API} from '../app.api'

@Injectable()
export class OrderService {

    constructor(
        private cartService:ShoppingCartService,
        private http:Http){}

    clear(){
        this.cartService.clear()
    }

    itemsValue():number{
        return this.cartService.total()
    }

    cartItems():CartItem[]{
        return this.cartService.items
    }

    increaseQty(item:CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item:CartItem){
        this.cartService.decreaseQty(item)
    }

    removeItem(item:CartItem){
        this.cartService.removeItem(item)   
    }

    checkOrder(order:Order):Observable<Order>{
        const headers = new Headers()
        headers.append('Content-Type','application/json')

        return this.http.post(
                `${MEAT_API}/orders`, 
                JSON.stringify(order),
                new RequestOptions({headers: headers}))
            .map(response => response.json())
    }
}