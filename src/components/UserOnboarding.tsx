
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Mail, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadSQL, UserFormData } from "@/utils/sqlExporter";
import { setCurrentUser } from "@/services/mockApiService";

interface UserOnboardingProps {
  onUserVerified: () => void;
}

const UserOnboarding = ({ onUserVerified }: UserOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    securityConcerns: "",
    verificationCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendVerificationEmail = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Generate a mock verification code
    const mockCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(mockCode);
    
    // Simulate sending verification email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Mock verification code:", mockCode);
    
    toast({
      title: "Verification Email Sent",
      description: `A verification code has been sent to ${formData.email}. For demo purposes, use code: ${mockCode}`,
    });
    
    setStep(2);
    setIsLoading(false);
  };

  const verifyEmail = async () => {
    setIsLoading(true);
    
    // Simulate email verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formData.verificationCode.toUpperCase() === generatedCode || formData.verificationCode.length >= 6) {
      // Set up personalized data based on email
      setCurrentUser(formData.email);
      
      // Generate SQL export with personalized data
      const userFormData: UserFormData = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`
      };
      
      downloadSQL(userFormData, {
        submissionTime: new Date().toISOString(),
        platform: 'Security Analysis Platform',
        analysisId: `ANALYSIS_${Date.now()}`,
        riskScore: calculateInitialRiskScore(formData.email)
      });
      
      toast({
        title: "Analysis Complete!",
        description: `Security analysis for ${formData.email} has been generated. Your personalized SQL report is downloading.`,
      });
      
      setStep(3);
      
      setTimeout(() => {
        onUserVerified();
      }, 3000);
    } else {
      toast({
        title: "Invalid Verification Code",
        description: `Please enter the correct verification code: ${generatedCode}`,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const calculateInitialRiskScore = (email: string): number => {
    let score = Math.random() * 30 + 20;
    
    if (email.includes('admin') || email.includes('root')) score += 30;
    if (email.includes('.gov') || email.includes('.mil')) score += 25;
    if (email.includes('temp') || email.includes('test')) score += 35;
    if (email.length < 10) score += 15;
    
    return Math.min(100, Math.round(score));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone } = formData;
    
    if (!firstName.trim() || !lastName.trim()) {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    
    if (!phone.trim() || phone.length < 10) {
      return false;
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mx-auto">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Security Analysis Platform</CardTitle>
            <CardDescription className="text-slate-400">
              {step === 1 && "Enter your information for personalized security analysis"}
              {step === 2 && "Verify your email to generate your security profile"}
              {step === 3 && "Analysis complete! Preparing your personalized dashboard..."}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">What We Analyze</h4>
                    <p className="text-slate-300 text-sm">
                      Our platform generates a comprehensive security assessment including threat detection, 
                      risk scoring, behavioral analysis, and personalized security recommendations based on your profile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address * <span className="text-xs text-slate-500">(Used for personalized analysis)</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-slate-300">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Security Analyst"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityConcerns" className="text-slate-300">
                  Security Concerns or Analysis Requirements
                </Label>
                <Textarea
                  id="securityConcerns"
                  value={formData.securityConcerns}
                  onChange={(e) => handleInputChange("securityConcerns", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Describe any specific security concerns, recent incidents, or areas you'd like us to focus on in our analysis..."
                  rows={3}
                />
              </div>

              <Button
                onClick={sendVerificationEmail}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Initializing Security Analysis...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Begin Security Analysis</span>
                  </div>
                )}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-slate-300">
                We've sent a verification code to <span className="text-cyan-400">{formData.email}</span>
              </p>
              <p className="text-sm text-slate-400">
                For demo purposes, use this code: <span className="text-green-400 font-mono font-bold">{generatedCode}</span>
              </p>
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-slate-300">Enter Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={formData.verificationCode}
                  onChange={(e) => handleInputChange("verificationCode", e.target.value.toUpperCase())}
                  className="bg-slate-700/50 border-slate-600 text-white text-center text-lg tracking-widest"
                  placeholder="XXXXXX"
                  maxLength={6}
                />
              </div>
              <Button
                onClick={verifyEmail}
                disabled={formData.verificationCode.length < 6 || isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Analysis...</span>
                  </div>
                ) : (
                  "Complete Security Analysis"
                )}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Analysis Complete, {formData.firstName}!</h3>
              <p className="text-slate-300">
                Your personalized security analysis has been generated and your SQL report is downloading. 
                Redirecting to your security dashboard...
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                <div className="text-sm text-slate-400 mb-2">Analysis Summary</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Email:</span>
                    <span className="text-white ml-2">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Risk Score:</span>
                    <span className="text-yellow-400 ml-2 font-bold">{calculateInitialRiskScore(formData.email)}/100</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOnboarding;
