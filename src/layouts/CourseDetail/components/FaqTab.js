const FaqTab = () => {
  const faqs = [
    {
      q: "What is LearnPress?",
      a: "LearnPress is a WordPress plugin that allows you to create and manage online courses.",
    },
    {
      q: "Do I need coding experience?",
      a: "No, LearnPress is designed to be user-friendly and doesn't require coding knowledge.",
    },
    {
      q: "Can I sell courses with LearnPress?",
      a: "Yes, LearnPress integrates with various payment gateways to allow course sales.",
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqTab;
