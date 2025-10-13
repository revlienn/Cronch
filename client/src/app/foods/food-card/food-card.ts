import { Component, input, Input, OnInit, signal } from '@angular/core';
import { Food } from '../../../types/FoodSearchResult';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-food-card',
  imports: [MatCardModule],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css'
})
export class FoodCard implements OnInit{

  item=input.required<Food>();
  private foodId:number=0;
  protected unit:string='';
  protected calories:number=0;
  protected protein:number=0;

  constructor(){}
  
  ngOnInit(): void {
    this.getDetails(this.item().food_description);
    this.foodId=Number(this.item().food_id);
    console.log(this.foodId);
  }

  getDetails(description:string){
    const unitMatch=description.match(/^(Per [^-]+)/)
    const calMatch = description.match(/Calories: \s*(\d+)/);
    const proteinMatch=description.match(/Protein:\s*([\d.,]+)/i);

    this.unit=unitMatch?unitMatch[1].toString().trimEnd().toLowerCase():'';
    this.calories=calMatch?Number(calMatch[1]):0;
    this.protein=proteinMatch?parseFloat(proteinMatch[1].replace(',','.')):0;
  }

  getFoodDetails(){

  }
}
