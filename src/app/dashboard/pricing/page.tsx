'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const plans = [
  {
    name: 'Shuruwat',
    description: 'Business from start to end',
    variants: ['Gold', 'Silver', 'Platinum'],
    link: '/services/shuruwat',
    features: [
      '10 consultations per month',
      'Priority email & phone support',
      'Advanced analytics',
      'Calendar integration',
      'Custom booking page'
    ],
    popular: true
  },
  {
    name: 'Unnati',
    description: 'Scale up your business',
    variants: ['Gold', 'Silver', 'Platinum'],
    link: '/services/unnati',
    features: [
      '3 consultations per month',
      'Email support',
      'Basic analytics',
      'Calendar integration'
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl text-black font-bold mb-8">Pricing Plans</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-black text-center py-1 text-sm">
                Most Popular
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl text-black font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              {plan.variants && (
                <div className="mb-4">
                  <p className="text-gray-600">Available Variants:</p>
                  <ul className="list-disc list-inside">
                    {plan.variants.map((variant, variantIndex) => (
                      <li key={variantIndex} className="text-gray-600">{variant}</li>
                    ))}
                  </ul>
                </div>
              )}
              <ul className="space-y-3 mb-6">
                {plan.features && plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full py-2 px-4 rounded-lg font-medium bg-blue-600 text-black hover:bg-blue-700">
                <Link href={plan.link}>Learn More</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
