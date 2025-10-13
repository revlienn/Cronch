import { Component, input } from '@angular/core';
import { FoodSearchResult } from '../../../types/FoodSearchResult';
import { FoodCard } from '../food-card/food-card';

@Component({
  selector: 'app-search-result-list',
  imports: [FoodCard],
  templateUrl: './search-result-list.html',
  styleUrl: './search-result-list.css'
})
export class SearchResultList {
  result=input.required<FoodSearchResult|null>();

}
