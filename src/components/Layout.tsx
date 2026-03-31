import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-orange-600">
            <MapPin className="w-6 h-6" />
            <span>RunnerHotels</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-orange-600 transition-colors">Trang chủ</Link>
            <Link to="/hotels/da-nang" className="hover:text-orange-600 transition-colors">Đà Nẵng</Link>
            <Link to="/hotels/ha-noi" className="hover:text-orange-600 transition-colors">Hà Nội</Link>
            <Link to="/hotels/ho-chi-minh" className="hover:text-orange-600 transition-colors">TP. HCM</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors shadow-sm">
              Đăng ký giải chạy
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-600">RunnerHotels</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Hệ thống tìm kiếm khách sạn tối ưu cho vận động viên marathon. Chúng tôi giúp bạn tập trung vào cuộc đua, không phải việc tìm chỗ ở.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên kết nhanh</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><Link to="/" className="hover:text-orange-600">Về chúng tôi</Link></li>
              <li><Link to="/" className="hover:text-orange-600">Chính sách bảo mật</Link></li>
              <li><Link to="/" className="hover:text-orange-600">Điều khoản sử dụng</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 cursor-pointer transition-colors">FB</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 cursor-pointer transition-colors">IG</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 cursor-pointer transition-colors">YT</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 RunnerHotels. Thiết kế bởi Runner cho Runner.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
