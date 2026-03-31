import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotels } from '../data';
import { Star, MapPin, CheckCircle, XCircle, Clock, Info, ExternalLink, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DetailPage: React.FC = () => {
  const { city: citySlug, hotel: hotelSlug } = useParams<{ city: string; hotel: string }>();
  const hotel = hotels.find(h => h.slug === hotelSlug && h.city === citySlug);

  if (!hotel) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy khách sạn này</h2>
        <Link to={`/hotels/${citySlug}`} className="text-orange-600 font-bold hover:underline">Quay lại danh sách</Link>
      </div>
    );
  }

  const RatingBar = ({ label, score }: { label: string; score: number }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
        <span>{label}</span>
        <span className="text-gray-900">{score}/5</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-600 rounded-full transition-all duration-1000" 
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <Link to={`/hotels/${citySlug}`} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Link>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><Heart className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <img 
              src={hotel.image_url} 
              alt={hotel.hotel_name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Gần Race</span>
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Runner-friendly</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight leading-tight text-gray-900">{hotel.hotel_name}</h1>
              <p className="text-gray-500 flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                {hotel.address}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Highlight nhanh</h3>
              <p className="text-gray-600 leading-relaxed italic">
                "{hotel.description}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {hotel.highlights.map((h, i) => (
                  <div key={i} className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col items-center text-center gap-2">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                    <span className="text-xs font-bold text-orange-900">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-3xl border border-green-100 space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-green-900 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Ưu điểm
                </h3>
                <ul className="space-y-3">
                  {hotel.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-red-900 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  Nhược điểm
                </h3>
                <ul className="space-y-3">
                  {hotel.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Phù hợp với ai</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.best_for.map((b, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl sticky top-24 space-y-8">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 block uppercase tracking-widest font-bold">Giá tham khảo</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-orange-600">{hotel.price_display.split(' - ')[0]}</span>
                <span className="text-gray-400 text-sm">/đêm</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Khoảng cách tới Race</span>
                <span className="font-bold text-gray-900">{hotel.distance_to_race}km</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Ăn sáng sớm (3:00 AM)</span>
                {hotel.early_breakfast ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Late Check-out (2:00 PM)</span>
                {hotel.late_checkout ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Giữ đồ sau Race</span>
                {hotel.luggage_storage ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Runner Rating</h4>
              <div className="space-y-4">
                <RatingBar label="Vị trí" score={hotel.rating_location} />
                <RatingBar label="Giá cả" score={hotel.rating_price} />
                <RatingBar label="Tiện nghi" score={hotel.rating_facility} />
                <RatingBar label="Runner-friendly" score={hotel.rating_runner} />
              </div>
            </div>

            <a 
              href={hotel.booking_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-orange-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              Đặt phòng ngay
              <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
              * Giá có thể thay đổi tùy thời điểm
            </p>
          </div>
        </aside>
      </section>

      <section className="bg-gray-900 text-white p-12 rounded-3xl space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Đánh giá chi tiết từ Runner</h2>
          <p className="text-gray-400">Dưới đây là những thông tin thực tế nhất về trải nghiệm lưu trú tại {hotel.hotel_name} trong các mùa giải trước.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="font-bold text-orange-500 uppercase tracking-widest text-sm">Vị trí & Di chuyển</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Vị trí là điểm cộng lớn nhất. Bạn chỉ cần đi bộ khoảng 5-10 phút là tới khu vực Expo và vạch xuất phát. Không cần lo lắng về việc gọi xe hay kẹt đường vào sáng sớm.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-orange-500 uppercase tracking-widest text-sm">Phòng & Tiện nghi</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Phòng được cách âm khá tốt, giúp bạn có giấc ngủ sâu trước ngày đua. Giường êm và có đầy đủ nước uống bù điện giải miễn phí trong phòng.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-orange-500 uppercase tracking-widest text-sm">Ăn uống</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Nhà hàng hiểu tâm lý runner nên thực đơn sáng sớm có nhiều tinh bột chậm (oatmeal, chuối, bánh mì đen) thay vì chỉ đồ ăn dầu mỡ thông thường.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-orange-500 uppercase tracking-widest text-sm">Phục hồi sau Race</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Khu vực spa có gói massage chuyên sâu cho chân sau race rất hiệu quả. Bể bơi nước lạnh cũng là một cách recovery tuyệt vời.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
