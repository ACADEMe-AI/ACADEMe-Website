import React, { useEffect, useRef } from 'react';
import { Download, Play, Star } from 'lucide-react';

const Hero = () => {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current || window.innerWidth < 1024) return;
      
      const rect = phoneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;
      
      phoneRef.current.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) translateZ(50px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden pt-28">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-7rem)]">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-surface/40 border border-border/50 rounded-full px-4 py-2 text-sm text-text-secondary">
                <Star className="w-4 h-4 fill-current text-primary" />
                <span>AI-Powered Learning</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-text-primary">
                  Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Education
                </span>
                <br />
                <span className="text-text-primary">is Here</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-lg">
                Experience personalized learning powered by advanced AI. Adapt, learn, and excel with ACADEMe's intelligent education platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-primary/25">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download App</span>
              </button>
              
              <button className="group border border-border hover:border-primary/50 text-text-secondary hover:text-text-primary px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 backdrop-blur-sm font-semibold">
                <Play className="w-5 h-5 group-hover:animate-pulse" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary">1M+</div>
                <div className="text-text-secondary text-sm">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary">95%</div>
                <div className="text-text-secondary text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary">24/7</div>
                <div className="text-text-secondary text-sm">AI Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Optimized 3D Phone */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 pb-8 lg:pb-0">
            <div 
              ref={phoneRef}
              className="relative transition-transform duration-300 ease-out w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-2xl scale-110"></div>
                
                {/* Phone body - Increased height to prevent cutoff */}
                <div className="relative w-64 sm:w-72 lg:w-80 h-[520px] sm:h-[560px] lg:h-[620px] bg-gradient-to-b from-surface to-background rounded-[3rem] p-2 shadow-2xl border border-border">
                  {/* Screen */}
                  <div className="w-full h-full bg-gradient-to-br from-surface to-background rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3 text-text-primary text-xs sm:text-sm">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-3 sm:w-4 h-1.5 sm:h-2 bg-text-primary rounded-sm"></div>
                        <div className="w-1 h-1.5 sm:h-2 bg-text-primary rounded-sm"></div>
                        <div className="w-5 sm:w-6 h-1.5 sm:h-2 bg-text-primary rounded-sm"></div>
                      </div>
                    </div>

                    {/* App interface - Better spaced */}
                    <div className="px-4 sm:px-6 space-y-4 sm:space-y-5">
                      {/* Header */}
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto bg-surface rounded-2xl flex items-center justify-center border border-border">
                          <img 
                            src="/src/assets/robot_logo.png" 
                            alt="AI Logo" 
                            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 filter brightness-0 invert"
                          />
                        </div>
                        <h3 className="text-text-primary font-bold text-sm sm:text-base lg:text-lg">ACADEMe Assistant</h3>
                        <p className="text-text-secondary text-xs sm:text-sm">Your personal learning companion</p>
                      </div>

                      {/* Chat interface */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-surface/50 border border-border rounded-2xl p-3 sm:p-4">
                          <p className="text-text-primary text-xs sm:text-sm">What would you like to learn today?</p>
                        </div>
                        
                        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 sm:p-4 ml-4 sm:ml-6">
                          <p className="text-text-primary text-xs sm:text-sm">Help me with calculus derivatives</p>
                        </div>
                        
                        <div className="bg-surface/50 border border-border rounded-2xl p-3 sm:p-4">
                          <p className="text-text-primary text-xs sm:text-sm">I'll create a personalized lesson plan for you!</p>
                          <div className="mt-3 space-y-2">
                            <div className="h-1.5 bg-primary rounded-full"></div>
                            <div className="h-1.5 bg-primary rounded-full w-3/4"></div>
                            <div className="h-1.5 bg-primary rounded-full w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Progress indicators - Better positioned */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                        <div className="bg-surface/50 rounded-xl p-3 sm:p-4 border border-border">
                          <div className="text-text-secondary text-xs font-semibold">Progress</div>
                          <div className="text-text-primary text-base sm:text-lg font-bold">78%</div>
                        </div>
                        <div className="bg-surface/50 rounded-xl p-3 sm:p-4 border border-border">
                          <div className="text-text-secondary text-xs font-semibold">Streak</div>
                          <div className="text-text-primary text-base sm:text-lg font-bold">12 days</div>
                        </div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-16 right-3 w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full animate-bounce delay-300"></div>
                    <div className="absolute bottom-24 left-3 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full animate-bounce delay-700"></div>
                  </div>
                </div>

                {/* Floating UI elements - Desktop only */}
                <div className="hidden lg:block absolute -top-6 -left-6 bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-3 animate-float">
                  <div className="text-text-secondary text-xs">AI Analysis</div>
                  <div className="text-text-primary text-sm font-semibold">98% Accuracy</div>
                </div>
                
                <div className="hidden lg:block absolute -bottom-6 -right-6 bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-3 animate-float delay-1000">
                  <div className="text-text-secondary text-xs">Learning Speed</div>
                  <div className="text-text-primary text-sm font-semibold">3x Faster</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;