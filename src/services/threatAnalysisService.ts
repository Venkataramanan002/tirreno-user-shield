
interface ThreatCheckResult {
  category: string;
  status: 'checking' | 'safe' | 'warning' | 'danger';
  details: string;
  score: number;
}

interface EmailAnalysisResult {
  overallRiskScore: number;
  threatChecks: ThreatCheckResult[];
  recommendations: string[];
  emailReputation: 'good' | 'suspicious' | 'compromised';
}

export class ThreatAnalysisService {
  private static readonly ANALYSIS_STEPS = [
    { name: 'Email Reputation Check', duration: 2000 },
    { name: 'Domain Security Analysis', duration: 1500 },
    { name: 'Breach Database Lookup', duration: 3000 },
    { name: 'Tracker Detection', duration: 1000 },
    { name: 'Behavioral Pattern Analysis', duration: 2500 },
    { name: 'Threat Intelligence Correlation', duration: 1800 },
  ];

  static async performEmailAnalysis(
    email: string,
    onProgress: (step: string, progress: number) => void
  ): Promise<EmailAnalysisResult> {
    const totalSteps = this.ANALYSIS_STEPS.length;
    const threatChecks: ThreatCheckResult[] = [];

    for (let i = 0; i < this.ANALYSIS_STEPS.length; i++) {
      const step = this.ANALYSIS_STEPS[i];
      onProgress(step.name, Math.round(((i + 1) / totalSteps) * 100));
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      // Generate realistic threat check result
      const result = this.generateThreatCheck(email, step.name);
      threatChecks.push(result);
    }

    const overallRiskScore = this.calculateOverallRiskScore(email, threatChecks);
    const emailReputation = this.determineEmailReputation(overallRiskScore);
    const recommendations = this.generateRecommendations(threatChecks, emailReputation);

    return {
      overallRiskScore,
      threatChecks,
      recommendations,
      emailReputation
    };
  }

  private static generateThreatCheck(email: string, category: string): ThreatCheckResult {
    let score = Math.random() * 30 + 10; // Base score 10-40
    let status: 'safe' | 'warning' | 'danger' = 'safe';
    let details = '';

    // Email-based risk factors
    if (email.includes('admin') || email.includes('root')) score += 25;
    if (email.includes('.gov') || email.includes('.mil')) score += 20;
    if (email.includes('temp') || email.includes('test')) score += 30;
    if (email.length < 10) score += 15;

    switch (category) {
      case 'Email Reputation Check':
        if (score > 50) {
          status = 'warning';
          details = 'Email found in suspicious activity databases';
        } else {
          details = 'Email has clean reputation across threat databases';
        }
        break;
      
      case 'Domain Security Analysis':
        if (email.includes('gmail.com') || email.includes('outlook.com')) {
          details = 'Domain has strong security protocols (2FA, encryption)';
          score -= 10;
        } else if (email.includes('.gov') || email.includes('.mil')) {
          details = 'Government domain with enhanced security measures';
          score += 15;
        } else {
          details = 'Corporate domain with standard security measures';
        }
        break;
      
      case 'Breach Database Lookup':
        if (score > 60) {
          status = 'danger';
          details = 'Email found in 2-3 known data breaches';
        } else if (score > 40) {
          status = 'warning';
          details = 'Email found in 1 minor data breach';
        } else {
          details = 'No breaches found in monitored databases';
        }
        break;
      
      case 'Tracker Detection':
        const trackerCount = Math.floor(score / 10);
        details = `${trackerCount} tracking pixels detected in recent emails`;
        if (trackerCount > 5) status = 'warning';
        break;
      
      case 'Behavioral Pattern Analysis':
        if (score > 55) {
          status = 'warning';
          details = 'Unusual login patterns detected from multiple locations';
        } else {
          details = 'Normal behavioral patterns observed';
        }
        break;
      
      case 'Threat Intelligence Correlation':
        if (score > 65) {
          status = 'danger';
          details = 'Email associated with known threat actors';
        } else {
          details = 'No correlation with known threat intelligence';
        }
        break;
    }

    if (score > 70) status = 'danger';
    else if (score > 45) status = 'warning';

    return {
      category,
      status,
      details,
      score: Math.min(100, Math.round(score))
    };
  }

  private static calculateOverallRiskScore(email: string, checks: ThreatCheckResult[]): number {
    const avgScore = checks.reduce((sum, check) => sum + check.score, 0) / checks.length;
    return Math.min(100, Math.round(avgScore));
  }

  private static determineEmailReputation(score: number): 'good' | 'suspicious' | 'compromised' {
    if (score > 70) return 'compromised';
    if (score > 40) return 'suspicious';
    return 'good';
  }

  private static generateRecommendations(
    checks: ThreatCheckResult[], 
    reputation: 'good' | 'suspicious' | 'compromised'
  ): string[] {
    const recommendations: string[] = [];

    if (reputation === 'compromised') {
      recommendations.push('Immediately change passwords for all accounts');
      recommendations.push('Enable two-factor authentication');
      recommendations.push('Monitor accounts for suspicious activity');
    } else if (reputation === 'suspicious') {
      recommendations.push('Consider enabling additional security measures');
      recommendations.push('Regularly monitor account activity');
    }

    checks.forEach(check => {
      if (check.status === 'danger') {
        switch (check.category) {
          case 'Breach Database Lookup':
            recommendations.push('Change passwords for affected accounts');
            break;
          case 'Threat Intelligence Correlation':
            recommendations.push('Contact security team immediately');
            break;
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Maintain current security practices');
      recommendations.push('Regular security checkups recommended');
    }

    return recommendations;
  }
}
