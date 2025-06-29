import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Calendar, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using CareerSpark ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                CareerSpark is an AI-powered career guidance platform that provides:
              </p>
              <ul>
                <li>Personalized career recommendations based on user input</li>
                <li>Skill development suggestions and learning resources</li>
                <li>CV templates and career planning tools</li>
                <li>AI chatbot assistance for career-related questions</li>
                <li>Voice input capabilities (when configured)</li>
              </ul>

              <h2>3. User Accounts</h2>
              <p>
                To access certain features of the Service, you may be required to create an account. You are responsible for:
              </p>
              <ul>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Updating your information to keep it current</li>
              </ul>

              <h2>4. User Content and Data</h2>
              <p>
                When you use our Service, you may provide personal information including:
              </p>
              <ul>
                <li>Educational background and experience</li>
                <li>Career interests and goals</li>
                <li>Voice recordings (if using voice features)</li>
                <li>Progress tracking data</li>
              </ul>
              <p>
                You retain ownership of your content, but grant us a license to use it to provide and improve our services.
              </p>

              <h2>5. AI-Generated Content</h2>
              <p>
                Our Service uses artificial intelligence to generate career recommendations and guidance. Please note:
              </p>
              <ul>
                <li>AI recommendations are suggestions, not guarantees</li>
                <li>Results may vary based on individual circumstances</li>
                <li>We recommend consulting with career professionals for major decisions</li>
                <li>AI-generated content should be used as a starting point for your career exploration</li>
              </ul>

              <h2>6. Voice Processing</h2>
              <p>
                If you use our voice input features:
              </p>
              <ul>
                <li>Voice data is processed through third-party services (ElevenLabs)</li>
                <li>Voice recordings are temporarily stored for processing</li>
                <li>We do not permanently store voice recordings</li>
                <li>You can opt out of voice features at any time</li>
              </ul>

              <h2>7. Prohibited Uses</h2>
              <p>
                You may not use our Service to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Use the Service for commercial purposes without permission</li>
              </ul>

              <h2>8. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by CareerSpark and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h2>9. Third-Party Services</h2>
              <p>
                Our Service integrates with third-party services including:
              </p>
              <ul>
                <li>Supabase (database and authentication)</li>
                <li>ElevenLabs (voice processing)</li>
                <li>Tavus (video generation)</li>
              </ul>
              <p>
                These services have their own terms of service and privacy policies.
              </p>

              <h2>10. Disclaimers</h2>
              <p>
                The information provided by CareerSpark is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
              </p>

              <h2>11. Limitation of Liability</h2>
              <p>
                In no event shall CareerSpark be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2>12. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2>14. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of Morocco, without regard to its conflict of law provisions.
              </p>

              <h2>15. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Email:</span>
                  <span>legal@careerspark.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Last Updated:</span>
                  <span>January 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;