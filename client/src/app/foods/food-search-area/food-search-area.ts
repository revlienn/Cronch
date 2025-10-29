import { Component, effect, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FoodService } from '../../services/food-service';
import { FoodSearchResult } from '../../../types/FoodSearchResult';
import { SearchResultList } from '../search-result-list/search-result-list';

@Component({
  selector: 'app-food-search-area',
  imports: [MatCardModule, MatInputModule, MatIconModule, ReactiveFormsModule, SearchResultList],
  templateUrl: './food-search-area.html',
  styleUrl: './food-search-area.css'
})
export class FoodSearchArea {

  protected foodService = inject(FoodService);
  protected screenMobile = signal<boolean>(false);
  searchResult = signal<FoodSearchResult | null>(null)
  searched = signal<boolean>(false);

  constructor() {
    effect(() => {
      window.addEventListener('resize', () => {
        if(window.innerWidth<=768){
          this.screenMobile.set(true);
        }else{
          this.screenMobile.set(false);
        }
      })
    })
  }

  searchTerm = new FormControl('apple', {
    validators: [Validators.required, Validators.minLength(4)]
  })

  searchForm = new FormGroup({
    searchTerm: this.searchTerm
  })

  search() {
    if (this.searchForm.valid) {
      this.searched.set(true);
      const term = this.searchTerm.value?.trim();
      if (term) {
        this.foodService.searchFood(term).subscribe((res) => this.searchResult.set(res))

      }
    }
  }

}
