/**
 * Security event logging utility
 * Logs security-related events for monitoring and analysis
 */

interface SecurityEvent {
  timestamp: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  userAgent?: string;
  ip?: string; // Will be client-side IP, limited usefulness
}

class SecurityLogger {
  private events: SecurityEvent[] = [];
  private readonly maxEvents = 100; // Keep last 100 events in memory

  /**
   * Log a security event
   */
  logEvent(
    type: string, 
    severity: 'low' | 'medium' | 'high' | 'critical', 
    details: Record<string, any>
  ): void {
    const event: SecurityEvent = {
      timestamp: Date.now(),
      type,
      severity,
      details,
      userAgent: navigator.userAgent,
    };

    this.events.push(event);

    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SECURITY ${severity.toUpperCase()}]`, type, details);
    }

    // In production, you would send this to your security monitoring service
    // Example: this.sendToSecurityService(event);
  }

  /**
   * Log authentication-related events
   */
  logAuthEvent(action: string, email?: string, success = false, details: Record<string, any> = {}): void {
    this.logEvent('auth', success ? 'low' : 'medium', {
      action,
      email: email ? this.hashEmail(email) : undefined,
      success,
      ...details
    });
  }

  /**
   * Log input validation failures
   */
  logValidationFailure(field: string, value: string, reason: string): void {
    this.logEvent('validation_failure', 'low', {
      field,
      valueLength: value.length,
      reason,
      // Don't log actual values for security
    });
  }

  /**
   * Log rate limiting events
   */
  logRateLimitEvent(identifier: string, action: string, blocked = false): void {
    this.logEvent('rate_limit', blocked ? 'medium' : 'low', {
      identifier: this.hashEmail(identifier),
      action,
      blocked
    });
  }

  /**
   * Log XSS attempt detection
   */
  logXSSAttempt(field: string, suspiciousContent: string): void {
    this.logEvent('xss_attempt', 'high', {
      field,
      contentLength: suspiciousContent.length,
      containsScript: suspiciousContent.toLowerCase().includes('script'),
      containsJavascript: suspiciousContent.toLowerCase().includes('javascript:'),
      // Don't log full content for security
    });
  }

  /**
   * Log suspicious API calls
   */
  logSuspiciousAPICall(endpoint: string, reason: string, details: Record<string, any> = {}): void {
    this.logEvent('suspicious_api', 'medium', {
      endpoint,
      reason,
      ...details
    });
  }

  /**
   * Get recent security events (for admin dashboard)
   */
  getRecentEvents(limit = 50): SecurityEvent[] {
    return this.events.slice(-limit);
  }

  /**
   * Get events by severity
   */
  getEventsBySeverity(severity: SecurityEvent['severity']): SecurityEvent[] {
    return this.events.filter(event => event.severity === severity);
  }

  /**
   * Hash email for privacy while maintaining ability to track patterns
   */
  private hashEmail(email: string): string {
    // Simple hash for client-side use - in production use a proper hashing algorithm
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `user_${Math.abs(hash)}`;
  }

  /**
   * Clear old events (privacy compliance)
   */
  clearOldEvents(daysToKeep = 7): void {
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    this.events = this.events.filter(event => event.timestamp > cutoffTime);
  }
}

// Export singleton instance
export const securityLogger = new SecurityLogger();

// Auto-cleanup old events every hour
if (typeof window !== 'undefined') {
  setInterval(() => {
    securityLogger.clearOldEvents();
  }, 60 * 60 * 1000);
}
