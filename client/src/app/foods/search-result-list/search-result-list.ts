import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { FoodSearchResult } from '../../../types/FoodSearchResult';
import { FoodCard } from '../food-card/food-card';
import { BusyService } from '../../services/busy-service';

@Component({
  selector: 'app-search-result-list',
  imports: [FoodCard],
  templateUrl: './search-result-list.html',
  styleUrl: './search-result-list.css'
})
export class SearchResultList {
  protected busyService = inject(BusyService);
  protected lessThan100=signal<boolean>(false);

  result = input.required<FoodSearchResult | null>();
  resultLength = computed(() => {
    const total = Number(this.result()?.foods?.total_results);
    return isNaN(total) ? 0 : total;
  });

  constructor(){
    effect(()=>{
      const total=this.resultLength();
      if(total>0 && total <101) this.lessThan100.set(true);
    })
  }
}
