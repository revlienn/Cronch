import { Component, inject, input, OnInit } from '@angular/core';
import { Food } from '../../../types/FoodSearchResult';
import { FoodCardFacts } from '../../../types/Food';
import { MatCardModule } from '@angular/material/card';
import { FoodService } from '../../services/food-service';

@Component({
  selector: 'app-food-card',
  imports: [MatCardModule],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css'
})
export class FoodCard implements OnInit {

  item = input.required<Food>();
  protected itemDetails!:FoodCardFacts;
  private foodService=inject(FoodService);

  ngOnInit(): void {
    this.getDetails(this.item().food_description);
  }

  getDetails(description: string): void {
    const unitMatch = description.match(/^(Per [^-]+)/)
    const calMatch = description.match(/Calories: \s*(\d+)/);
    const proteinMatch = description.match(/Protein:\s*([\d.,]+)/i);
    const fatMatch = description.match(/Fat:\s*([\d.,]+)/i);
    const carbsMatch = description.match(/Carbs:\s*([\d.,]+)/i);

    this.itemDetails= {
      id: Number(this.item().food_id),
      name: this.item().food_name,
      brand: this.item().brand_name || 'Generic',
      unit: unitMatch ? unitMatch[1].toString().trimEnd().toLowerCase() : '',
      calories: calMatch ? Number(calMatch[1]) : 0,
      protein: proteinMatch ? parseFloat(proteinMatch[1].replace(',', '.')) : 0,
      fat: fatMatch ? parseFloat(fatMatch[1].replace(',', '.')) : 0,
      carbs: carbsMatch ? parseFloat(carbsMatch[1].replace(',', '.')) : 0
    }
  }

  addToList() {
    this.foodService.addItemtoList(this.itemDetails);
  }



}
