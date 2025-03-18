import React from 'react';

const testimonials = [
  {
    content: "HazarVejo has transformed our email marketing strategy. The real-time analytics and easy-to-use interface have made our campaigns more effective than ever.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
  },
  {
    content: "The batch sending feature and customizable templates have saved us countless hours. Our email campaigns are now more personalized and engaging.",
    author: "Michael Chen",
    role: "Growth Manager",
    company: "StartupX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
  },
  {
    content: "Outstanding support and powerful features. HazarVejo has helped us achieve a 40% increase in our email open rates.",
    author: "Emily Rodriguez",
    role: "Email Specialist",
    company: "Global Solutions",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Don't just take our word for it - hear from some of our satisfied customers
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;