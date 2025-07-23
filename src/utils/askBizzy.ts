// Mock AI responses for MVP - replace with actual OpenAI integration
export const askBizzy = async (question: string, context?: any): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses: Record<string, string> = {
    'bank-vs-cu': `Banks are typically larger institutions with extensive ATM networks and advanced online services. They're great if you travel a lot or need 24/7 support.

Credit unions are member-owned, not-for-profit organizations. They often offer:
• Better interest rates
• Lower fees  
• More personalized service
• Community focus

For most people starting out, I'd recommend a credit union for better rates and service.`,
    
    'minimum-deposit': 'A minimum deposit is the smallest amount you need to open the account. This can range from $0 to $100+ depending on the bank.',
    
    'monthly-fee': 'This is what the bank charges each month to maintain your account. Look for accounts with no monthly fee or easy ways to waive it (like direct deposit).',
    
    'routing-number': 'A routing number is a 9-digit code that identifies your bank. You\'ll need this for direct deposits and online transfers.',
    
    'overdraft': 'Overdraft happens when you spend more money than you have in your account. Some banks charge fees for this, while others offer protection.',
    
    'default': 'I\'d be happy to help! Can you be more specific about what you\'d like to know about checking accounts?'
  };

  // Simple keyword matching for MVP
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('bank') && lowerQuestion.includes('credit union')) {
    return responses['bank-vs-cu'];
  }
  if (lowerQuestion.includes('minimum') && lowerQuestion.includes('deposit')) {
    return responses['minimum-deposit'];
  }
  if (lowerQuestion.includes('monthly') && lowerQuestion.includes('fee')) {
    return responses['monthly-fee'];
  }
  if (lowerQuestion.includes('routing')) {
    return responses['routing-number'];
  }
  if (lowerQuestion.includes('overdraft')) {
    return responses['overdraft'];
  }
  
  return responses['default'];
};

export const generateSummary = async (profile: any): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    "Bring a government-issued ID (driver's license or passport)",
    "Have your Social Security number ready",
    "Bring proof of address (utility bill or bank statement)",
    "Prepare your initial deposit amount",
    "Consider setting up direct deposit to avoid monthly fees",
    "Ask about mobile banking features and ATM locations",
    "Review the fee schedule carefully before signing"
  ];
};