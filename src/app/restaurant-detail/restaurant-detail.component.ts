import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/restaurants/restaurant.service';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(
    private restaurantService: RestaurantService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    this.restaurantService.restaurantById(id)
      .subscribe(restaurant => this.restaurant = restaurant)
  }

}
