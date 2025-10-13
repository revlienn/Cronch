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
  protected unit:string='';
  protected calories:number=0;
  protected protein:number=0;

  constructor(){}
  
  ngOnInit(): void {
    this.getDetails(this.item().food_description);
  }

  getDetails(description:string){
    const unitMatch=description.match(/^(Per [^-]+)/)
    const calMatch = description.match(/Calories: \s*(\d+)/);
    const proteinMatch=description.match(/Protein:\s*(\d+_)/);

    this.unit=unitMatch?unitMatch[1].toString().trimEnd():'';
    this.calories=calMatch?Number(calMatch[1]):0;
    this.protein=proteinMatch?Number(proteinMatch[1]):0;
  }
}
