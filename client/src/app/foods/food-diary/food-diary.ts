import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FoodService } from '../../services/food-service';
import { FoodCartItem } from '../../../types/Food';

@Component({
  selector: 'app-food-diary',
  imports: [],
  templateUrl: './food-diary.html',
  styleUrl: './food-diary.css'
})
export class FoodDiary {

  protected foodService = inject(FoodService);
  protected foodTimeGrouped = signal<Record<string, FoodCartItem[]>>({});
  protected dates = signal<string[]>([]);

  constructor() {


    effect(() => {
      const items = localStorage.getItem('diary');
      if(!items) return;
      let parsedDiary: FoodCartItem[] = JSON.parse(items);
      const grouped: Record<string, FoodCartItem[]> = ({});

      for (const item of parsedDiary) {
        console.log(item);
        const dateKey = new Date(item.timestamp).toISOString().split('T')[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = []
        }
        grouped[dateKey].push(item);
      }

      this.foodTimeGrouped.set(grouped);
      this.dates.set(Object.keys(this.foodTimeGrouped()));

    })


  }
}
