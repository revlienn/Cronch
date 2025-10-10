import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Food} from '../../types/Food';
import { FoodSearchResult } from '../../types/FoodSearchResult';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private http=inject(HttpClient);
  private baseUrl=environment.apiUrl;

  getFoodById(id:number){
    return this.http.get<Food>(this.baseUrl+'food/'+id);
  }

  searchFood(query:string, page=0, maxResults=20){
    return this.http.get<FoodSearchResult>(this.baseUrl+`food/search?query=${query}&page=${page}&max_results=${maxResults}`)
  }
  
}
