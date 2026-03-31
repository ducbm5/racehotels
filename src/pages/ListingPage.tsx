import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotels, cities } from '../data';
import HotelCard from '../components/HotelCard';
import { Filter, ChevronDown, MapPin, Calendar, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ListingPage: React.FC = () => {
  const { city: citySlug } = useParams<{ city: string }>();
  const city = cities.find(c => c.slug === citySlug);
  const cityHotels = hotels.filter(h => h.city === citySlug);

  const [filterDistance, setFilterDistance] = useState<number | null>(null);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [filterRunnerFriendly, setFilterRunnerFriendly] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');

  const filteredHotels = useMemo(() => {
    let result = [...cityHotels];

    if (filterDistance) {
      result = result.filter(h => h.distance_to_race <= filterDistance);
    }

    if (filterPrice) {
      result = result.filter(h => h.price_range === filterPrice);
    }

    if (filterRunnerFriendly) {
      result = result.filter(h => h.runner_friendly);
    }

    result.sort((a, b) => {
      if (sortBy === 'distance') return a.distance_to_race - b.distance_to_race;
      if (sortBy === 'price') {
        const priceA = parseInt(a.price_display.split(' - ')[0].replace(/\D/g, ''));
        const priceB = parseInt(b.price_display.split(' - ')[0].replace(/\D/g, ''));
        return priceA - priceB;
      }
      if (sortBy === 'rating') return b.rating_runner - a.rating_runner;
      return 0;
    });

    return result;
  }, [cityHotels, filterDistance, filterPrice, filterRunnerFriendly, sortBy]);

  if (!city) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy thành phố này</h2>
        <Link to="/" className="text-orange-600 font-bold hover:underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(city.race_date).toLocaleDateString('vi-VN')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
            Khách sạn tại {city.name}
          </h1>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-orange-600" />
            Giải chạy: <strong className="text-gray-900">{city.race_name}</strong>
          </p>
        </div>
        <div className="bg-orange-50 px-4 py-3 rounded-2xl border border-orange-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold">
            {cityHotels.length}
          </div>
          <div className="text-sm">
            <p className="font-bold text-gray-900">Khách sạn gợi ý</p>
            <p className="text-gray-500 text-xs">Đã kiểm duyệt bởi Runner</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-6 shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Filter className="w-4 h-4 text-orange-600" />
                Bộ lọc
              </h3>
              <button 
                onClick={() => {
                  setFilterDistance(null);
                  setFilterPrice(null);
                  setFilterRunnerFriendly(false);
                }}
                className="text-xs text-orange-600 hover:underline font-medium"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Khoảng cách tới Race</h4>
              <div className="space-y-2">
                {[0.5, 1, 3, 5].map(d => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="distance" 
                      checked={filterDistance === d}
                      onChange={() => setFilterDistance(d)}
                      className="w-4 h-4 accent-orange-600"
                    />
                    <span className={cn("text-sm transition-colors", filterDistance === d ? "text-orange-600 font-bold" : "text-gray-600 group-hover:text-gray-900")}>
                      Dưới {d}km
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Phân khúc giá</h4>
              <div className="space-y-2">
                {['budget', 'mid', 'luxury'].map(p => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      checked={filterPrice === p}
                      onChange={() => setFilterPrice(p)}
                      className="w-4 h-4 accent-orange-600"
                    />
                    <span className={cn("text-sm capitalize transition-colors", filterPrice === p ? "text-orange-600 font-bold" : "text-gray-600 group-hover:text-gray-900")}>
                      {p === 'budget' ? 'Giá rẻ' : p === 'mid' ? 'Trung cấp' : 'Cao cấp'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filterRunnerFriendly}
                  onChange={(e) => setFilterRunnerFriendly(e.target.checked)}
                  className="w-4 h-4 accent-orange-600"
                />
                <span className={cn("text-sm transition-colors", filterRunnerFriendly ? "text-orange-600 font-bold" : "text-gray-600 group-hover:text-gray-900")}>
                  Runner-friendly
                </span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-3">
            <h4 className="font-bold text-blue-900 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Mẹo cho Runner
            </h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Nên chọn khách sạn trong bán kính 1km để có thể đi bộ tới vạch xuất phát, tránh kẹt xe vào sáng sớm ngày đua.
            </p>
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Hiển thị <strong>{filteredHotels.length}</strong> khách sạn</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Sắp xếp:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer hover:text-orange-600"
              >
                <option value="distance">Gần nhất</option>
                <option value="price">Giá thấp nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">Không tìm thấy khách sạn phù hợp</h3>
                <p className="text-gray-500 text-sm">Thử thay đổi bộ lọc để xem thêm kết quả.</p>
                <button 
                  onClick={() => {
                    setFilterDistance(null);
                    setFilterPrice(null);
                    setFilterRunnerFriendly(false);
                  }}
                  className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold text-sm"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
