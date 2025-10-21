import { Component, computed, effect, inject, signal } from '@angular/core';
import { FoodService } from '../../services/food-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  protected foodService = inject(FoodService);
  protected total = computed(() => {
    const cartItems = this.foodService.list();
    return cartItems.reduce((totals, item) => ({
      calories: totals.calories + item.calories,
      protein: parseFloat((totals.protein + item.protein).toFixed(2))
    }),
      { calories: 0, protein: 0 }
    )
  })
  cartOpen = this.foodService.cartOpen();

  constructor() {
  }

  deleteGroup(id: number) {
    this.foodService.deleteGroup(id);
  }

  toggleCart() {
    const mainCart = document.getElementById('maincart');
    if (!mainCart) return;
    this.cartOpen = !this.cartOpen;
    this.foodService.cartToggleSignal();

    if (this.cartOpen) {
      setTimeout(() => {
      mainCart.classList.remove('hidden');
    }, 150);
      mainCart.classList.remove('translate-y-full');
      mainCart.classList.add('translate-y-0');
    } else {
      mainCart.classList.add('translate-y-full');
      mainCart.classList.remove('translate-y-0');
      setTimeout(() => {
      mainCart.classList.add('hidden');
    }, 150);
    }
  }
}

