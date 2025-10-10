import { FoodBase } from "./FoodBase"

export type FoodSearchResult={
   foods:Foods
}

export type Foods={
   food:Food[]
   max_results:string
   page_number:string
   total_results:string
}

export type Food= FoodBase & {
  brand_name?: string
  food_description: string
}