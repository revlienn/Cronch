import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button'
import { FoodService } from './services/food-service';
import { Food } from '../types/Food';
import { JsonPipe } from '@angular/common';
import { FoodSearchResult } from '../types/FoodSearchResult';
import { FoodSearchArea } from './foods/food-search-area/food-search-area';
import { Cart } from './foods/cart/cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule,FoodSearchArea,Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Hello Friday!');
  private foodService=inject(FoodService);
  food=signal<Food|null>(null);
  foodSearch=signal<FoodSearchResult|null>(null);

  ngOnInit(): void {
    this.foodService.getFoodById(611525).subscribe((res)=>this.food.set(res));
    this.foodService.searchFood('banana pie').subscribe((res)=>this.foodSearch.set(res))
  }
}
