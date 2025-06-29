import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Calendar } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Your privacy is important to us. Last updated: January 2025
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
              <h2>1. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>
                When you use CareerSpark, we may collect the following personal information:
              </p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password</li>
                <li><strong>Profile Data:</strong> Education level, interests, career goals, work experience</li>
                <li><strong>Usage Data:</strong> How you interact with our platform, features used, time spent</li>
                <li><strong>Voice Data:</strong> Audio recordings when using voice input features (temporarily processed)</li>
                <li><strong>Progress Data:</strong> Learning progress, completed tasks, saved career plans</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages visited and time spent</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the collected information for the following purposes:
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg my-6">
                <h4 className="flex items-center mb-3">
                  <Database className="h-5 w-5 text-blue-600 mr-2" />
                  Core Service Functionality
                </h4>
                <ul className="mb-0">
                  <li>Generate personalized career recommendations</li>
                  <li>Create customized learning plans</li>
                  <li>Provide AI-powered career guidance</li>
                  <li>Track your progress and achievements</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg my-6">
                <h4 className="flex items-center mb-3">
                  <Lock className="h-5 w-5 text-green-600 mr-2" />
                  Account Management
                </h4>
                <ul className="mb-0">
                  <li>Create and maintain your account</li>
                  <li>Authenticate your identity</li>
                  <li>Provide customer support</li>
                  <li>Send important service updates</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg my-6">
                <h4 className="flex items-center mb-3">
                  <Eye className="h-5 w-5 text-purple-600 mr-2" />
                  Service Improvement
                </h4>
                <ul className="mb-0">
                  <li>Analyze usage patterns to improve our AI</li>
                  <li>Develop new features and functionality</li>
                  <li>Conduct research and analytics</li>
                  <li>Ensure platform security and stability</li>
                </ul>
              </div>

              <h2>3. Voice Data Processing</h2>
              <p>
                When you use our voice input features:
              </p>
              <ul>
                <li><strong>Processing:</strong> Voice recordings are sent to ElevenLabs for speech-to-text conversion</li>
                <li><strong>Storage:</strong> We do not permanently store voice recordings on our servers</li>
                <li><strong>Retention:</strong> Voice data is processed in real-time and discarded after conversion</li>
                <li><strong>Third-Party:</strong> ElevenLabs has their own privacy policy governing voice data</li>
                <li><strong>Opt-Out:</strong> You can disable voice features at any time in your settings</li>
              </ul>

              <h2>4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
              </p>

              <h3>Service Providers</h3>
              <ul>
                <li><strong>Supabase:</strong> Database hosting and authentication</li>
                <li><strong>ElevenLabs:</strong> Voice processing (when you use voice features)</li>
                <li><strong>Tavus:</strong> Video generation (when you use video features)</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>
                We may disclose your information if required by law or in response to valid legal requests.
              </p>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure hosting infrastructure</li>
                <li>Regular backups and disaster recovery</li>
              </ul>

              <h2>6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services:
              </p>
              <ul>
                <li><strong>Account Data:</strong> Until you delete your account</li>
                <li><strong>Career Plans:</strong> Until you delete them or your account</li>
                <li><strong>Usage Analytics:</strong> Aggregated data may be retained indefinitely</li>
                <li><strong>Voice Data:</strong> Not permanently stored</li>
              </ul>

              <h2>7. Your Rights</h2>
              <p>
                You have the following rights regarding your personal information:
              </p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-Out:</strong> Disable specific features like voice input</li>
              </ul>

              <h2>8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our platform</li>
                <li>Improve user experience</li>
                <li>Provide personalized content</li>
              </ul>
              <p>
                You can control cookies through your browser settings.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>

              <h2>10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Email:</span>
                  <span>privacy@careerspark.com</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Data Protection Officer:</span>
                  <span>dpo@careerspark.com</span>
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

export default PrivacyPolicy;