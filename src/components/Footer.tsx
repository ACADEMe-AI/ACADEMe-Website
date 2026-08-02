import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <img
                  src="/logos/logo-white-bg-removed.png"
                  alt="ACADEMe"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                ACADEMe
              </span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Revolutionizing education through artificial intelligence.
              Empowering learners worldwide with personalized, adaptive learning
              experiences.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              {/* <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span>hello@academe.com</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div> */}
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-4 h-4" />
                <span>Guwahati, Assam - India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © 2025 ACADEMe. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
