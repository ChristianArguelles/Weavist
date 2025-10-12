import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-weave p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
            <p className="mb-4 text-gray-700">
              By accessing and using Weavist, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Use License</h2>
            <p className="mb-4 text-gray-700">
              Permission is granted to temporarily download one copy of Weavist per device for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on Weavist</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">3. User Accounts</h2>
            <p className="mb-4 text-gray-700">
              When you create an account with us, you must provide information that is accurate, complete, 
              and current at all times. You are responsible for safeguarding the password and for all activities 
              that occur under your account.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Prohibited Uses</h2>
            <p className="mb-4 text-gray-700">You may not use our service:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Privacy Policy</h2>
            <p className="mb-4 text-gray-700">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
              information when you use our service. By using our service, you agree to the collection and use of 
              information in accordance with this policy.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Purchases and Payments</h2>
            <p className="mb-4 text-gray-700">
              When you make a purchase through our platform, you agree to provide current, complete, and accurate 
              purchase and account information. You agree to pay all charges incurred by users of your credit card, 
              debit card, or other payment method used in connection with a purchase or transaction.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">7. Returns and Refunds</h2>
            <p className="mb-4 text-gray-700">
              We reserve the right to refuse or cancel your order at any time for certain reasons including but not 
              limited to: product or service availability, errors in the description or price of the product or service, 
              or error in your order. We reserve the right to refuse or cancel your order if fraud or an unauthorized 
              or illegal transaction is suspected.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">8. Content</h2>
            <p className="mb-4 text-gray-700">
              Our service allows you to post, link, store, share and otherwise make available certain information, 
              text, graphics, videos, or other material. You are responsible for the content that you post to the 
              service, including its legality, reliability, and appropriateness.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">9. Termination</h2>
            <p className="mb-4 text-gray-700">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice 
              or notice, under our sole discretion, for any reason whatsoever and without limitation, including but not 
              limited to a breach of the Terms.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">10. Changes to Terms</h2>
            <p className="mb-4 text-gray-700">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">11. Contact Information</h2>
            <p className="mb-4 text-gray-700">
              If you have any questions about these Terms and Conditions, please contact us at support@weavist.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
