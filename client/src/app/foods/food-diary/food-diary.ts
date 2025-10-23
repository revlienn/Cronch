import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FoodService } from '../../services/food-service';
import { FoodCardFacts } from '../../../types/Food';

@Component({
  selector: 'app-food-diary',
  imports: [],
  templateUrl: './food-diary.html',
  styleUrl: './food-diary.css'
})
export class FoodDiary {

  protected foodService = inject(FoodService);
  protected foodTimeGrouped = signal<Record<string, FoodCardFacts[]>>({});
  protected dates=signal<string[]>([]);

  constructor() {


    effect(() => {
      const items = this.foodService.list();
      const grouped: Record<string, FoodCardFacts[]> = ({});

      for (const item of items) {

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
