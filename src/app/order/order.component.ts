import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  patternOnlyNumber:any = /^[0-9]*$/
  patternEmail:any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  
  orderForm: FormGroup

  delivery:number = 8

  paymentOption:RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Vale Refeição', value: 'REF'},
    {label: 'Cartão de Crédito', value: 'CRE'}
  ]

  constructor(
    private orderService:OrderService, 
    private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.patternEmail)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.patternEmail)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.patternOnlyNumber)]),
      optional: this.formBuilder.control(''),
      paymentOpt: this.formBuilder.control('', [Validators.required]),
    },{validator: OrderComponent.equalsTo})
  }

  static equalsTo(group:AbstractControl):{[key:string]:boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){
      return undefined
    }

    if(email.value !== emailConfirmation.value){
      return {emailNotMatch:true}
    }

    return undefined
  }

  checkOrder(order:Order){
    order.orderItems = this.cartItems().map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe((orderResponse:Order) => {
      this.router.navigate(['/order-summary'])
      console.log(JSON.stringify(orderResponse))
      console.log(`Compra concluida: ${orderResponse.id}`)
      this.orderService.clear()
    })
    console.log(JSON.stringify(order))
  }

  itemsValue():number{
    return this.orderService.itemsValue()
  }

  cartItems():CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item:CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item:CartItem){
    this.orderService.decreaseQty(item)
  }

  removeItem(item:CartItem){
    this.orderService.removeItem(item)   
  }

}
