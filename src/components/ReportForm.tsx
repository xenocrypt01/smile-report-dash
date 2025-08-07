import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Clock, Shield, AlertTriangle } from 'lucide-react';

export const ReportForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetPhone: '',
    targetIdentifier: '',
    reportReason: '',
    recipientEmail: '',
    senderName: user?.user_metadata?.full_name || '',
    contactDetails: user?.email || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the edge function to send the report
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: formData
      });

      if (error) {
        if (error.message?.includes('wait 1 minute')) {
          toast({
            title: "Rate Limit",
            description: "Please wait 1 minute before sending another report",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Failed to send report",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Report Sent Successfully!",
          description: "Your WhatsApp security report has been sent via email",
        });
        
        // Reset form
        setFormData(prev => ({
          ...prev,
          targetPhone: '',
          targetIdentifier: '',
          reportReason: '',
          recipientEmail: '',
        }));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Send className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-foreground">Security Report Generator</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Generate professional WhatsApp account security reports
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Alert Box */}
          <div className="bg-whatsapp/10 border border-whatsapp/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-whatsapp mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Professional Use Only</p>
                <p className="text-muted-foreground text-xs">
                  This tool is designed for authorized security assessments and penetration testing only.
                </p>
              </div>
            </div>
          </div>

          {/* Target Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Shield className="h-5 w-5 mr-2 text-whatsapp" />
              Target Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetPhone" className="text-foreground">
                  Target Phone Number *
                </Label>
                <Input
                  id="targetPhone"
                  placeholder="+1234567890"
                  value={formData.targetPhone}
                  onChange={(e) => handleInputChange('targetPhone', e.target.value)}
                  required
                  className="bg-input border-border focus:ring-whatsapp"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetIdentifier" className="text-foreground">
                  Additional Identifier
                </Label>
                <Input
                  id="targetIdentifier"
                  placeholder="Username, account name, etc."
                  value={formData.targetIdentifier}
                  onChange={(e) => handleInputChange('targetIdentifier', e.target.value)}
                  className="bg-input border-border focus:ring-whatsapp"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportReason" className="text-foreground">
                Security Violation Details *
              </Label>
              <Textarea
                id="reportReason"
                placeholder="automated spamming, phishing attempts, unauthorized access, etc."
                value={formData.reportReason}
                onChange={(e) => handleInputChange('reportReason', e.target.value)}
                required
                className="bg-input border-border focus:ring-whatsapp min-h-[80px]"
              />
            </div>
          </div>

          {/* Report Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Send className="h-5 w-5 mr-2 text-cyber" />
              Report Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientEmail" className="text-foreground">
                  Recipient Email *
                </Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  placeholder="security@company.com"
                  value={formData.recipientEmail}
                  onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                  required
                  className="bg-input border-border focus:ring-cyber"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senderName" className="text-foreground">
                  Your Name *
                </Label>
                <Input
                  id="senderName"
                  placeholder="Security Researcher"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                  required
                  className="bg-input border-border focus:ring-cyber"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactDetails" className="text-foreground">
                Contact Information *
              </Label>
              <Input
                id="contactDetails"
                placeholder="your.email@company.com or phone number"
                value={formData.contactDetails}
                onChange={(e) => handleInputChange('contactDetails', e.target.value)}
                required
                className="bg-input border-border focus:ring-cyber"
              />
            </div>
          </div>

          {/* Rate Limit Warning */}
          <div className="bg-cyber/10 border border-cyber/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-cyber" />
              <span className="text-foreground">
                Rate limited to 1 report per minute for security purposes
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-hover transition-all h-12"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                <span>Sending Report...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Security Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};