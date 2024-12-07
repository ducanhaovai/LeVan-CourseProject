import { Zap } from "lucide-react";
import anh1 from "../../../../assets/images/home-decor-2.jpg";
export default function NumberStudent() {
  return (
    <div className="container mx-auto px-4 ">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#FFF5F5] rounded-full px-4 py-2">
            <Zap className="w-4 h-4 text-[#FF7235]" />
            <span className="text-sm">Your Instructor</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#14142B] leading-tight">
              Learn Latest Skills; Advance Your Career
            </h1>
            <p className="text-[#4E4B66] text-lg">
              Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex tempor incididunt
              labore dolore magna aliquaenim minim.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-medium text-[#14142B]">45</div>
              <div className="text-[#4E4B66] text-sm">Lesson</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-[#14142B]">20500+</div>
              <div className="text-[#4E4B66] text-sm">Students</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-[#14142B]">24+</div>
              <div className="text-[#4E4B66] text-sm">Learning Hours</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-[#14142B]">563.000+</div>
              <div className="text-[#4E4B66] text-sm">Learning Hours</div>
            </div>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="relative">
          <div className="relative w-full aspect-square">
            <img src={anh1} alt="Students learning" className="w-full h-full object-contain" />
            {/* BRAND text vertical */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full -rotate-90 text-[#FF7235] tracking-widest font-medium">
              BRAND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
