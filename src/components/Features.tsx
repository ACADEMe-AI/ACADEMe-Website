import React from 'react';
import { Brain, Zap, Target, Users, BookOpen, TrendingUp } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms adapt to your unique learning style and pace.'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get real-time corrections and suggestions to accelerate your learning journey.'
    },
    {
      icon: Target,
      title: 'Goal-Oriented Learning',
      description: 'Set specific objectives and let our AI create customized learning paths.'
    },
    {
      icon: Users,
      title: 'Collaborative Environment',
      description: 'Connect with peers and mentors in our intelligent learning community.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Access thousands of courses across multiple disciplines and skill levels.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track your improvement with detailed insights and performance metrics.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              Intelligent Features
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how our cutting-edge AI technology transforms the way you learn, 
            making education more personalized, efficient, and engaging than ever before.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 group-hover:border-primary/30">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="w-0 group-hover:w-12 h-1 bg-primary rounded-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-primary/25">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;