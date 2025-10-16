import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {Food, FoodCardFacts, FoodCartItem} from '../../types/Food';
import { FoodSearchResult } from '../../types/FoodSearchResult';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private http=inject(HttpClient);
  private baseUrl=environment.apiUrl;

  public requestMade=signal<boolean>(false);

  public list=signal<FoodCardFacts[]>([]);
  public groupedList=signal<FoodCartItem[]>([]);

  constructor(){
    const storedList=localStorage.getItem('items');
    if(storedList){
      this.list.set(JSON.parse(storedList));
      this.updateCartGroup();
    }

    effect(()=>{
      localStorage.setItem('items',JSON.stringify(this.list()));
    })
  }

  getFoodById(id:number){
    this.requestMade.set(true);
    return this.http.get<Food>(this.baseUrl+'food/'+id);
  }

  searchFood(query:string, page=0, maxResults=20){
    this.requestMade.set(true);
    return this.http.get<FoodSearchResult>(this.baseUrl+`food/search?query=${query}&page=${page}&max_results=${maxResults}`)
  }

  addItemtoList(newItem:FoodCardFacts){
    this.list.update((currentList)=>[...currentList,newItem])
    this.updateCartGroup();
  }

  updateCartGroup(){
    const currentCartItems=this.list();
    const currentGroupedItems:FoodCartItem[]=[];

    for(const item of currentCartItems){
      const existing=currentGroupedItems.find(i=>i.id==item.id);
      if(existing){
        existing.quantity+=1
      }else(currentGroupedItems.push({
        id:item.id,
        quantity:1,
        name:item.name,
        protein:item.protein,
        calories:item.calories
      }))
    }

    this.groupedList.set(currentGroupedItems);
  }

  deleteGroup(id:number){
    const newUngroupedList=this.list().filter(item=>item.id!==id);
    this.list.set(newUngroupedList);
    this.updateCartGroup();
  }

  clearList(){
    this.list.set([]);
  }
  
}
