import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Consistent 90% Width Floating Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-7xl z-50">
        <div
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? "bg-surface/95 backdrop-blur-lg border border-border/40 shadow-2xl"
              : "bg-surface/80 backdrop-blur-md border border-border/20 shadow-lg"
          } rounded-2xl`}
        >
          <div className="px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 relative">
                  <img
                    src="robot_logo.png"
                    alt="ACADEMe"
                    className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <span className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
                  ACADEMe
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative group"
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>

                <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-8 py-3 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25">
                  Register
                </button>
              </div>

              {/* Mobile Menu Button - Properly Aligned */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative text-text-secondary hover:text-text-primary transition-colors duration-300 p-2"
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <span
                      className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                      }`}
                    ></span>
                    <span
                      className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></span>
                    <span
                      className={`absolute block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                      }`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>

            {/* Full Width Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-border/30 mt-4 pt-4 pb-4">
                <div className="flex flex-col space-y-3">
                  <a
                    href="#features"
                    className="w-full text-center text-text-secondary hover:text-text-primary transition-colors duration-300 py-3 font-medium border border-border/30 rounded-2xl hover:border-primary/30 hover:bg-surface/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </a>

                  <button
                    className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-medium py-3 rounded-2xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
