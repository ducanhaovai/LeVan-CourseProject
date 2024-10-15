import { Star, User } from "lucide-react";

const ReviewTab = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      rating: 5,
      comment: "This course was incredibly helpful in setting up my online school!",
    },
    {
      name: "Bob Smith",
      rating: 4,
      comment: "Great content, but I wish there were more advanced topics covered.",
    },
    {
      name: "Carol Williams",
      rating: 5,
      comment: "The instructor's explanations were clear and easy to follow. Highly recommended!",
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-6 h-6 text-gray-400" />
              <span className="font-semibold">{review.name}</span>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
