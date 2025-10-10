import { Component, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FoodService } from '../../services/food-service';
import { map } from 'rxjs';
import { Food, FoodSearchResult } from '../../../types/FoodSearchResult';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-food-search-area',
  imports: [MatCardModule,MatInputModule,MatIconModule,ReactiveFormsModule,JsonPipe],
  templateUrl: './food-search-area.html',
  styleUrl: './food-search-area.css'
})
export class FoodSearchArea {

  private foodService=inject(FoodService);
  searchResult=signal<Food[]|null>(null)

  searchTerm=new FormControl('apple',{
    validators:[Validators.required,Validators.minLength(4)]
  })

  searchForm=new FormGroup({
    searchTerm:this.searchTerm
  })

  search(){
    if(this.searchForm.valid){
      const term=this.searchTerm.value?.trim();
      if(term){
        this.foodService.searchFood(term).pipe(map((res)=>res.foods.food)).subscribe((res)=>this.searchResult.set(res))

      }
    }
  }

}
