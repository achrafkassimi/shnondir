import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart3, Shield, Mail, Calendar } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <Cookie className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-lg">
              How we use cookies and similar technologies. Last updated: January 2025
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
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings. This can make your next visit easier and the site more useful to you.
              </p>

              <h2>2. How We Use Cookies</h2>
              <p>
                CareerSpark uses cookies and similar technologies to enhance your experience on our platform. We use cookies for the following purposes:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Settings className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-blue-800 mb-0">Essential Cookies</h3>
                  </div>
                  <p className="text-blue-700 text-sm mb-0">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-green-800 mb-0">Analytics Cookies</h3>
                  </div>
                  <p className="text-green-700 text-sm mb-0">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <User className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-lg font-semibold text-purple-800 mb-0">Preference Cookies</h3>
                  </div>
                  <p className="text-purple-700 text-sm mb-0">
                    Remember your settings and preferences for a better experience.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Shield className="h-6 w-6 text-orange-600 mr-3" />
                    <h3 className="text-lg font-semibold text-orange-800 mb-0">Security Cookies</h3>
                  </div>
                  <p className="text-orange-700 text-sm mb-0">
                    Help keep your account secure and prevent unauthorized access.
                  </p>
                </div>
              </div>

              <h2>3. Types of Cookies We Use</h2>

              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as:
              </p>
              <ul>
                <li>Logging into your account</li>
                <li>Filling in forms</li>
                <li>Setting your privacy preferences</li>
                <li>Maintaining your session</li>
              </ul>

              <h3>Analytics and Performance Cookies</h3>
              <p>
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
              </p>
              <ul>
                <li>Page views and user interactions</li>
                <li>Time spent on different pages</li>
                <li>Error tracking and debugging</li>
                <li>Feature usage statistics</li>
              </ul>

              <h3>Functional Cookies</h3>
              <p>
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.
              </p>
              <ul>
                <li>Language preferences</li>
                <li>Theme settings (light/dark mode)</li>
                <li>Voice input preferences</li>
                <li>Dashboard layout preferences</li>
              </ul>

              <h2>4. Third-Party Cookies</h2>
              <p>
                We may also use third-party services that set cookies on your device. These include:
              </p>

              <h3>Supabase</h3>
              <ul>
                <li>Authentication and session management</li>
                <li>Database connectivity</li>
                <li>Security and fraud prevention</li>
              </ul>

              <h3>ElevenLabs (Voice Features)</h3>
              <ul>
                <li>Voice processing preferences</li>
                <li>API usage tracking</li>
                <li>Service optimization</li>
              </ul>

              <h2>5. Managing Your Cookie Preferences</h2>
              <p>
                You have several options for managing cookies:
              </p>

              <h3>Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. You can:
              </p>
              <ul>
                <li>Block all cookies</li>
                <li>Block third-party cookies</li>
                <li>Delete existing cookies</li>
                <li>Set cookies to expire when you close your browser</li>
              </ul>

              <h3>Our Cookie Preferences</h3>
              <p>
                We provide a cookie preference center where you can:
              </p>
              <ul>
                <li>Accept or reject non-essential cookies</li>
                <li>Choose which types of cookies to allow</li>
                <li>Update your preferences at any time</li>
                <li>Learn more about each cookie category</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
                <h4 className="text-yellow-800 font-semibold mb-2">⚠️ Important Note</h4>
                <p className="text-yellow-700 mb-0">
                  Blocking or deleting cookies may impact your experience on CareerSpark. Some features may not work properly without certain cookies enabled.
                </p>
              </div>

              <h2>6. Cookie Retention</h2>
              <p>
                Different cookies have different lifespans:
              </p>
              <ul>
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain until they expire or you delete them</li>
                <li><strong>Authentication Cookies:</strong> Typically last 30 days</li>
                <li><strong>Preference Cookies:</strong> May last up to 1 year</li>
              </ul>

              <h2>7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>

              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding cookies and personal data:
              </p>
              <ul>
                <li>Right to be informed about cookie usage</li>
                <li>Right to consent to non-essential cookies</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to access information about cookies we use</li>
              </ul>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Email:</span>
                  <span>cookies@careerspark.com</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <Settings className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Cookie Preferences:</span>
                  <span>Available in your account settings</span>
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

export default CookiePolicy;