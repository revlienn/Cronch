import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FoodService } from '../../services/food-service';
import { FoodCardFacts } from '../../../types/Food';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [JsonPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart{

  protected foodService=inject(FoodService);
}
