import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { ReportForm } from '@/components/ReportForm';
import { WelcomeModal } from '@/components/WelcomeModal';
import { LogOut, MessageCircle, Shield, Users, ExternalLink, Crown } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome modal for new users (you could also check if it's their first login)
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleJoinChannel = () => {
    window.open('https://whatsapp.com/channel/0029VaesBAXJJhzefVszDu3h', '_blank');
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">WhatsApp Reporter</h1>
                <p className="text-xs text-muted-foreground">Professional Security Suite</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {user?.user_metadata?.full_name || 'Security Professional'}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-border hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Status</CardTitle>
              <Crown className="h-4 w-4 text-whatsapp" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-whatsapp">Premium</div>
              <p className="text-xs text-muted-foreground">Professional Account</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Security Level</CardTitle>
              <Shield className="h-4 w-4 text-cyber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber">Maximum</div>
              <p className="text-xs text-muted-foreground">Enterprise Grade</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Community</CardTitle>
              <Users className="h-4 w-4 text-whatsapp" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Connected</div>
              <p className="text-xs text-muted-foreground">Global Network</p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="bg-gradient-primary/10 border-primary/20 shadow-neon">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-whatsapp" />
              Welcome to Your Security Dashboard
            </CardTitle>
            <CardDescription className="text-foreground/80">
              Generate professional WhatsApp account security reports with our advanced reporting system. 
              Each report is professionally formatted and includes comprehensive security assessment details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleJoinChannel}
              variant="whatsapp"
              className="w-full sm:w-auto"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Our WhatsApp Channel
            </Button>
          </CardContent>
        </Card>

        {/* Report Form */}
        <ReportForm />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Professional Reporting</CardTitle>
              <CardDescription className="text-muted-foreground">
                Generate comprehensive security assessment reports for WhatsApp accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-whatsapp rounded-full mr-3"></div>
                Automated report generation
              </div>
              <div className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-cyber rounded-full mr-3"></div>
                Professional email formatting
              </div>
              <div className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-whatsapp rounded-full mr-3"></div>
                Security compliance ready
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Advanced Security</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enterprise-grade security features for professional use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-cyber rounded-full mr-3"></div>
                Rate limiting protection
              </div>
              <div className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-whatsapp rounded-full mr-3"></div>
                Encrypted data transmission
              </div>
              <div className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-cyber rounded-full mr-3"></div>
                Audit trail logging
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © Mr Smile modders - Professional Security Solutions
          </p>
        </div>
      </footer>

      {/* Welcome Modal */}
      <WelcomeModal isOpen={showWelcome} onClose={handleCloseWelcome} />
    </div>
  );
};