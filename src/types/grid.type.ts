export interface Product {
  name: string
  description: string
  brand: string
  categories: string[]
  type: string
  price: number
  price_range: string
  image: string
  url: string
  free_shipping: boolean
  popularity: number
  rating: number
  objectID: string
  category_lvl0: string
  category_lvl1: string
}

export interface CategoryLvl0 {
  name: string
  quantity: number
  lv1: CategoryLvl1[]
}

export interface Brand {
  name: string
  quantity: number
}

export interface CategoryLvl1 {
  name: string
  quantity: number
}

export interface Rating {
  rating: number
  quantity: number
}
