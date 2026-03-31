export interface Hotel {
  id: string;
  hotel_name: string;
  slug: string;
  city: string;
  stars: number;
  address: string;
  distance_to_race: number; // km
  price_range: 'budget' | 'mid' | 'luxury';
  price_display: string;
  rating_location: number;
  rating_price: number;
  rating_facility: number;
  rating_runner: number;
  highlights: string[];
  pros: string[];
  cons: string[];
  early_breakfast: boolean;
  late_checkout: boolean;
  luggage_storage: boolean;
  runner_friendly: boolean;
  best_for: string[];
  booking_url: string;
  image_url: string;
  description: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  race_name: string;
  race_date: string;
}
