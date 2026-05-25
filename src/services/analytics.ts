/**
 * Simple Analytics Service for tracking User Engagement
 * In May 2026, real-world engagement metrics are superior to raw traffic.
 */
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  const timestamp = new Date().toISOString();
  const payload = {
    event: eventName,
    properties,
    timestamp,
    sessionId: getSessionId(),
  };

  // Log to console for development verification
  console.log(`[Analytics] ${eventName}:`, payload);

  // In a real environment, you'd send this to your event collector
  // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) });
  
  // Persistence for current session stats
  try {
    const stats = JSON.parse(localStorage.getItem('swiftcode_analytics') || '[]');
    stats.push(payload);
    localStorage.setItem('swiftcode_analytics', JSON.stringify(stats.slice(-50))); // Keep last 50
  } catch (e) {
    // Ignore if localStorage is blocked
  }
};

const getSessionId = () => {
  try {
    let sessionId = sessionStorage.getItem('swift_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('swift_session_id', sessionId);
    }
    return sessionId;
  } catch (e) {
    return 'anonymous_session';
  }
};
