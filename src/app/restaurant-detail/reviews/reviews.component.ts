import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/restaurants/restaurant.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews:any

  constructor(
    private restaurantService:RestaurantService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.parent.snapshot.params['id']
    this.reviews = this.restaurantService.reviewsOfRestaurant(id)
  }

}
