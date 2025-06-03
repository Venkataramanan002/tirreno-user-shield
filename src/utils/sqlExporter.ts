
interface UserFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  securityConcerns: string[];
}

export const generateSecurityAnalysisSQL = (userData: UserFormData, analysisData: any) => {
  const timestamp = new Date().toISOString();
  
  const sql = `-- Security Analysis Platform Data Export
-- Generated on: ${timestamp}
-- User: ${userData.name} (${userData.email})

-- Create database and tables if they don't exist
CREATE DATABASE IF NOT EXISTS security_analysis;
USE security_analysis;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    job_title VARCHAR(255),
    security_concerns TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Security Events table
CREATE TABLE IF NOT EXISTS security_events (
    id VARCHAR(50) PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    source VARCHAR(255),
    event_type VARCHAR(255),
    description TEXT,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    user_email VARCHAR(255),
    ip_address VARCHAR(45),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
    user_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255),
    device_type VARCHAR(100),
    ip_address VARCHAR(45),
    location VARCHAR(255),
    device_fingerprint VARCHAR(255),
    session_start DATETIME,
    risk_score DECIMAL(3,1),
    status ENUM('normal', 'suspicious', 'high-risk') DEFAULT 'normal',
    anomalies TEXT,
    activity_level ENUM('low', 'medium', 'high'),
    last_activity DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Threat Data table
CREATE TABLE IF NOT EXISTS threat_data (
    id VARCHAR(50) PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    threat_type VARCHAR(255),
    target VARCHAR(255),
    status VARCHAR(100),
    affected_systems INT DEFAULT 0,
    potential_loss VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Threat Alerts table
CREATE TABLE IF NOT EXISTS threat_alerts (
    id VARCHAR(50) PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    user_email VARCHAR(255),
    alert_type VARCHAR(255),
    description TEXT,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert user data
INSERT INTO users (name, email, phone, company, job_title, security_concerns) 
VALUES (
    '${userData.name.replace(/'/g, "''")}',
    '${userData.email}',
    '${userData.phone}',
    '${userData.company.replace(/'/g, "''")}',
    '${userData.jobTitle.replace(/'/g, "''")}',
    '${userData.securityConcerns.join(', ').replace(/'/g, "''")}'
) ON DUPLICATE KEY UPDATE
    phone = VALUES(phone),
    company = VALUES(company),
    job_title = VALUES(job_title),
    security_concerns = VALUES(security_concerns),
    updated_at = CURRENT_TIMESTAMP;

-- Sample security events data
INSERT INTO security_events (id, timestamp, source, event_type, description, severity, user_email, ip_address, location) VALUES
('SE_MalwareDetected_987', '2025-05-30 17:10:00', 'Endpoint Security', 'Malware Detected', 'A malware was detected on user''s machine.', 'critical', 'john.doe@example.com', '192.168.1.100', 'New York, USA'),
('SE_PhishingAttempt_654', '2025-05-30 17:12:30', 'Email Gateway', 'Phishing Attempt', 'A phishing email was detected and blocked.', 'high', 'jane.doe@example.com', '203.0.113.45', 'London, UK'),
('SE_DDosAttack_321', '2025-05-30 17:15:00', 'Network Firewall', 'DDoS Attack', 'A distributed denial-of-service attack was detected and mitigated.', 'critical', 'N/A', 'Multiple', 'Global');

-- Sample user sessions data
INSERT INTO user_sessions (user_id, email, device_type, ip_address, location, device_fingerprint, session_start, risk_score, status, anomalies, activity_level, last_activity) VALUES
('USER_LegitCustomer_789', 'anjali.sharma@example.com', 'Desktop', '203.0.113.10', 'Bengaluru, India', 'FP_BHQ654JKL', '2025-05-30 17:06:30', 1.2, 'normal', '', 'medium', '2025-05-30 17:07:45'),
('USER_Suspicious_456', 'suspicious.user@example.com', 'Mobile', '185.199.110.153', 'Moscow, Russia', 'FP_SUSPICIOUS_123', '2025-05-30 17:08:00', 9.1, 'suspicious', 'Multiple failed login attempts, Login from suspicious IP, Geo-location anomaly', 'high', NULL),
('USER_Bot_Detection_321', 'bot.scraper@example.com', 'Desktop', '104.28.249.200', 'Dublin, Ireland', 'FP_GHIJ4567', '2025-05-30 17:08:30', 8.8, 'high-risk', 'Extreme request rate, Automated behavior pattern, Sequential access pattern', 'high', NULL);

-- Sample threat data
INSERT INTO threat_data (id, timestamp, threat_type, target, status, affected_systems, potential_loss, description) VALUES
('TD_RansomwareAttack_001', '2025-05-30 17:20:00', 'Ransomware Attack', 'Finance Department', 'active', 15, '$500,000', 'Ransomware attack targeting financial documents.'),
('TD_DataBreach_002', '2025-05-30 17:22:30', 'Data Breach', 'Customer Database', 'contained', 3, 'Confidential', 'Unauthorized access to customer database.'),
('TD_InsiderThreat_003', '2025-05-30 17:25:00', 'Insider Threat', 'HR Department', 'investigating', 1, 'Reputational Damage', 'Suspicious activity from an internal employee.');

-- Sample threat alerts data
INSERT INTO threat_alerts (id, timestamp, user_email, alert_type, description, severity, status) VALUES
('TA_HighRiskLogin_001', '2025-05-30 17:30:00', 'john.doe@example.com', 'High-Risk Login', 'Login from unusual location detected.', 'high', 'unresolved'),
('TA_SuspiciousFileAccess_002', '2025-05-30 17:32:30', 'jane.doe@example.com', 'Suspicious File Access', 'Unusual access to sensitive files detected.', 'medium', 'investigating'),
('TA_MalwareActivity_003', '2025-05-30 17:35:00', 'N/A', 'Malware Activity', 'Malware activity detected on the network.', 'critical', 'active');

-- Create indexes for better performance
CREATE INDEX idx_security_events_timestamp ON security_events(timestamp);
CREATE INDEX idx_security_events_severity ON security_events(severity);
CREATE INDEX idx_user_sessions_risk_score ON user_sessions(risk_score);
CREATE INDEX idx_threat_data_status ON threat_data(status);
CREATE INDEX idx_threat_alerts_severity ON threat_alerts(severity);

-- Analysis Summary for ${userData.name}
-- Company: ${userData.company}
-- Security Concerns: ${userData.securityConcerns.join(', ')}
-- Analysis completed on: ${timestamp}
`;

  return sql;
};

export const downloadSQL = (userData: UserFormData, analysisData: any = {}) => {
  const sql = generateSecurityAnalysisSQL(userData, analysisData);
  const blob = new Blob([sql], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `security_analysis_${userData.email.replace('@', '_')}_${new Date().toISOString().split('T')[0]}.sql`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};
