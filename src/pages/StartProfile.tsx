import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

const StartProfile = () => {
  const { t } = useLanguage();
  const { profile, updateProfile } = useUserProfile();
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState(profile.zipCode);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(profile.preferences);

  const preferences = [
    { id: 'noFees', label: t.preferences.noFees },
    { id: 'debitCard', label: t.preferences.debitCard },
    { id: 'mobileBanking', label: t.preferences.mobileBanking },
    { id: 'nearbyBranch', label: t.preferences.nearbyBranch },
    { id: 'directDeposit', label: t.preferences.directDeposit },
  ];

  const handlePrefChange = (prefId: string, checked: boolean) => {
    if (checked) {
      setSelectedPrefs([...selectedPrefs, prefId]);
    } else {
      setSelectedPrefs(selectedPrefs.filter(p => p !== prefId));
    }
  };

  const handleContinue = () => {
    updateProfile({ zipCode, preferences: selectedPrefs });
    navigate('/bank-or-cu');
  };

  const isValid = zipCode.length === 5 && /^\d+$/.test(zipCode) && selectedPrefs.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Smart Start</h1>
        </div>

        {/* Main Card */}
        <Card className="max-w-2xl mx-auto p-8 bg-card/95 backdrop-blur border-0 shadow-large">
          <div className="text-center mb-8">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">{t.startProfile}</h2>
            <p className="text-muted-foreground">Let's personalize your search</p>
          </div>

          {/* ZIP Code Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">{t.enterZip}</label>
            <Input 
              type="text"
              placeholder={t.zipPlaceholder}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              className="text-lg py-3"
              maxLength={5}
            />
          </div>

          {/* Preferences */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t.whatMatters}</h3>
            <div className="space-y-4">
              {preferences.map((pref) => (
                <div key={pref.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={pref.id}
                    checked={selectedPrefs.includes(pref.id)}
                    onCheckedChange={(checked) => handlePrefChange(pref.id, !!checked)}
                  />
                  <label 
                    htmlFor={pref.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {pref.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full text-lg py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {t.continue}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default StartProfile;