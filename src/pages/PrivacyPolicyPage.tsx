import { Link } from "react-router-dom";
import { Mail, MapPin, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <div className="flex items-center justify-center space-x-2 text-text-secondary">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: January 1, 2025</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              1. Introduction
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Welcome to ACADEMe, an AI-powered personalized education platform.
              This Privacy Policy explains how Team VISI0N ("we," "our," or
              "us") collects, uses, protects, and shares your personal
              information when you use our website, mobile application, and
              services (collectively, the "Platform").
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              By using ACADEMe, you agree to the collection and use of
              information in accordance with this Privacy Policy. If you do not
              agree with this policy, please do not use our Platform.
            </p>
          </section>

          {/* Company Information */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              2. Company Information
            </h2>
            <div className="bg-surface/30 rounded-xl p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <img
                    src="robot_logo.png"
                    alt="ACADEMe"
                    className="w-full h-full filter brightness-0 invert"
                  />
                </div>
                <span className="text-text-primary font-semibold text-lg">
                  ACADEMe
                </span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-4 h-4" />
                <span>Guwahati, Assam - India</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span>academe.noreply@gmail.com</span>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              3. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-text-primary mb-3">
              3.1 Personal Information
            </h3>
            <p className="text-text-secondary mb-4">
              We collect personal information that you voluntarily provide to
              us, including:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>
                Name and contact information (email address, phone number)
              </li>
              <li>Account credentials (username, password)</li>
              <li>
                Educational information (academic level, subjects of interest,
                learning goals)
              </li>
              <li>
                Profile information (age, location, educational background)
              </li>
              <li>Communication data (messages, feedback, support requests)</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">
              3.2 Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>
                Device information (IP address, browser type, device
                identifiers)
              </li>
              <li>
                Usage data (pages visited, time spent, clicks, navigation
                patterns)
              </li>
              <li>Performance data (app crashes, load times, errors)</li>
              <li>
                Location data (general geographic location based on IP address)
              </li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">
              3.3 AI-Generated Data
            </h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Learning analytics and progress tracking</li>
              <li>Personalized recommendations and content suggestions</li>
              <li>Performance predictions and assessments</li>
              <li>Behavioral patterns and learning preferences</li>
              <li>AI-generated insights about your educational journey</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              4. How We Use Your Information
            </h2>
            <p className="text-text-secondary mb-4">
              We use your information for the following purposes:
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3">
              4.1 Educational Services
            </h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Provide personalized learning experiences and content</li>
              <li>Create adaptive learning paths based on your progress</li>
              <li>Generate AI-powered recommendations and insights</li>
              <li>Track your educational progress and achievements</li>
              <li>Facilitate multilingual learning support</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">
              4.2 Platform Operations
            </h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Create and manage your account</li>
              <li>Authenticate users and prevent fraud</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send important notifications and updates</li>
              <li>Improve our Platform and develop new features</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">
              4.3 Legal Basis (GDPR)
            </h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>
                <strong>Consent:</strong> AI processing, marketing
                communications
              </li>
              <li>
                <strong>Contract:</strong> Providing educational services
              </li>
              <li>
                <strong>Legitimate Interest:</strong> Platform improvement,
                security
              </li>
              <li>
                <strong>Legal Obligation:</strong> Compliance with applicable
                laws
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              5. Information Sharing and Disclosure
            </h2>

            <h3 className="text-xl font-semibold text-text-primary mb-3">
              5.1 Third-Party Service Providers
            </h3>
            <p className="text-text-secondary mb-4">
              We may share your information with trusted third parties who help
              us operate our Platform:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>
                <strong>Firebase:</strong> Database and authentication services
              </li>
              <li>
                <strong>Google Gemini:</strong> AI and machine learning services
              </li>
              <li>
                <strong>ClickUp:</strong> Form processing and data collection
              </li>
              <li>
                <strong>LibreTranslate & Whisper:</strong> Translation and
                speech processing
              </li>
              <li>
                <strong>Railway & Docker:</strong> Cloud hosting and deployment
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">
              5.2 We Do NOT Sell Personal Data
            </h3>
            <p className="text-text-secondary">
              We do not sell, rent, or trade your personal information to third
              parties for their marketing purposes.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">
              5.3 Legal Requirements
            </h3>
            <p className="text-text-secondary">
              We may disclose your information if required by law, regulation,
              or legal process, or to protect our rights, property, or safety.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              6. Data Security
            </h2>
            <p className="text-text-secondary mb-4">
              We implement appropriate security measures to protect your
              information:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Incident response procedures for data breaches</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              7. Data Retention
            </h2>
            <p className="text-text-secondary mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Provide our educational services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Improve our Platform and services</li>
            </ul>
            <p className="text-text-secondary mt-4">
              When you delete your account, we will delete or anonymize your
              personal information within 30 days, except where retention is
              required by law.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              8. International Data Transfers
            </h2>
            <p className="text-text-secondary mb-4">
              As a global education platform, your information may be
              transferred to and processed in countries other than your country
              of residence, including India and the United States. We ensure
              appropriate safeguards are in place to protect your information
              during international transfers.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              9. Your Privacy Rights
            </h2>
            <p className="text-text-secondary mb-4">
              Depending on your location, you may have the following rights:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface/30 rounded-xl p-4">
                <h4 className="font-semibold text-text-primary mb-2">
                  Access & Portability
                </h4>
                <p className="text-text-secondary text-sm">
                  Request a copy of your personal data and transfer it to
                  another service
                </p>
              </div>
              <div className="bg-surface/30 rounded-xl p-4">
                <h4 className="font-semibold text-text-primary mb-2">
                  Correction
                </h4>
                <p className="text-text-secondary text-sm">
                  Update or correct inaccurate personal information
                </p>
              </div>
              <div className="bg-surface/30 rounded-xl p-4">
                <h4 className="font-semibold text-text-primary mb-2">
                  Deletion
                </h4>
                <p className="text-text-secondary text-sm">
                  Request deletion of your personal data
                </p>
              </div>
              <div className="bg-surface/30 rounded-xl p-4">
                <h4 className="font-semibold text-text-primary mb-2">
                  Opt-Out
                </h4>
                <p className="text-text-secondary text-sm">
                  Opt out of data processing for marketing or AI analytics
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-text-primary">
                <strong>To exercise your rights:</strong> Please contact us at
                academe.noreply@gmail.com or visit our
                <Link
                  to="/delete"
                  className="text-primary hover:underline ml-1"
                >
                  Data Deletion Request page
                </Link>
                .
              </p>
            </div>
          </section>

          {/* AI and Automated Decision Making */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              10. AI and Automated Decision-Making
            </h2>
            <p className="text-text-secondary mb-4">
              Our Platform uses artificial intelligence to personalize your
              learning experience. This includes:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>
                Automated content recommendations based on your learning history
              </li>
              <li>AI-powered difficulty adjustments in assessments</li>
              <li>Predictive analytics for learning outcomes</li>
              <li>Natural language processing for multilingual support</li>
            </ul>
            <p className="text-text-secondary mt-4">
              You have the right to opt out of automated decision-making and
              request human review of AI-generated decisions that significantly
              affect you.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              11. Children's Privacy
            </h2>
            <p className="text-text-secondary mb-4">
              Our Platform is designed for users of all ages, including children
              under 13. We comply with applicable children's privacy laws,
              including COPPA. If you are under 13, please ensure your parent or
              guardian reviews this Privacy Policy and consents to your use of
              our Platform.
            </p>
            <p className="text-text-secondary">
              Parents and guardians can contact us to review, update, or delete
              their child's information.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              12. Cookies and Tracking Technologies
            </h2>
            <p className="text-text-secondary mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze Platform usage and performance</li>
              <li>Provide personalized content and features</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p className="text-text-secondary mt-4">
              You can control cookies through your browser settings, but
              disabling cookies may affect Platform functionality.
            </p>
          </section>

          {/* Updates to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              13. Updates to This Privacy Policy
            </h2>
            <p className="text-text-secondary mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. We will notify you of significant changes by:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Posting the updated policy on our Platform</li>
              <li>Sending email notifications for material changes</li>
              <li>
                Updating the "Last Updated" date at the top of this policy
              </li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              14. Contact Us
            </h2>
            <p className="text-text-secondary mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-surface/30 rounded-xl p-6 space-y-3">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-5 h-5 text-primary" />
                <span>Email: academe.noreply@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Address: Guwahati, Assam - India</span>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              15. Governing Law
            </h2>
            <p className="text-text-secondary">
              This Privacy Policy is governed by the laws of India and
              applicable international data protection regulations, including
              but not limited to the Digital Personal Data Protection Act 2023,
              GDPR (for EU users), and CCPA (for California users).
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-text-secondary">
            © 2025 ACADEMe. All rights reserved. | Developed by Team VISI0N
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
