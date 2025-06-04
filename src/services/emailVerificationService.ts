
export interface VerificationCode {
  code: string;
  expiresAt: Date;
  attempts: number;
}

export class EmailVerificationService {
  private static verificationCodes = new Map<string, VerificationCode>();
  
  static async sendVerificationEmail(email: string): Promise<{ success: boolean; code?: string }> {
    // Generate a realistic 6-digit code
    const code = Math.random().toString().slice(2, 8).padStart(6, '0');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Store the code
    this.verificationCodes.set(email, {
      code,
      expiresAt,
      attempts: 0
    });
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Verification email sent to ${email}`);
    console.log(`Verification code: ${code} (expires at ${expiresAt.toLocaleTimeString()})`);
    
    // In a real implementation, this would not return the code
    // For demo purposes, we return it so users can test
    return { success: true, code };
  }
  
  static verifyCode(email: string, inputCode: string): { success: boolean; message: string } {
    const storedVerification = this.verificationCodes.get(email);
    
    if (!storedVerification) {
      return { success: false, message: 'No verification code found. Please request a new one.' };
    }
    
    if (new Date() > storedVerification.expiresAt) {
      this.verificationCodes.delete(email);
      return { success: false, message: 'Verification code has expired. Please request a new one.' };
    }
    
    storedVerification.attempts++;
    
    if (storedVerification.attempts > 3) {
      this.verificationCodes.delete(email);
      return { success: false, message: 'Too many failed attempts. Please request a new code.' };
    }
    
    if (storedVerification.code === inputCode) {
      this.verificationCodes.delete(email);
      return { success: true, message: 'Email verified successfully!' };
    }
    
    return { 
      success: false, 
      message: `Invalid code. ${4 - storedVerification.attempts} attempts remaining.` 
    };
  }
  
  static resendCode(email: string): Promise<{ success: boolean; code?: string }> {
    // Clear existing code and send new one
    this.verificationCodes.delete(email);
    return this.sendVerificationEmail(email);
  }
}
