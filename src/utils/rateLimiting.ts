/**
 * Simple client-side rate limiting utility for authentication attempts
 * Note: This is basic protection - real rate limiting should be implemented server-side
 */

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  private readonly blockDurationMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000, blockDurationMs = 30 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs; // 15 minutes default
    this.blockDurationMs = blockDurationMs; // 30 minutes default
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (e.g., email, IP)
   * @returns Object with isBlocked status and remaining time if blocked
   */
  isRateLimited(identifier: string): { isBlocked: boolean; remainingTime?: number } {
    const now = Date.now();
    const entry = this.storage.get(identifier);

    if (!entry) {
      return { isBlocked: false };
    }

    // Check if currently blocked
    if (entry.blockedUntil && entry.blockedUntil > now) {
      return {
        isBlocked: true,
        remainingTime: Math.ceil((entry.blockedUntil - now) / 1000)
      };
    }

    // Reset if window has passed
    if (now - entry.lastAttempt > this.windowMs) {
      this.storage.delete(identifier);
      return { isBlocked: false };
    }

    return { isBlocked: false };
  }

  /**
   * Record a failed attempt
   * @param identifier - Unique identifier
   * @returns Object with block status and remaining time if now blocked
   */
  recordFailedAttempt(identifier: string): { isNowBlocked: boolean; remainingTime?: number } {
    const now = Date.now();
    const entry = this.storage.get(identifier) || { attempts: 0, lastAttempt: now };

    // Reset if window has passed
    if (now - entry.lastAttempt > this.windowMs) {
      entry.attempts = 0;
    }

    entry.attempts += 1;
    entry.lastAttempt = now;

    // Block if max attempts reached
    if (entry.attempts >= this.maxAttempts) {
      entry.blockedUntil = now + this.blockDurationMs;
      this.storage.set(identifier, entry);
      
      return {
        isNowBlocked: true,
        remainingTime: Math.ceil(this.blockDurationMs / 1000)
      };
    }

    this.storage.set(identifier, entry);
    return { isNowBlocked: false };
  }

  /**
   * Record a successful attempt (clears the rate limit)
   * @param identifier - Unique identifier
   */
  recordSuccessfulAttempt(identifier: string): void {
    this.storage.delete(identifier);
  }

  /**
   * Get remaining attempts before rate limit
   * @param identifier - Unique identifier
   * @returns Number of remaining attempts
   */
  getRemainingAttempts(identifier: string): number {
    const entry = this.storage.get(identifier);
    if (!entry) return this.maxAttempts;

    const now = Date.now();
    if (now - entry.lastAttempt > this.windowMs) {
      return this.maxAttempts;
    }

    return Math.max(0, this.maxAttempts - entry.attempts);
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (entry.blockedUntil && entry.blockedUntil < now) {
        this.storage.delete(key);
      } else if (now - entry.lastAttempt > this.windowMs) {
        this.storage.delete(key);
      }
    }
  }
}

// Export a singleton instance for authentication rate limiting
export const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000, 30 * 60 * 1000);

// Clean up expired entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    authRateLimiter.cleanup();
  }, 5 * 60 * 1000);
}