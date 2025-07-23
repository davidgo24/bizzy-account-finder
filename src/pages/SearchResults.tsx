import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, Users } from "lucide-react";
import bankData from "@/data/nearby_banks.json";

interface BankAccount {
  name: string;
  minimumDeposit: string;
  monthlyFee: string;
  features: string[];
  distance: string;
}

interface Bank {
  name: string;
  type: 'bank' | 'credit-union';
  accounts: BankAccount[];
  zipCodes?: string[];
}

const SearchResults = () => {
  const { t } = useLanguage();
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Bank[]>([]);
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    // Filter banks based on user profile
    const localBanks = bankData.banks.filter(bank => 
      bank.zipCodes.includes(profile.zipCode)
    );

    // Filter by type preference if specified
    let filteredBanks = localBanks;
    if (profile.typePreference) {
      filteredBanks = localBanks.filter(bank => bank.type === profile.typePreference);
    }

    setRecommendations(filteredBanks as Bank[]);
    setShowOnline(filteredBanks.length === 0);
  }, [profile]);

  const handleSelectAccount = (bankName: string, account: BankAccount) => {
    navigate('/research', { 
      state: { 
        prefilledData: {
          bankName,
          accountName: account.name,
          minimumDeposit: account.minimumDeposit,
          monthlyFee: account.monthlyFee,
          features: account.features.slice(0, 3)
        }
      }
    });
  };

  const displayedBanks = showOnline ? bankData.onlineOptions : recommendations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/bank-or-cu')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Smart Start</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{t.recommendations}</h2>
            <p className="text-muted-foreground">
              {showOnline ? t.noLocalOptions : t.foundOptions}
            </p>
          </div>

          {/* Toggle Button */}
          {recommendations.length > 0 && (
            <div className="text-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setShowOnline(!showOnline)}
              >
                {showOnline ? "Show Local Options" : "Show Online Banks"}
              </Button>
            </div>
          )}

          {/* Bank Cards */}
          <div className="space-y-6">
            {displayedBanks.map((bank, bankIndex) => (
              <Card key={bankIndex} className="p-6 bg-card/95 backdrop-blur border-0 shadow-medium">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {bank.type === 'bank' ? (
                      <Building2 className="h-8 w-8 text-primary" />
                    ) : (
                      <Users className="h-8 w-8 text-secondary" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{bank.name}</h3>
                      <Badge variant="secondary">
                        {bank.type === 'bank' ? 'Bank' : 'Credit Union'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {bank.accounts.map((account, accountIndex) => (
                  <Card key={accountIndex} className="p-4 mb-4 bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{account.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {account.distance}
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleSelectAccount(bank.name, account)}
                        size="sm"
                      >
                        Research This
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="font-medium">Minimum Deposit: </span>
                        {account.minimumDeposit}
                      </div>
                      <div>
                        <span className="font-medium">Monthly Fee: </span>
                        {account.monthlyFee}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">Features: </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {account.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </Card>
            ))}
          </div>

          {/* Custom Research Option */}
          <Card className="p-6 mt-8 bg-card/95 backdrop-blur border-2 border-dashed border-muted-foreground/30">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Found something else?</h3>
              <p className="text-muted-foreground mb-4">
                Research any checking account you've discovered
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/research')}
              >
                Research Custom Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;