import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Food, FoodCardFacts, FoodCartItem } from '../../types/Food';
import { FoodSearchResult } from '../../types/FoodSearchResult';
import { FoodCard } from '../foods/food-card/food-card';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  public requestMade = signal<boolean>(false);

  public list = signal<FoodCardFacts[]>([]);
  public groupedList = signal<FoodCartItem[]>([]);
  public cartOpen=signal<boolean>(false);

  constructor() {
    const storedList = localStorage.getItem('items');
    if (storedList) {
      this.list.set(JSON.parse(storedList));
      this.updateCartGroup();
    }

    effect(() => {
      localStorage.setItem('items', JSON.stringify(this.list()));
    })
  }

  getFoodById(id: number) {
    this.requestMade.set(true);
    return this.http.get<Food>(this.baseUrl + 'food/' + id);
  }

  searchFood(query: string, page = 0, maxResults = 20) {
    this.requestMade.set(true);
    return this.http.get<FoodSearchResult>(this.baseUrl + `food/search?query=${query}&page=${page}&max_results=${maxResults}`)
  }

  addItemtoList(newItem: FoodCardFacts) {
    this.list.update((currentList) => [...currentList, newItem])
    this.updateCartGroup();
  }

  updateCartGroup() {
    const currentCartItems = this.list();
    const currentGroupedItems: FoodCartItem[] = [];

    for (const item of currentCartItems) {
      const existing = currentGroupedItems.find(i => i.id == item.id);
      if (existing) {
        existing.quantity += 1
      } else (currentGroupedItems.push({
        id: item.id,
        quantity: 1,
        name: item.name,
        protein: item.protein,
        calories: item.calories
      }))
    }

    this.groupedList.set(currentGroupedItems);
  }

  deleteGroup(id: number) {
    const newUngroupedList = this.list().filter(item => item.id !== id);
    this.list.set(newUngroupedList);
    this.updateCartGroup();
  }

  adjustCartItemQty(type: string, id: number) {
    const groupListCopy = this.groupedList();
    const itemInGroup = groupListCopy.find(group => group.id === id);
    
    const listCopy=this.list();
    const itemInList = listCopy.find(item => item.id === id);

    if (itemInGroup && itemInList) {
      if (type == 'add') {
        
        const updatedGroupList=groupListCopy.map((group)=>
          group.id===id?
            {...group,quantity:group.quantity+1}
            :group)

        this.groupedList.set(updatedGroupList);
        this.list.update(cur=>[...cur,itemInList]);

      }
      else if (type == 'min') {

        if (itemInGroup.quantity <= 1) {
          const updatedGroupList=groupListCopy.filter((group)=>group.id!==id);
          this.groupedList.set(updatedGroupList);

          const updatedList=listCopy.filter(item=>item.id!==id);
          this.list.set(updatedList);
        } 
        else{
          const updatedGroupList=groupListCopy.map((group)=>
            group.id===id?
              {...group,quantity:group.quantity-1}
              :group)
          this.groupedList.set(updatedGroupList);

          const updatedList=(()=>{
            const itemIndex = listCopy.indexOf(itemInList);
            if(itemIndex!==-1){
              return [...listCopy.slice(0,itemIndex),...listCopy.slice(itemIndex+1)]
            }else{
              return listCopy;
            }
          })();
          this.list.set(updatedList);
        }
      }
    }
  }

  clearList() {
    this.list.set([]);
  }

  cartToggleSignal(){
    this.cartOpen.update(status=>!status);
  }

}
