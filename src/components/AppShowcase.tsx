import React, { useEffect, useRef } from "react";
import { Play, Download, Star, Award, Clock, Users } from "lucide-react";

const AppShowcase = () => {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-surface/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-surface/10 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={showcaseRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-surface/40 border border-border/50 rounded-full px-4 py-2 text-sm text-text-secondary">
                <Award className="w-4 h-4" />
                <span>Award-Winning App</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-text-primary">Download the</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Future of Learning
                </span>
              </h2>

              <p className="text-xl text-text-secondary leading-relaxed">
                Join millions of learners worldwide who have transformed their
                education with ACADEMe's AI-powered platform. Available on all
                devices.
              </p>
            </div>

            {/* App stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      4.9
                    </div>
                    <div className="text-text-secondary text-sm">
                      Internal Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      24/7
                    </div>
                    <div className="text-text-secondary text-sm">
                      Multilingual AI Tutor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  window.open(
                    "https://forms.clickup.com/90161070153/f/2kz09g29-456/VQATNDK2A8FV63QBYR",
                    "_blank"
                  )
                }
                className="group bg-text-primary hover:bg-text-primary/90 text-background px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 font-semibold"
              >
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-background/70">
                    Download on the
                  </div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>

              <button
                onClick={() =>
                  window.open(
                    "https://forms.clickup.com/90161070153/f/2kz09g29-456/VQATNDK2A8FV63QBYR",
                    "_blank"
                  )
                }
                className="group bg-text-primary hover:bg-text-primary/90 text-background px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 font-semibold"
              >
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-background/70">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right content - App screenshots */}
          <div className="relative">
            {/* Main phone */}
            <div className="relative z-20 mx-auto w-80">
              <div className="bg-gradient-to-b from-surface to-background rounded-[3rem] p-2 shadow-2xl border border-border">
                <div className="w-full h-[600px] bg-gradient-to-br from-surface to-background rounded-[2.5rem] overflow-hidden relative">
                  {/* App screenshot content */}
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-text-primary font-bold text-lg">
                        Dashboard
                      </h3>
                      <div className="w-8 h-8 bg-surface border border-border rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-surface/50 border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-text-primary font-semibold">
                            Mathematics
                          </span>
                          <span className="text-text-secondary text-sm">
                            85%
                          </span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>

                      <div className="bg-surface/50 border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-text-primary font-semibold">
                            Physics
                          </span>
                          <span className="text-text-secondary text-sm">
                            92%
                          </span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-11/12"></div>
                        </div>
                      </div>

                      <div className="bg-surface/50 border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-text-primary font-semibold">
                            Chemistry
                          </span>
                          <span className="text-text-secondary text-sm">
                            78%
                          </span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface/50 border border-border rounded-xl p-3 text-center">
                        <Clock className="w-6 h-6 text-text-secondary mx-auto mb-1" />
                        <div className="text-text-primary font-bold">2.5h</div>
                        <div className="text-text-secondary text-xs">Today</div>
                      </div>
                      <div className="bg-surface/50 border border-border rounded-xl p-3 text-center">
                        <Award className="w-6 h-6 text-text-secondary mx-auto mb-1" />
                        <div className="text-text-primary font-bold">12</div>
                        <div className="text-text-secondary text-xs">
                          Achievements
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background phones */}
            <div className="absolute top-8 -left-16 w-64 h-96 bg-gradient-to-b from-surface to-background rounded-[2rem] opacity-20 transform rotate-12 scale-75"></div>
            <div className="absolute top-8 -right-16 w-64 h-96 bg-gradient-to-b from-surface to-background rounded-[2rem] opacity-20 transform -rotate-12 scale-75"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
