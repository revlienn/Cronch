import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {Food, FoodCardFacts} from '../../types/Food';
import { FoodSearchResult } from '../../types/FoodSearchResult';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private http=inject(HttpClient);
  private baseUrl=environment.apiUrl;

  public requestMade=signal<boolean>(false);

  public list=signal<FoodCardFacts[]>([]);

  constructor(){
    const storedList=localStorage.getItem('items');
    if(storedList){
      this.list.set(JSON.parse(storedList));
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
  }

  deleteGroup(id:number){
    const currentGroup=this.list();
    const updatedGroup=currentGroup.filter(item=>item.id!==id);
    this.list.set(updatedGroup);
  }

  clearList(){
    this.list.set([]);
  }
  
}
