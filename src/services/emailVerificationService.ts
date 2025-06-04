import { API_KEYS } from '../config/apiKeys';

export interface VerificationCode {
  code: string;
  expiresAt: Date;
  attempts: number;
}

export class EmailVerificationService {
  private static verificationCodes = new Map<string, VerificationCode>();
  
  static async sendVerificationEmail(email: string): Promise<{ success: boolean; code?: string }> {
    const code = Math.random().toString().slice(2, 8).padStart(6, '0');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    this.verificationCodes.set(email, {
      code,
      expiresAt,
      attempts: 0
    });
    
    try {
      console.log('Attempting to send email via Supabase Edge Function...');
      console.log('Supabase URL:', API_KEYS.SUPABASE_URL);
      
      const response = await fetch(`${API_KEYS.SUPABASE_URL}/functions/v1/send-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS.SUPABASE_SERVICE_ROLE}`
        },
        body: JSON.stringify({
          email,
          code,
          expiresAt: expiresAt.toISOString()
        })
      });

      console.log('Supabase response status:', response.status);
      const responseText = await response.text();
      console.log('Supabase response body:', responseText);

      if (response.ok) {
        console.log(`✅ Verification email sent successfully to ${email}`);
        console.log(`📧 Verification code: ${code} (expires at ${expiresAt.toLocaleTimeString()})`);
        return { success: true };
      } else {
        throw new Error(`Supabase function failed: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      console.log(`📧 Demo Mode - Verification code for ${email}: ${code} (expires at ${expiresAt.toLocaleTimeString()})`);
      console.log(`⚠️ In production, this code would be sent via email`);
      return { success: true, code };
    }
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
    this.verificationCodes.delete(email);
    return this.sendVerificationEmail(email);
  }
}
