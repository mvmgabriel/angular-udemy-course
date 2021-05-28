import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/restaurants/restaurant.service';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems:Observable<MenuItem[]>

  constructor(
    private restaurantService:RestaurantService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    let id:string = this.route.parent.snapshot.params['id']
    this.menuItems = this.restaurantService.menuOfRestaurant(id)
  }

  addMenuItem(menuItem:MenuItem){
    console.log(menuItem)
  }
}
