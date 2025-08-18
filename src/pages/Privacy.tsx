import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="Privacy Policy - AgriTech Advisor"
        description="Learn how AgriTech Advisor protects your privacy and handles your data responsibly."
      />
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-agriculture-green mb-6">Privacy Policy</h1>
          
          <Card className="agriculture-card p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Data Collection</h2>
              <p className="text-muted-foreground mb-3">
                AgriTech Advisor collects only the information necessary to provide you with the best farming experience:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Account information (name, email, location)</li>
                <li>Farm data (crop types, farm size, location)</li>
                <li>Images for AI crop analysis</li>
                <li>Usage analytics to improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Data Usage</h2>
              <p className="text-muted-foreground mb-3">
                We use your data to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Provide personalized farming recommendations</li>
                <li>Analyze crop health through AI</li>
                <li>Send relevant weather and market updates</li>
                <li>Improve our AI models and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Data Protection</h2>
              <p className="text-muted-foreground mb-3">
                Your data is protected through:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure cloud storage with industry-standard practices</li>
                <li>Regular security audits and updates</li>
                <li>Limited access on a need-to-know basis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@agritech-advisor.com
                <br />
                Address: Kigali, Rwanda
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-agriculture-green mb-3">Updates</h2>
              <p className="text-muted-foreground">
                This Privacy Policy was last updated on January 1, 2024. We may update this policy from time to time, and will notify you of any changes.
              </p>
            </section>
          </Card>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Privacy;