
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Shield, Users, Bot, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

const Dashboard = () => {
  const { metrics, threatTimeline, riskDistribution, topThreats, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg">Failed to load dashboard data</p>
          <p className="text-slate-400 text-sm mt-2">Please check your API connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Users</CardTitle>
            <Users className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics?.activeUsers?.toLocaleString() || '0'}</div>
            <p className="text-xs text-slate-400">
              <span className={metrics?.userGrowth?.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                {metrics?.userGrowth || 'N/A'}
              </span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Threats Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics?.threatsDetected?.toLocaleString() || '0'}</div>
            <p className="text-xs text-slate-400">
              <span className={metrics?.threatGrowth?.startsWith('+') ? 'text-red-400' : 'text-green-400'}>
                {metrics?.threatGrowth || 'N/A'}
              </span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Threats Blocked</CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics?.threatsBlocked?.toLocaleString() || '0'}</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">{metrics?.blockRate || 'N/A'}</span> success rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Bot Traffic</CardTitle>
            <Bot className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics?.botTraffic?.toLocaleString() || '0'}</div>
            <p className="text-xs text-slate-400">
              <span className="text-orange-400">{metrics?.botPercentage || 'N/A'}</span> of total traffic
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Timeline */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Threat Activity (24h)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Real-time threat detection and blocking rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatTimeline || []}>
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
                <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} name="Threats Detected" />
                <Line type="monotone" dataKey="blocked" stroke="#10b981" strokeWidth={2} name="Threats Blocked" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              User Risk Distribution
            </CardTitle>
            <CardDescription className="text-slate-400">
              Current user risk assessment breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(riskDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {(riskDistribution || []).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Threats Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Security Threats</CardTitle>
          <CardDescription className="text-slate-400">
            Most frequent threats detected in the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(topThreats || []).map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-lg font-semibold text-white">{index + 1}</div>
                  <div>
                    <div className="text-white font-medium">{threat.type}</div>
                    <div className="text-sm text-slate-400">{threat.count} incidents detected</div>
                  </div>
                </div>
                <Badge 
                  variant={threat.severity === 'high' ? 'destructive' : threat.severity === 'medium' ? 'default' : 'secondary'}
                  className={
                    threat.severity === 'high' ? 'bg-red-600 text-white' :
                    threat.severity === 'medium' ? 'bg-orange-600 text-white' :
                    'bg-slate-600 text-white'
                  }
                >
                  {threat.severity.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
