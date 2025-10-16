import { Component, computed, effect, inject, signal } from '@angular/core';
import { FoodService } from '../../services/food-service';
import { FoodCardFacts, FoodCartItem } from '../../../types/Food';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  protected foodService=inject(FoodService);
  protected total=computed(()=>{
    const cartItems=this.foodService.list();
    return cartItems.reduce((totals,item)=>({
      calories:totals.calories+item.calories,
      protein:parseFloat((totals.protein+item.protein).toFixed(2))
    }),
    {calories:0,protein:0}
  )
  })

  constructor(){
  }

  deleteGroup(id:number){
    this.foodService.deleteGroup(id);
  }
}
