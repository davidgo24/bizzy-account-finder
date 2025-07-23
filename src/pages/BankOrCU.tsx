import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Users, Brain } from "lucide-react";
import { AskBizzyTooltip } from "@/components/AskBizzyTooltip";

const BankOrCU = () => {
  const { t } = useLanguage();
  const { updateProfile } = useUserProfile();
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);

  const handleChoice = (choice: 'bank' | 'credit-union') => {
    updateProfile({ typePreference: choice });
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/start')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Smart Start</h1>
        </div>

        {/* Main Card */}
        <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur border-0 shadow-large">
          <div className="text-center mb-8">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">{t.bankOrCU}</h2>
            <p className="text-muted-foreground mb-4">{t.bankOrCUSubtitle}</p>
            
            <Button 
              variant="outline" 
              onClick={() => setShowExplanation(!showExplanation)}
              className="mb-6"
            >
              {t.askBizzy}
            </Button>
          </div>

          {/* AI Explanation */}
          {showExplanation && (
            <Card className="p-6 mb-8 bg-info-light border-info/20">
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-info flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-info mb-2">Bizzy explains:</h4>
                  <p className="text-sm text-info-foreground whitespace-pre-line">
                    {t.ai.bankVsCU}
                  </p>
                  <p className="text-sm text-info-foreground mt-3 font-medium">
                    {t.ai.recommendation}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Bank Option */}
            <Card 
              className="p-6 cursor-pointer hover:shadow-medium transition-all border-2 hover:border-primary"
              onClick={() => handleChoice('bank')}
            >
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-3">{t.bank}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Large ATM networks</li>
                <li>• Advanced online services</li>
                <li>• 24/7 customer support</li>
                <li>• More locations</li>
              </ul>
              <AskBizzyTooltip question="Tell me more about banks vs credit unions" />
            </Card>

            {/* Credit Union Option */}
            <Card 
              className="p-6 cursor-pointer hover:shadow-medium transition-all border-2 hover:border-secondary"
              onClick={() => handleChoice('credit-union')}
            >
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-3">{t.creditUnion}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Member-owned</li>
                <li>• Better interest rates</li>
                <li>• Lower fees</li>
                <li>• Personal service</li>
              </ul>
              <AskBizzyTooltip question="What are the benefits of credit unions?" />
            </Card>
          </div>

          {/* Not Sure Option */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/search')}
              className="text-muted-foreground"
            >
              {t.notSure} - Show me both
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BankOrCU;