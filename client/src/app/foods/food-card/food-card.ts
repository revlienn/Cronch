import { Component, input, Input, signal } from '@angular/core';
import { Food } from '../../../types/FoodSearchResult';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-food-card',
  imports: [JsonPipe],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css'
})
export class FoodCard {

  item=input.required<Food>();
}
