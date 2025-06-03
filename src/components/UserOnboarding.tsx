import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadSQL } from "@/utils/sqlExporter";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendVerificationEmail = async () => {
    setIsLoading(true);
    
    // Simulate sending verification email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock verification code
    const mockCode = Math.random().toString(36).substring(2, 8).toUpperCase();
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
    
    if (formData.verificationCode.length >= 6) {
      toast({
        title: "Email Verified Successfully",
        description: "Welcome to Security Analysis Platform!",
      });
      setStep(3);
      setTimeout(() => {
        onUserVerified();
      }, 2000);
    } else {
      toast({
        title: "Invalid Verification Code",
        description: "Please enter a valid verification code.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerificationSent(true);
      setSubmitMessage(`Verification email sent to ${formData.email}. Please check your inbox and click the verification link to proceed.`);
      
      // Generate and download SQL file with user data
      downloadSQL(formData, {
        submissionTime: new Date().toISOString(),
        platform: 'Security Analysis Platform'
      });
      
      console.log('User registration data:', formData);
      console.log('SQL file generated and downloaded');
    }, 2000);
  };

  const validateForm = () => {
    // Add your validation logic here
    return true; // Placeholder for validation logic
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
              {step === 1 && "Please provide your information to begin security analysis"}
              {step === 2 && "Verify your email address to continue"}
              {step === 3 && "Setup complete! Redirecting to platform..."}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
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
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-slate-300">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
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
                  placeholder="Describe what you'd like to analyze or any specific security concerns..."
                  rows={3}
                />
              </div>

              <Button
                onClick={sendVerificationEmail}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Verification Email...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Send Verification Email</span>
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
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-slate-300">Enter Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={formData.verificationCode}
                  onChange={(e) => handleInputChange("verificationCode", e.target.value)}
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
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Welcome, {formData.firstName}!</h3>
              <p className="text-slate-300">
                Your account has been verified successfully. Redirecting to the Security Analysis Platform...
              </p>
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
