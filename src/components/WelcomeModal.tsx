import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Shield className="w-16 h-16 text-whatsapp" />,
      title: "Welcome to WhatsApp Reporter!",
      description: `Hello ${user?.user_metadata?.full_name || 'Security Professional'}! You've successfully joined our premium security platform.`,
      features: [
        "Professional reporting system",
        "Advanced security assessments",
        "Real-time status tracking"
      ]
    },
    {
      icon: <Zap className="w-16 h-16 text-cyber" />,
      title: "Powerful Features at Your Fingertips",
      description: "Experience cutting-edge security tools designed for professionals.",
      features: [
        "Automated report generation",
        "Email delivery system",
        "Rate limiting protection"
      ]
    },
    {
      icon: <Users className="w-16 h-16 text-whatsapp" />,
      title: "Join Our Community",
      description: "Connect with security professionals worldwide and stay updated.",
      features: [
        "Professional network access",
        "Latest security insights",
        "Community support"
      ]
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-card border-border shadow-hover p-0 overflow-hidden">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          
          {/* Content */}
          <div className="relative p-8 text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-primary/10 rounded-full border border-primary/20">
                {currentStep.icon}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {currentStep.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {currentStep.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-left">
                  <CheckCircle className="w-5 h-5 text-whatsapp flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === step 
                      ? 'bg-primary shadow-neon' 
                      : index < step 
                        ? 'bg-whatsapp' 
                        : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1 border-border hover:bg-accent"
              >
                Skip Tour
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-hover"
              >
                {step < steps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>

            {/* Step Counter */}
            <p className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};