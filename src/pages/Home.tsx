import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Building2, CreditCard, Shield, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-banking.jpg";

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Smart Start</h1>
          </div>
          <LanguageToggle />
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="mb-8 relative overflow-hidden rounded-2xl shadow-large">
            <img 
              src={heroImage} 
              alt="Smart Start Banking" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Find Your Perfect Account
              </h2>
              <p className="text-sm md:text-base opacity-90">
                AI-powered banking recommendations
              </p>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t.welcome}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {t.tagline}
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            {t.subtitle}
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card/80 backdrop-blur border-0 shadow-soft">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Get personalized recommendations based on your needs</p>
            </Card>
            <Card className="p-6 bg-card/80 backdrop-blur border-0 shadow-soft">
              <CreditCard className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Options</h3>
              <p className="text-muted-foreground">Find banks and credit unions in your area</p>
            </Card>
            <Card className="p-6 bg-card/80 backdrop-blur border-0 shadow-soft">
              <Shield className="h-12 w-12 text-info mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">Learn what to look for and avoid common pitfalls</p>
            </Card>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border-0 shadow-medium"
            onClick={() => navigate('/start')}
          >
            {t.startJourney}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;