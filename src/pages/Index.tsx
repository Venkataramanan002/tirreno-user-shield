
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboard from "@/components/Dashboard";
import UserBehavior from "@/components/UserBehavior";
import ThreatDetection from "@/components/ThreatDetection";
import SecurityEvents from "@/components/SecurityEvents";
import UserManagement from "@/components/UserManagement";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Tirreno Security Platform</h1>
              <p className="text-sm text-slate-400">Advanced User Behavior Analytics & Threat Detection</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="behavior" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              User Behavior
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Threat Detection
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Security Events
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="behavior">
            <UserBehavior />
          </TabsContent>

          <TabsContent value="threats">
            <ThreatDetection />
          </TabsContent>

          <TabsContent value="events">
            <SecurityEvents />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
