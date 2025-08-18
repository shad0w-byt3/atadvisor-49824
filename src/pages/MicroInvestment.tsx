
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

const MicroInvestment = () => {
  const [activeTab, setActiveTab] = useState('opportunities');

  const opportunities = [
    {
      id: 1,
      title: "Maize Farming Expansion",
      organization: "Green Future Microfinance",
      amount: "KSh 50,000",
      interestRate: "8% annually",
      duration: "12 months",
      purpose: "Seeds, fertilizer, and land preparation for 2 acres",
      requirements: ["Valid ID", "Farm ownership proof", "Previous harvest records"],
      approvalTime: "3-5 days",
      repaymentSchedule: "Monthly after harvest",
      riskLevel: "Low"
    },
    {
      id: 2,
      title: "Greenhouse Setup Loan",
      organization: "Agricultural Development Bank",
      amount: "KSh 150,000",
      interestRate: "12% annually", 
      duration: "24 months",
      purpose: "Complete greenhouse structure and irrigation system",
      requirements: ["Business plan", "Collateral", "Training certificate"],
      approvalTime: "7-14 days",
      repaymentSchedule: "Quarterly",
      riskLevel: "Medium"
    },
    {
      id: 3,
      title: "Input Credit Package",
      organization: "Farmer's Choice Cooperative",
      amount: "KSh 25,000",
      interestRate: "6% annually",
      duration: "6 months",
      purpose: "Seeds, fertilizer, and pesticides for the season",
      requirements: ["Cooperative membership", "Previous season records"],
      approvalTime: "1-2 days",
      repaymentSchedule: "After harvest",
      riskLevel: "Low"
    }
  ];

  const myInvestments = [
    {
      id: 1,
      title: "Drip Irrigation System",
      amount: "KSh 75,000",
      amountPaid: "KSh 45,000",
      progress: 60,
      nextPayment: "KSh 15,000",
      paymentDate: "March 15, 2024",
      status: "Active"
    }
  ];

  const investmentTips = [
    {
      title: "Build Credit History",
      description: "Start with smaller loans and maintain perfect repayment records",
      icon: TrendingUp
    },
    {
      title: "Plan Your Cash Flow",
      description: "Align loan repayments with your harvest and income cycles",
      icon: Clock
    },
    {
      title: "Diversify Funding Sources",
      description: "Don't rely on just one lender - explore multiple options",
      icon: Users
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            💳 Micro-Investment & Credit Access
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Access affordable financing for your farming operations
          </p>
        </div>

        {/* Quick Stats */}
        <Card className="agriculture-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-agriculture-green dark:text-green-400">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Loans</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">6%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Min Interest Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Days Avg Approval</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">85%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            onClick={() => setActiveTab('opportunities')}
            variant={activeTab === 'opportunities' ? 'default' : 'outline'}
            className={activeTab === 'opportunities' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Opportunities
          </Button>
          <Button
            onClick={() => setActiveTab('my-investments')}
            variant={activeTab === 'my-investments' ? 'default' : 'outline'}
            className={activeTab === 'my-investments' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            My Loans
          </Button>
          <Button
            onClick={() => setActiveTab('tips')}
            variant={activeTab === 'tips' ? 'default' : 'outline'}
            className={activeTab === 'tips' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Investment Tips
          </Button>
        </div>

        {/* Investment Opportunities */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="agriculture-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-1">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{opportunity.organization}</p>
                  </div>
                  <Badge className={getRiskColor(opportunity.riskLevel)}>
                    {opportunity.riskLevel} Risk
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Loan Amount</p>
                      <p className="text-xl font-bold text-agriculture-green dark:text-green-400">
                        {opportunity.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                      <p className="font-medium text-gray-900 dark:text-white">{opportunity.interestRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-white">{opportunity.duration}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Approval Time</p>
                      <p className="font-medium text-gray-900 dark:text-white">{opportunity.approvalTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Repayment</p>
                      <p className="font-medium text-gray-900 dark:text-white">{opportunity.repaymentSchedule}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Purpose</p>
                  <p className="text-gray-800 dark:text-gray-200">{opportunity.purpose}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Requirements</p>
                  <div className="space-y-1">
                    {opportunity.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* My Investments */}
        {activeTab === 'my-investments' && (
          <div className="space-y-4">
            {myInvestments.map((investment) => (
              <Card key={investment.id} className="agriculture-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                      {investment.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Total Loan: {investment.amount}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {investment.status}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Payment Progress</span>
                    <span className="text-gray-900 dark:text-white">
                      {investment.amountPaid} / {investment.amount}
                    </span>
                  </div>
                  <Progress value={investment.progress} className="h-3" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {investment.progress}% completed
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-400">
                      Next Payment: {investment.nextPayment}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Due: {investment.paymentDate}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                    Make Payment
                  </Button>
                  <Button variant="outline">
                    View Statement
                  </Button>
                </div>
              </Card>
            ))}

            {myInvestments.length === 0 && (
              <Card className="agriculture-card p-8 text-center">
                <DollarSign className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No active loans
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore investment opportunities to grow your farm
                </p>
                <Button 
                  onClick={() => setActiveTab('opportunities')}
                  className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Browse Opportunities
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Investment Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            {investmentTips.map((tip, index) => (
              <Card key={index} className="agriculture-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <tip.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-agriculture-green dark:text-green-400 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="agriculture-card p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                    Important Reminder
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Always read loan terms carefully and ensure you can meet repayment schedules. 
                    Consider seeking financial advice before taking large loans.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default MicroInvestment;
