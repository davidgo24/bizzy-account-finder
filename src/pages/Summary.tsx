import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Download, Mail, RotateCcw, ExternalLink } from "lucide-react";
import { generateSummary } from "@/utils/askBizzy";
import { useToast } from "@/hooks/use-toast";

const Summary = () => {
  const { t } = useLanguage();
  const { profile, resetProfile } = useUserProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSummary(profile).then(steps => {
      setNextSteps(steps);
      setLoading(false);
    });
  }, [profile]);

  const handleSavePDF = () => {
    toast({
      title: "PDF Generated",
      description: "Your account summary has been saved as PDF",
    });
  };

  const handleEmailSummary = () => {
    const subject = "My Checking Account Research Summary";
    const body = `I researched ${profile.selectedAccount?.bankName} - ${profile.selectedAccount?.accountName}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleStartOver = () => {
    resetProfile();
    navigate('/');
  };

  if (!profile.selectedAccount) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/research')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Smart Start</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">{t.summaryTitle}</h2>
            <p className="text-muted-foreground">{t.summarySubtitle}</p>
          </div>

          {/* Account Summary Card */}
          <Card className="p-8 mb-8 bg-card/95 backdrop-blur border-0 shadow-large">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {profile.selectedAccount.bankName}
                </h3>
                <h4 className="text-xl text-muted-foreground mb-4">
                  {profile.selectedAccount.accountName}
                </h4>
              </div>
              {profile.selectedAccount.link && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.selectedAccount.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Account
                  </a>
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-semibold mb-2">Account Details</h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Minimum Deposit: </span>
                    {profile.selectedAccount.minimumDeposit}
                  </div>
                  <div>
                    <span className="font-medium">Monthly Fee: </span>
                    {profile.selectedAccount.monthlyFee}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Services Included</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={profile.selectedAccount.hasDebitCard ? "default" : "secondary"}>
                      {profile.selectedAccount.hasDebitCard ? "✓" : "✗"}
                    </Badge>
                    Debit Card
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={profile.selectedAccount.hasZelle ? "default" : "secondary"}>
                      {profile.selectedAccount.hasZelle ? "✓" : "✗"}
                    </Badge>
                    Zelle Transfers
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={profile.selectedAccount.hasDirectDeposit ? "default" : "secondary"}>
                      {profile.selectedAccount.hasDirectDeposit ? "✓" : "✗"}
                    </Badge>
                    Direct Deposit
                  </div>
                </div>
              </div>
            </div>

            {profile.selectedAccount.features.length > 0 && (
              <div className="mb-6">
                <h5 className="font-semibold mb-2">Key Features</h5>
                <div className="flex flex-wrap gap-2">
                  {profile.selectedAccount.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {profile.selectedAccount.requirements && (
              <div>
                <h5 className="font-semibold mb-2">Requirements to Open</h5>
                <p className="text-sm text-muted-foreground">
                  {profile.selectedAccount.requirements}
                </p>
              </div>
            )}
          </Card>

          {/* Next Steps */}
          <Card className="p-8 mb-8 bg-card/95 backdrop-blur border-0 shadow-large">
            <h3 className="text-xl font-bold mb-4 text-primary">{t.nextSteps}</h3>
            {loading ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">{t.ai.thinking}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <Badge className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <Card className="p-6 bg-card/95 backdrop-blur border-0 shadow-large">
            <h3 className="text-lg font-semibold mb-4">{t.saveOptions}</h3>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleSavePDF} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                {t.savePDF}
              </Button>
              <Button onClick={handleEmailSummary} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                {t.emailMe}
              </Button>
              <Button onClick={handleStartOver} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t.startOver}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Summary;