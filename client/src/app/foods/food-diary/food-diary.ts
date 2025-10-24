import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FoodService } from '../../services/food-service';
import { FoodCartItem } from '../../../types/Food';

interface IDayText{
  [key:number]:string
}

const DayText:IDayText={
  0:'Sunday',
  1:'Monday',
  2:'Tuesday',
  3:'Wednesday',
  5:'Friday'
};

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
      const items = this.foodService.diary();
      if(!items) return;
      const grouped: Record<string, FoodCartItem[]> = ({});

      for (const item of items) {
        const dateKey = new Date(item.timestamp).toLocaleDateString('en-gb',{
          day:'numeric',
          month:'short',
          year:'2-digit',
          weekday:'short'
        })
        if (!grouped[dateKey]) {
          grouped[dateKey] = []
        }
        grouped[dateKey].push(item);
      }

      this.foodTimeGrouped.set(grouped);
      this.dates.set(Object.keys(this.foodTimeGrouped()));
    })


  }

  adjustDiaryItemQty(id:number,newQty:string){
    return this.foodService.adjustDiaryItemQty(id,Number(newQty))
  }
}
