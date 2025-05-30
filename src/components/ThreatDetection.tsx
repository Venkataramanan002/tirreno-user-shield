
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, Bot, AlertTriangle, Ban, CheckCheck, AlertCircle } from "lucide-react";

const ThreatDetection = () => {
  // Mock data for threat detection
  const threatTypes = [
    { type: "Bot Traffic", detected: 156, blocked: 142, severity: "high" },
    { type: "Brute Force", detected: 89, blocked: 87, severity: "high" },
    { type: "Account Takeover", detected: 45, blocked: 38, severity: "medium" },
    { type: "Fake Accounts", detected: 32, blocked: 29, severity: "medium" },
    { type: "Session Hijacking", detected: 18, blocked: 16, severity: "low" },
    { type: "CSRF Attacks", detected: 12, blocked: 11, severity: "medium" },
  ];

  const hourlyData = [
    { hour: "00", bots: 12, fraud: 5, attacks: 3 },
    { hour: "04", bots: 8, fraud: 2, attacks: 1 },
    { hour: "08", bots: 25, fraud: 8, attacks: 4 },
    { hour: "12", bots: 35, fraud: 12, attacks: 7 },
    { hour: "16", bots: 42, fraud: 15, attacks: 9 },
    { hour: "20", bots: 28, fraud: 9, attacks: 5 },
  ];

  const detectionRules = [
    {
      id: "rule_001",
      name: "Multiple Failed Login Attempts",
      description: "Detects users with 5+ failed login attempts within 10 minutes",
      status: "active",
      triggered: 23,
      accuracy: 94
    },
    {
      id: "rule_002", 
      name: "Suspicious Geolocation",
      description: "Flags logins from unusual geographic locations",
      status: "active",
      triggered: 67,
      accuracy: 87
    },
    {
      id: "rule_003",
      name: "Bot-like Navigation Patterns",
      description: "Identifies automated behavior based on click patterns",
      status: "active", 
      triggered: 156,
      accuracy: 91
    },
    {
      id: "rule_004",
      name: "Rapid Account Creation",
      description: "Detects multiple accounts created from same IP/device",
      status: "inactive",
      triggered: 0,
      accuracy: 83
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-400";
      case "medium": return "text-orange-400";
      default: return "text-yellow-400";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-600 text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-600 text-white">Medium</Badge>;
      default:
        return <Badge className="bg-yellow-600 text-white">Low</Badge>;
    }
  };

  const getBlockedPercentage = (detected: number, blocked: number) => {
    return Math.round((blocked / detected) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Detection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">352</div>
            <p className="text-xs text-slate-400">
              <span className="text-red-400">+15%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Blocked</CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">323</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">91.8%</span> success rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Rules</CardTitle>
            <CheckCheck className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-slate-400">
              <span className="text-slate-400">1</span> inactive rule
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Types Breakdown */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            Threat Detection Breakdown
          </CardTitle>
          <CardDescription className="text-slate-400">
            Analysis of different threat types and blocking effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threatTypes.map((threat, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className={`w-5 h-5 ${getSeverityColor(threat.severity)}`} />
                      <span className="text-white font-medium">{threat.type}</span>
                    </div>
                    {getSeverityBadge(threat.severity)}
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{threat.detected}</div>
                    <div className="text-xs text-slate-400">detected</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">
                    Blocked: {threat.blocked} / {threat.detected}
                  </span>
                  <span className="text-sm text-green-400 font-medium">
                    {getBlockedPercentage(threat.detected, threat.blocked)}%
                  </span>
                </div>
                
                <Progress 
                  value={getBlockedPercentage(threat.detected, threat.blocked)} 
                  className="h-2 bg-slate-600"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Threat Activity */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Hourly Threat Activity</CardTitle>
          <CardDescription className="text-slate-400">
            Threat detection patterns over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="bots" fill="#ef4444" name="Bot Traffic" />
              <Bar dataKey="fraud" fill="#f59e0b" name="Fraud Attempts" />
              <Bar dataKey="attacks" fill="#8b5cf6" name="Direct Attacks" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detection Rules */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Detection Rules</CardTitle>
          <CardDescription className="text-slate-400">
            Manage and monitor active threat detection rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectionRules.map((rule) => (
              <div key={rule.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-white font-medium">{rule.name}</span>
                      <Badge 
                        className={rule.status === 'active' ? 'bg-green-600 text-white' : 'bg-slate-600 text-white'}
                      >
                        {rule.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{rule.description}</p>
                    <div className="flex items-center space-x-6">
                      <div className="text-sm">
                        <span className="text-slate-400">Triggered: </span>
                        <span className="text-white font-medium">{rule.triggered} times</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-400">Accuracy: </span>
                        <span className="text-green-400 font-medium">{rule.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-slate-600 text-slate-300 hover:bg-slate-600"
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      className={rule.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                    >
                      {rule.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatDetection;
