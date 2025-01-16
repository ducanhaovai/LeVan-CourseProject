import React from "react";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HeaderLanding() {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#FFF5F5] rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-[#FF7235]" />
              <span className="text-sm">Xin chào, tôi là Lê Vân</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#14142B]">
                Chuyên gia <span className="text-[#FF7235]">phun xăm</span> thẩm mỹ 
                <br className="hidden md:block" />
                với hơn 10 năm kinh nghiệm.
              </h1>
              <p className="text-[#4E4B66] text-base md:text-lg">          
  Tôi đã tổ chức các khóa học tại nhiều quốc gia như Nhật Bản, Hàn Quốc, Indonesia, Malaysia và làm việc với hàng trăm học viên 
quốc tế. Điều tôi luôn nhận được là câu hỏi về bí quyết thành công trong lĩnh vực này. Đây chính là thời 
điểm lý tưởng để bạn đầu tư cho bản thân và phát triển sự nghiệp. Hãy để tôi đồng hành cùng bạn trên 
hành trình chinh phục thành công!
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button  onClick={() => navigate("/course")} className="bg-[#14142B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#14142B]/90 transition-colors inline-flex items-center justify-center">
                  Khám phá ngay <span className="ml-2">→</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src="/placeholder.svg"
                        alt={`Student ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-[#FF7235]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#4E4B66]">35k+ happy students</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden md:block">
            <div className="aspect-square relative">
              <img
                src="https://upskillnextjs.vercel.app/images/page-title/page-title-home1.png"
                alt="UpSkill Learning"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
