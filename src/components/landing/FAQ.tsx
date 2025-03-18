import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I upload a CSV file?',
    answer: 'Simply click the "Upload CSV" button in your dashboard and select your file, or drag and drop it into the designated area. We support all standard CSV formats.',
  },
  {
    question: 'Can I schedule emails?',
    answer: 'Yes! HazarVejo allows you to schedule emails for future dates and times. You can also set up recurring campaigns for regular communications.',
  },
  {
    question: 'What analytics are available?',
    answer: 'We provide comprehensive analytics including open rates, click-through rates, bounce rates, and geographical data. You can also export detailed reports for further analysis.',
  },
  {
    question: 'Is there a limit to the number of recipients?',
    answer: 'Limits vary by plan. Basic plans support up to 1,000 recipients per month, Pro plans up to 10,000, and Enterprise plans offer custom limits based on your needs.',
  },
];

const FAQ = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Find answers to common questions about HazarVejo
          </p>
        </div>

        <div className="mt-12">
          <dl className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <dt className="text-lg font-medium text-gray-900 flex items-center">
                  <HelpCircle className="h-5 w-5 text-indigo-500 mr-2" />
                  {faq.question}
                </dt>
                <dd className="mt-2 text-gray-500 ml-7">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;