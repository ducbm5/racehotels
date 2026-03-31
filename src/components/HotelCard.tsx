import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Clock, Info } from 'lucide-react';
import { Hotel } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col md:flex-row">
      <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
        <img 
          src={hotel.image_url} 
          alt={hotel.hotel_name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {hotel.distance_to_race <= 0.5 && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">Gần Race</span>
          )}
          {hotel.runner_friendly && (
            <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">Runner-friendly</span>
          )}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                <Link to={`/hotels/${hotel.city}/${hotel.slug}`}>{hotel.hotel_name}</Link>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block uppercase tracking-tighter">Giá từ</span>
              <span className="font-bold text-orange-600">{hotel.price_display.split(' - ')[0]}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Cách Race: <strong className="text-gray-900">{hotel.distance_to_race}km</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="capitalize">{hotel.price_range}</span>
            </div>
          </div>

          <div className="space-y-1.5 mb-4">
            {hotel.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-1">
            {hotel.early_breakfast && <div title="Ăn sáng sớm" className="p-1.5 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-4 h-4" /></div>}
            {hotel.late_checkout && <div title="Check-out muộn" className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><CheckCircle className="w-4 h-4" /></div>}
            {hotel.luggage_storage && <div title="Giữ đồ" className="p-1.5 bg-green-50 text-green-600 rounded-lg"><MapPin className="w-4 h-4" /></div>}
          </div>
          <Link 
            to={`/hotels/${hotel.city}/${hotel.slug}`}
            className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            Xem chi tiết →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
