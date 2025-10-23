import { FoodBase } from "./FoodBase"

export type Food = FoodBase & {
   servings: Servings
}

export type Servings = {
   serving: Serving[]
}

export type Serving = {
   serving_id: string
   serving_description: string
   serving_url: string
   metric_serving_amount: string
   metric_serving_unit: string
   number_of_units: string
   measurement_description: string
   calories: string
   carbohydrate: string
   protein: string
   fat: string
   saturated_fat: string
   polyunsaturated_fat: string
   monounsaturated_fat: string
   cholesterol: string
   sodium: string
   potassium: string
   fiber: string
   sugar: string
   vitamin_a: string
   vitamin_c: string
   calcium: string
   iron: string
}

export type FoodCardFacts={
   id:number
   name:string
   unit:string
   calories:number
   protein:number
   fat:number
   carbs:number
   brand?:string
   timestamp:Date
}

export type FoodCartItem={
   id:number
   name:string
   quantity:number
   calories:number
   protein:number
}