/* eslint-disable react/jsx-no-undef */
import { Star, Users, BookOpen } from "lucide-react";
import anh from "../../../../assets/images/user/LeVan.jpg"
import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { FacebookIcon, InstagramIcon, SocialButton, TiktokIcon, TwitterIcon } from "./SocialButton";

export default function Instructor() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Instructor</h2>
      <Card>
        <div className="p-6">
          <div className="flex gap-6">
          <Avatar 
  src={anh}
  alt="Theresa Edin" 
  fallback="TE" 
  className="h-52" 
/>


            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-semibold">Le Van</h3>
                <p className="text-muted-foreground">Professional Tatto, Beauty</p>
              </div>
{/* 
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">4.9</span>
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <Star className="w-4 h-4 fill-primary text-primary" strokeWidth={0.5} />
                  <span className="text-muted-foreground">(315,475 Reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>345 Students</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>34 Course</span>
                </div>
              </div> */}

              <p className="text-sm text-muted-foreground">
              Tôi đã tổ chức các khóa học tại nhiều quốc gia như Nhật Bản, Hàn Quốc, Indonesia, Malaysia và làm việc với hàng trăm học viên quốc tế. Điều tôi luôn nhận được là câu hỏi về bí quyết thành công trong lĩnh vực này. Đây chính là thời điểm lý tưởng để bạn đầu tư cho bản thân và phát triển sự nghiệp. Hãy để tôi đồng hành cùng bạn trên hành trình chinh phục thành công!
              </p>

              <div className="flex gap-2">
                <SocialButton icon={<FacebookIcon />} href="https://www.facebook.com/yumi.ling.9?locale=vi_VN" />
                <SocialButton icon={<TiktokIcon />} href="https://www.instagram.com/levan.academy_hyper.realistic/" />
                <SocialButton icon={<InstagramIcon />} href="#" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
