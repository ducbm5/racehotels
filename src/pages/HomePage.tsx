import React from 'react';
import { Link } from 'react-router-dom';
import { cities } from '../data';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="relative h-[500px] rounded-3xl overflow-hidden flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/marathon/1920/1080?blur=4" 
            alt="Marathon background" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            Chạy bộ là đam mê, <br />
            <span className="text-orange-500">Nghỉ ngơi là chiến thuật</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto font-medium">
            Tìm khách sạn gần vạch xuất phát nhất, hỗ trợ ăn sáng sớm và check-out muộn cho runner.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Link 
              to="/hotels/da-nang" 
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:scale-105"
            >
              Tìm khách sạn ngay
            </Link>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Xem các giải chạy sắp tới
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Giải chạy tiêu biểu</h2>
            <p className="text-gray-500">Chọn địa điểm để xem danh sách khách sạn phù hợp nhất.</p>
          </div>
          <Link to="/" className="text-orange-600 font-bold flex items-center gap-1 hover:underline">
            Tất cả địa điểm <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link 
              key={city.id} 
              to={`/hotels/${city.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img 
                src={`https://picsum.photos/seed/${city.slug}/600/800`} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(city.race_date).toLocaleDateString('vi-VN')}</span>
                </div>
                <h3 className="text-2xl font-black mb-1 uppercase leading-tight">{city.name}</h3>
                <p className="text-sm text-gray-300 line-clamp-1">{city.race_name}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Xem khách sạn <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-orange-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">
            Tại sao runner tin dùng <br /> RunnerHotels?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold">01</div>
              <h4 className="font-bold">Dữ liệu thực tế</h4>
              <p className="text-sm text-gray-500">Khoảng cách tới vạch xuất phát được đo đạc chính xác.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold">02</div>
              <h4 className="font-bold">Ưu tiên Runner</h4>
              <p className="text-sm text-gray-500">Chỉ liệt kê khách sạn có hỗ trợ ăn sáng sớm và check-out muộn.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold">03</div>
              <h4 className="font-bold">Đánh giá khách quan</h4>
              <p className="text-sm text-gray-500">Ưu/Nhược điểm được viết bởi chính các vận động viên.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold">04</div>
              <h4 className="font-bold">Tiết kiệm thời gian</h4>
              <p className="text-sm text-gray-500">Giao diện tối ưu cho việc scan nhanh và ra quyết định.</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 aspect-square bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <MapPin className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold">Bạn là chủ khách sạn?</h3>
          <p className="text-sm text-gray-500">Hãy liên hệ để đưa khách sạn của bạn vào danh sách Runner-friendly.</p>
          <button className="w-full bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-black transition-colors">
            Đăng ký ngay
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
