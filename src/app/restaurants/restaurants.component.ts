import { Component, Injectable, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
@Injectable()
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  constructor(private restaurantService:RestaurantService) { }

  ngOnInit() {
    this.restaurantService.restaurants().subscribe(restaurants => this.restaurants = restaurants)
  }

}
