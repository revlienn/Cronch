import { Routes } from '@angular/router';
import { Home } from './home/home';
import { FoodDiary } from './foods/food-diary/food-diary';

export const routes: Routes = [
   {path:'',component:Home},
   {path:'diary',component:FoodDiary},
   {path:'**',component:Home}
];
