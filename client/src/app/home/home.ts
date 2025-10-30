import { Component } from '@angular/core';
import { FoodSearchArea } from '../foods/food-search-area/food-search-area';
import { Cart } from '../foods/cart/cart';

@Component({
  selector: 'app-home',
  imports: [FoodSearchArea],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
