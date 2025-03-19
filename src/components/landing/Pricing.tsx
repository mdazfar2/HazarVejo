import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PaymentModal from '../payment/PaymentModal';

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for testing HazarVejo',
    features: [
      'First 1,000 emails completely free',
      'HTML email editor',
      'CSV file upload',
      'Email preview and test emails',
    ],
    cta: 'Get Started for Free 🚀',
    popular: false,
    buttonStyle: 'primary',
  },
  {
    name: 'Basic',
    price: '150',
    priceDetail: 'per 1,000 emails',
    description: 'After first free 1,000 emails',
    features: [
      ' HTML email editor',
      ' Basic real-time analytics',
      ' CSV file upload',
      ' Email preview and test emails',
    ],
    cta: 'Choose Plan',
    popular: true,
    buttonStyle: 'primary',
  },
  {
    name: 'Pro',
    price: '1,000',
    priceDetail: 'per 10,000 emails',
    description: 'Includes 10,000 emails',
    features: [
      'Everything in Basic Plan',
      ' Advanced analytics (device, location)',
      ' A/B testing',
      ' Scheduled email sending',
      ' Pre-designed templates',
      ' Priority support',
    ],
    cta: 'Choose Plan',
    popular: false,
    buttonStyle: 'primary',
  },
  {
    name: 'Enterprise',
    price: '9,999',
    period: 'month',
    description: 'Send Unlimited Emails',
    features: [
      'Everything in Pro Plan',
      ' Unlimited Emails (Custom Pricing)',
      ' API Access and Team Collaboration',
      ' 24/7 Priority Support',
      ' Custom Domain and Branding',
      ' Advanced Analytics',
      ' A/B Testing',
      ' Pre-designed Templates',
    ],
    cta: ['Choose Plan', 'Contact Us for Custom Pricing'],
    popular: false,
    buttonStyle: ['primary', 'secondary'],
  },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <div className="px-6 py-8">
                  {plan.popular && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-500">{plan.description}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">₹{plan.price}</span>
                    {plan.period && (
                      <span className="ml-1 text-xl text-gray-500">/{plan.period}</span>
                    )}
                    {plan.priceDetail && (
                      <span className="ml-1 text-xl text-gray-500">{plan.priceDetail}</span>
                    )}
                  </div>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 space-y-3">
                    {Array.isArray(plan.cta) ? (
                      plan.cta.map((button, i) => (
                        <button
                          key={i}
                          onClick={() => handlePlanSelect(plan)}
                          className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                            plan.buttonStyle[i] === 'primary'
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          {button}
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={() => handlePlanSelect(plan)}
                        className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                          plan.buttonStyle === 'primary'
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {plan.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-medium text-indigo-600">
            Ready to supercharge your email campaigns? Choose the plan that fits your needs and start sending emails today! 🚀
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default Pricing;