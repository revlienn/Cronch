import { Component, inject, input, OnInit } from '@angular/core';
import { Food } from '../../../types/FoodSearchResult';
import { Food as FoodItem } from '../../../types/Food';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FoodService } from '../../services/food-service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-food-card',
  imports: [MatCardModule, JsonPipe],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css'
})
export class FoodCard implements OnInit {

  private foodService = inject(FoodService);
  itemDetails!: FoodItem;

  item = input.required<Food>();
  private foodId: number = 0;
  protected unit: string = '';
  protected calories: number = 0;
  protected protein: number = 0;
  options: { servingDescription:string, amount: string, unit: string }[] = [];
  servingsLoaded:boolean=false;

  ngOnInit(): void {
    this.getDetails(this.item().food_description);
    this.foodId = Number(this.item().food_id);
  }

  ngAfterViewInit(): void {
  }

  getDetails(description: string) {
    const unitMatch = description.match(/^(Per [^-]+)/)
    const calMatch = description.match(/Calories: \s*(\d+)/);
    const proteinMatch = description.match(/Protein:\s*([\d.,]+)/i);

    this.unit = unitMatch ? unitMatch[1].toString().trimEnd().toLowerCase() : '';
    this.calories = calMatch ? Number(calMatch[1]) : 0;
    this.protein = proteinMatch ? parseFloat(proteinMatch[1].replace(',', '.')) : 0;
  }

  getServings(){
    if(!this.servingsLoaded){
      this.getFoodDetails();
      this.servingsLoaded=true;
    }
  }

  getFoodDetails() {
    if(!this.servingsLoaded){this.foodService.getFoodById(this.foodId).pipe(
      tap(res=>this.itemDetails=res),
      map(res => 
        res.servings.serving.map(s => ({
          servingDescription:s.serving_description,
        amount: s.metric_serving_amount,
        unit: s.metric_serving_unit
      })))
    ).subscribe((res) => this.options = res)}
    

  }
}
