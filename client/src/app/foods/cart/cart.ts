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
  protected groupedItems=signal<FoodCartItem[]>([]);

  constructor(){
    effect(()=>{
      const currentList=this.foodService.list();
      const grouped=this.getGroupQuantity(currentList);
      this.groupedItems.set(grouped);
      this.total();
    })
  }

  getGroupQuantity(items:FoodCardFacts[]):FoodCartItem[]{
    const grouped:FoodCartItem[]=[];

    for(const item of items){
      const existing=grouped.find(i=>i.id==item.id);
      if(existing){
        existing.quantity++;
      }else{
        grouped.push({id:item.id, name:item.name, quantity:1, calories:item.calories, protein:item.protein})
      }
    }

    return grouped
  }

  deleteGroup(id:number){
    this.foodService.deleteGroup(id);
  }
}
