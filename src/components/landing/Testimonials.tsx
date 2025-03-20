import React from 'react';

const testimonials = [
  {
    content: "HazarVejo has transformed our email marketing strategy. The real-time analytics and easy-to-use interface have made our campaigns more effective than ever.",
    author: "Nitish Kumar",
    role: "Marketing Director",
    company: "TechCorp",
    image: "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
  },
  {
    content: "The batch sending feature and customizable templates have saved us countless hours. Our email campaigns are now more personalized and engaging.",
    author: "Manikant Singh",
    role: "Growth Manager",
    company: "StartupX",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGsJkLXOXLK7A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705076777573?e=1747872000&v=beta&t=4gdOrk25tAALmHuXe77psvJ8DP3cIhAdh7hN6haRWhU",
  },
  {
    content: "Outstanding support and powerful features. HazarVejo has helped us achieve a 40% increase in our email open rates.",
    author: "Anuj Gaurave",
    role: "Email Specialist",
    company: "Global Solutions",
    image: "https://media.licdn.com/dms/image/v2/D5603AQF26gs73A5ZEw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731777802395?e=1747872000&v=beta&t=VaNK-F1hOnb4gBQ-xtkKoPrcvuMoVBqhcavBfIhr9tg",
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