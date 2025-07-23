import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { AskBizzyTooltip } from "@/components/AskBizzyTooltip";

const Research = () => {
  const { t } = useLanguage();
  const { updateProfile } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  
  const prefilledData = location.state?.prefilledData;

  const [formData, setFormData] = useState({
    bankName: prefilledData?.bankName || "",
    accountName: prefilledData?.accountName || "",
    minimumDeposit: prefilledData?.minimumDeposit || "",
    monthlyFee: prefilledData?.monthlyFee || "",
    features: prefilledData?.features || ["", "", ""],
    hasDebitCard: true,
    hasZelle: false,
    hasDirectDeposit: true,
    link: "",
    requirements: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = () => {
    updateProfile({ 
      selectedAccount: {
        bankName: formData.bankName,
        accountName: formData.accountName,
        minimumDeposit: formData.minimumDeposit,
        monthlyFee: formData.monthlyFee,
        features: formData.features.filter(f => f.trim() !== ""),
        hasDebitCard: formData.hasDebitCard,
        hasZelle: formData.hasZelle,
        hasDirectDeposit: formData.hasDirectDeposit,
        link: formData.link,
        requirements: formData.requirements
      }
    });
    navigate('/summary');
  };

  const isValid = formData.bankName && formData.accountName && formData.minimumDeposit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/search')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Smart Start</h1>
        </div>

        {/* Main Card */}
        <Card className="max-w-3xl mx-auto p-8 bg-card/95 backdrop-blur border-0 shadow-large">
          <div className="text-center mb-8">
            <Search className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">{t.researchTitle}</h2>
            <p className="text-muted-foreground">{t.researchSubtitle}</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Bank Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.bankName}</label>
                <AskBizzyTooltip question="How do I find the official bank name?" />
              </div>
              <Input
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="e.g., Chase Bank"
              />
            </div>

            {/* Account Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.accountName}</label>
                <AskBizzyTooltip question="What's the difference between account types?" />
              </div>
              <Input
                value={formData.accountName}
                onChange={(e) => handleInputChange('accountName', e.target.value)}
                placeholder="e.g., Total Checking"
              />
            </div>

            {/* Minimum Deposit */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.minimumDeposit}</label>
                <AskBizzyTooltip question="What's a minimum deposit and why do banks require it?" />
              </div>
              <Input
                value={formData.minimumDeposit}
                onChange={(e) => handleInputChange('minimumDeposit', e.target.value)}
                placeholder="e.g., $25 or $0"
              />
            </div>

            {/* Monthly Fee */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.monthlyFee}</label>
                <AskBizzyTooltip question="How can I avoid monthly fees?" />
              </div>
              <Input
                value={formData.monthlyFee}
                onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
                placeholder="e.g., $0 with direct deposit"
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.features}</label>
                <AskBizzyTooltip question="What features should I look for in a checking account?" />
              </div>
              {formData.features.map((feature, index) => (
                <Input
                  key={index}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="mb-2"
                />
              ))}
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="debitCard"
                    checked={formData.hasDebitCard}
                    onCheckedChange={(checked) => handleInputChange('hasDebitCard', checked)}
                  />
                  <label htmlFor="debitCard" className="text-sm font-medium">
                    {t.hasDebitCard}
                  </label>
                  <AskBizzyTooltip question="Why is a debit card important?" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="zelle"
                    checked={formData.hasZelle}
                    onCheckedChange={(checked) => handleInputChange('hasZelle', checked)}
                  />
                  <label htmlFor="zelle" className="text-sm font-medium">
                    {t.hasZelle}
                  </label>
                  <AskBizzyTooltip question="What is Zelle and how does it work?" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="directDeposit"
                    checked={formData.hasDirectDeposit}
                    onCheckedChange={(checked) => handleInputChange('hasDirectDeposit', checked)}
                  />
                  <label htmlFor="directDeposit" className="text-sm font-medium">
                    {t.hasDirectDeposit}
                  </label>
                  <AskBizzyTooltip question="How does direct deposit work?" />
                </div>
              </div>
            </div>

            {/* Account Link */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.accountLink}</label>
              </div>
              <Input
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
                placeholder="https://..."
                type="url"
              />
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium">{t.requirements}</label>
                <AskBizzyTooltip question="What documents do I typically need to open a checking account?" />
              </div>
              <Textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="e.g., Valid ID, Social Security number, initial deposit"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full mt-8 text-lg py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            Create Summary
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Research;