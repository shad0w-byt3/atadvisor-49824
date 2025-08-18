import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="Terms of Service - AgriTech Advisor"
        description="Read the terms and conditions for using AgriTech Advisor's farming platform and services."
      />
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-agriculture-green mb-6">Terms of Service</h1>
          
          <Card className="agriculture-card p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using AgriTech Advisor, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Service Description</h2>
              <p className="text-muted-foreground mb-3">
                AgriTech Advisor provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>AI-powered crop analysis and health assessment</li>
                <li>Weather monitoring and alerts</li>
                <li>Market price information</li>
                <li>Farming tips and recommendations</li>
                <li>Agricultural tools and calculators</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">User Responsibilities</h2>
              <p className="text-muted-foreground mb-3">
                As a user, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not share your account credentials with others</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to hack or disrupt the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">AI Recommendations Disclaimer</h2>
              <p className="text-muted-foreground">
                Our AI recommendations are based on image analysis and available data. While we strive for accuracy, these should be used as guidance only. Always consult with local agricultural experts for critical farming decisions. We are not liable for crop losses or damages resulting from following our recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                AgriTech Advisor shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at:
                <br />
                Email: legal@agritech-advisor.com
                <br />
                Address: Kigali, Rwanda
              </p>
            </section>
          </Card>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Terms;