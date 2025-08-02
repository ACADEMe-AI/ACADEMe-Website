import React from "react";
import { Link } from "react-router-dom";
import { Mail, Trash2, Shield, ArrowLeft } from "lucide-react";

const DeleteData = () => {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Data Deletion Request
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Request permanent deletion of your personal data from ACADEMe
            platform
          </p>
        </div>

        {/* Main Content Box */}
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-12">
          {/* Icon and Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Email Us Your Deletion Request
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
              To request deletion of your personal data from our platform,
              please send us an email with your request details.
            </p>
          </div>

          {/* Email Contact Box */}
          <div className="bg-surface/30 border border-border rounded-xl p-4 sm:p-8 text-center mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary break-all sm:break-normal">
                academe.noreply@gmail.com
              </span>
            </div>

            <button
              onClick={() =>
                window.open(
                  "mailto:academe.noreply@gmail.com?subject=Data Deletion Request - ACADEMe Account&body=Hello ACADEMe Team,%0A%0AI would like to request the deletion of my personal data from your platform.%0A%0AAccount Details:%0A- Name: [Your Name]%0A- Email: [Your Email]%0A- Reason for deletion: [Optional]%0A%0APlease confirm once my data has been deleted.%0A%0AThank you."
                )
              }
              className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-primary/25 inline-flex items-center space-x-2 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">Send Deletion Request</span>
            </button>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              What to Include in Your Email:
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Your Account Information
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Full name and email address associated with your ACADEMe
                      account
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Clear Request
                    </h4>
                    <p className="text-text-secondary text-sm">
                      State that you want to permanently delete your personal
                      data
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Reason (Optional)
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Help us improve by sharing why you're leaving (optional)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Confirmation Request
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Ask us to confirm when your data has been deleted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-8 p-6 bg-border/20 border border-border rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary mb-2">
                  Important Information
                </h4>
                <ul className="text-text-secondary text-sm space-y-2">
                  <li>
                    • We will process your deletion request within{" "}
                    <strong>30 days</strong>
                  </li>
                  <li>• Once deleted, your data cannot be recovered</li>
                  <li>
                    • Some data may be retained for legal compliance purposes
                  </li>
                  <li>
                    • You will receive a confirmation email once deletion is
                    complete
                  </li>
                  <li>
                    • This action will permanently close your ACADEMe account
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Having trouble with email? You can also contact our privacy team
              through our{" "}
              <Link
                to="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              page.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-text-secondary">
            © 2025 ACADEMe. Your privacy matters to us. | Developed by Team
            VISI0N
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteData;
