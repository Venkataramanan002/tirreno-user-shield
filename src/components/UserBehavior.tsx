
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { User, Search, Clock, MousePointer, Navigation } from "lucide-react";
import { useState } from "react";

const UserBehavior = () => {
  const [searchUser, setSearchUser] = useState("");

  // Mock data for user behavior analytics
  const sessionData = [
    { time: "00:00", sessions: 245, anomalies: 12 },
    { time: "04:00", sessions: 189, anomalies: 8 },
    { time: "08:00", sessions: 567, anomalies: 23 },
    { time: "12:00", sessions: 789, anomalies: 31 },
    { time: "16:00", sessions: 834, anomalies: 28 },
    { time: "20:00", sessions: 623, anomalies: 19 },
  ];

  const recentUsers = [
    {
      id: "user_001",
      email: "john.doe@example.com",
      riskScore: 85,
      status: "suspicious",
      location: "Unknown VPN",
      device: "Chrome/Windows",
      lastActivity: "2 min ago",
      anomalies: ["Multiple failed logins", "New device", "Unusual location"]
    },
    {
      id: "user_002", 
      email: "jane.smith@example.com",
      riskScore: 32,
      status: "normal",
      location: "New York, US",
      device: "Safari/macOS",
      lastActivity: "5 min ago",
      anomalies: []
    },
    {
      id: "user_003",
      email: "bob.wilson@example.com", 
      riskScore: 67,
      status: "warning",
      location: "London, UK",
      device: "Firefox/Linux",
      lastActivity: "12 min ago",
      anomalies: ["Rapid navigation", "Unusual click patterns"]
    },
    {
      id: "user_004",
      email: "alice.brown@example.com",
      riskScore: 15,
      status: "normal", 
      location: "California, US",
      device: "Chrome/Android",
      lastActivity: "18 min ago",
      anomalies: []
    }
  ];

  const behaviorMetrics = [
    { metric: "Average Session Duration", value: "8m 42s", trend: "+12%" },
    { metric: "Page Views per Session", value: "4.7", trend: "-3%" },
    { metric: "Bounce Rate", value: "23%", trend: "+5%" },
    { metric: "Suspicious Patterns", value: "67", trend: "+18%" }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-400";
    if (score >= 40) return "text-orange-400";
    return "text-green-400";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "suspicious":
        return <Badge className="bg-red-600 text-white">Suspicious</Badge>;
      case "warning":
        return <Badge className="bg-orange-600 text-white">Warning</Badge>;
      default:
        return <Badge className="bg-green-600 text-white">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Behavior Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {behaviorMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <p className="text-xs text-slate-400">
                <span className={metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                  {metric.trend}
                </span> from last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Session Activity Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            Session Activity & Anomalies
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time user sessions and behavioral anomaly detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="sessions" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} name="Active Sessions" />
              <Area type="monotone" dataKey="anomalies" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Anomalies Detected" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Search and Management */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            User Behavior Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Monitor individual user patterns and risk assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex space-x-2 mb-6">
            <Input
              placeholder="Search by user ID, email, or IP address..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* User List */}
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.email}</div>
                      <div className="text-sm text-slate-400">ID: {user.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(user.status)}
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getRiskColor(user.riskScore)}`}>
                        {user.riskScore}
                      </div>
                      <div className="text-xs text-slate-400">Risk Score</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{user.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{user.lastActivity}</span>
                  </div>
                </div>

                {user.anomalies.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm text-slate-400 mb-2">Detected Anomalies:</div>
                    <div className="flex flex-wrap gap-2">
                      {user.anomalies.map((anomaly, index) => (
                        <Badge key={index} variant="outline" className="text-orange-400 border-orange-400">
                          {anomaly}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBehavior;
