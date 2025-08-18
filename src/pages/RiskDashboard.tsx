
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, CloudRain, TrendingDown, DollarSign, Thermometer } from 'lucide-react';

const RiskDashboard = () => {
  const [overallRiskScore] = useState(65); // Medium risk

  const risks = [
    {
      category: "Weather Risk",
      score: 75,
      level: "High",
      icon: CloudRain,
      factors: [
        { name: "Drought Risk", value: 80, status: "high" },
        { name: "Flood Risk", value: 20, status: "low" },
        { name: "Temperature Stress", value: 60, status: "medium" }
      ],
      recommendations: [
        "Consider drought-resistant crop varieties",
        "Install water conservation systems",
        "Monitor weather forecasts daily"
      ]
    },
    {
      category: "Financial Risk",
      score: 45,
      level: "Medium",
      icon: DollarSign,
      factors: [
        { name: "Input Costs", value: 70, status: "high" },
        { name: "Market Volatility", value: 40, status: "medium" },
        { name: "Credit Exposure", value: 25, status: "low" }
      ],
      recommendations: [
        "Diversify crop portfolio",
        "Consider crop insurance",
        "Build emergency fund"
      ]
    },
    {
      category: "Crop Health Risk",
      score: 30,
      level: "Low",
      icon: Thermometer,
      factors: [
        { name: "Disease Pressure", value: 35, status: "medium" },
        { name: "Pest Activity", value: 20, status: "low" },
        { name: "Soil Degradation", value: 25, status: "low" }
      ],
      recommendations: [
        "Continue current pest management",
        "Regular soil testing recommended",
        "Monitor for early disease signs"
      ]
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "Weather Alert",
      message: "Heavy rainfall expected in 3 days - prepare drainage",
      severity: "medium",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "Market Alert",
      message: "Maize prices dropping 15% - consider holding harvest",
      severity: "high",
      time: "5 hours ago"
    },
    {
      id: 3,
      type: "Pest Alert",
      message: "Fall armyworm activity reported in nearby farms",
      severity: "medium",
      time: "1 day ago"
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'High': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getOverallRiskLevel = (score) => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            📊 Risk Score Dashboard
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Monitor climate and financial risks for your farm
          </p>
        </div>

        {/* Overall Risk Score */}
        <Card className="agriculture-card p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
              Overall Farm Risk Score
            </h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
              <div 
                className={`absolute inset-0 rounded-full border-8 border-t-transparent transition-all duration-500 ${
                  overallRiskScore >= 70 ? 'border-red-500' : 
                  overallRiskScore >= 40 ? 'border-yellow-500' : 'border-green-500'
                }`}
                style={{
                  transform: `rotate(${(overallRiskScore / 100) * 360}deg)`,
                  borderColor: overallRiskScore >= 70 ? '#ef4444' : 
                              overallRiskScore >= 40 ? '#eab308' : '#22c55e'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-3xl font-bold ${getRiskColor(getOverallRiskLevel(overallRiskScore))}`}>
                    {overallRiskScore}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Risk Score</p>
                </div>
              </div>
            </div>
            <Badge className={getRiskBgColor(getOverallRiskLevel(overallRiskScore))}>
              {getOverallRiskLevel(overallRiskScore)} Risk
            </Badge>
          </div>
        </Card>

        {/* Active Alerts */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className="p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{alert.type}</h4>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                  </div>
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'high' ? 'text-red-500' : 
                    alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Risk Categories */}
        <div className="space-y-4">
          {risks.map((risk, index) => (
            <Card key={index} className="agriculture-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center`}>
                    <risk.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                      {risk.category}
                    </h3>
                    <p className={`text-sm ${getRiskColor(risk.level)}`}>
                      Risk Score: {risk.score}/100
                    </p>
                  </div>
                </div>
                <Badge className={getRiskBgColor(risk.level)}>
                  {risk.level}
                </Badge>
              </div>

              {/* Risk Factors */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  {risk.factors.map((factor, factorIndex) => (
                    <div key={factorIndex} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{factor.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={factor.value} className="w-20 h-2" />
                        <span className={`text-xs ${getRiskColor(
                          factor.value >= 70 ? 'High' : factor.value >= 40 ? 'Medium' : 'Low'
                        )}`}>
                          {factor.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {risk.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <Shield className="h-3 w-3 text-agriculture-green dark:text-green-400 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Risk History */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Risk Trend (Last 30 Days)
          </h3>
          <div className="h-32 bg-gray-50 dark:bg-gray-900/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Risk trend chart would be displayed here</p>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default RiskDashboard;
