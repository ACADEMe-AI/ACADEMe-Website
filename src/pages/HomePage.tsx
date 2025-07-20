import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AppShowcase from "../components/AppShowcase";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <AppShowcase />
      <Footer />
    </div>
  );
};

export default HomePage;
