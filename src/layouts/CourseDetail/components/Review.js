import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "./Instructor/Button";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      author: "Theresa Edin",
      avatar: "/placeholder.svg",
      rating: 4.9,
      date: "2 months ago",
      title: "Excellent Course",
      content:
        "Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est enim perferendis est neque sunt.",
    },
    {
      id: 2,
      author: "Theresa Edin",
      avatar: "/placeholder.svg",
      rating: 4.9,
      date: "2 months ago",
      title: "Excellent Course",
      content:
        "Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est enim perferendis est neque sunt.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">Review</h2>
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="font-medium">4.9 course rating</span>
          <span className="text-muted-foreground">• 4K ratings</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            <div>
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review.author}</h3>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(review.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{review.rating}</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground">{review.content}</p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful
                </button>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ThumbsDown className="w-4 h-4" />
                  Not helpful
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        View More Reviews →
      </Button>
    </div>
  );
}
