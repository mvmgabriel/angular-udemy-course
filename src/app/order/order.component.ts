import { Component, OnInit } from '@angular/core';

import { RadioOption } from 'app/shared/radio/radio-option.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  paymentOption:RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Vale Refeição', value: 'REF'},
    {label: 'Cartão de Crédito', value: 'CRE'}
  ]

  constructor() { }

  ngOnInit() {
  }
}
