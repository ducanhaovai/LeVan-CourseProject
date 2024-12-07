/* eslint-disable react/jsx-no-undef */
import { Star, Users, BookOpen } from "lucide-react";
import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { FacebookIcon, InstagramIcon, SocialButton, TwitterIcon } from "./SocialButton";

export default function Instructor() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Instructor</h2>
      <Card>
        <div className="p-6">
          <div className="flex gap-6">
            <Avatar src="/placeholder.svg" alt="Theresa Edin" fallback="TE" className="h-24 w-24" />

            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-semibold">Theresa Edin</h3>
                <p className="text-muted-foreground">Professional Web Developer</p>
              </div>

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
              </div>

              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis
                molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est
                enim perferendis est neque sunt.
              </p>

              <div className="flex gap-2">
                <SocialButton icon={<FacebookIcon />} href="#" />
                <SocialButton icon={<TwitterIcon />} href="#" />
                <SocialButton icon={<InstagramIcon />} href="#" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
