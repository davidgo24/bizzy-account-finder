// Enhanced AI responses for low-income, beginner-friendly banking education
export const askBizzy = async (question: string, context?: any): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses: Record<string, string> = {
    'bank-vs-cu': `Great question! Let me explain this simply:

🏢 **Banks** are like big stores:
• Large companies trying to make profit
• Many locations and ATMs
• Good technology and apps
• May have higher fees
• Customer service can be rushed

🤝 **Credit Unions** are like community groups:
• Owned by members (people like you!)
• Not trying to make profit - they help members
• Usually lower fees and better rates
• Smaller, more personal service
• Staff takes time to explain things

**For beginners:** Credit unions are usually better because they're more patient, have lower fees, and really want to help you succeed. They won't pressure you and will explain everything clearly.`,
    
    'minimum-deposit': `**Minimum deposit** is the smallest amount of money you need to open an account.

💡 **What this means:** 
• Some accounts need $0 (nothing!) to start
• Others might need $25, $50, or $100
• This money becomes YOUR money in the account
• It's not a fee - you keep it!

🎯 **Look for:** Accounts that need $25 or less to start. Many credit unions and online banks offer $0 minimum accounts.

⚠️ **Avoid:** Accounts needing $500+ unless you have that money sitting around.`,
    
    'monthly-fee': `**Monthly fee** is money the bank charges you each month just for having the account.

💰 **Good news:** Many accounts are FREE! Look for:
• "Free checking accounts"
• "No monthly maintenance fee"
• Accounts that waive fees with direct deposit

📋 **How to avoid fees:**
• Set up direct deposit (paycheck goes straight to account)
• Keep a small minimum balance (like $100)
• Use their ATMs only
• Sign up for online banking

🚨 **Red flags:** Avoid accounts with fees over $10/month unless they offer something really special.`,
    
    'routing-number': `A **routing number** is like your bank's address code.

🏠 **Think of it like this:**
• Your account number = your house number  
• Routing number = your neighborhood/city code
• Together, they help money find YOUR account

📝 **When you need it:**
• Setting up direct deposit for your paycheck
• Paying bills online
• Receiving money from family
• Transferring money between accounts

🔍 **Where to find it:**
• Bottom of checks (first 9 numbers)
• Bank's website
• Ask any bank employee - they're happy to help!`,
    
    'overdraft': `**Overdraft** happens when you try to spend more money than you have.

💳 **Example:** You have $20 in your account but try to buy something for $30.

⚠️ **What banks might do:**
• **Decline the purchase** (good option - no fees!)
• **Pay it anyway** and charge you $25-35 fee (expensive!)
• **Transfer from savings** (small fee, like $10)

🛡️ **How to protect yourself:**
• Check your balance before spending (use app or ATM)
• Ask for "overdraft protection" to be turned OFF
• Link your savings account as backup
• Set up low balance alerts on your phone

💡 **Best choice:** Ask the bank to simply DECLINE purchases when you don't have enough money. No fees, no problems!`,
    
    'debit-card': `A **debit card** is like a plastic key to your money.

💳 **What it does:**
• Lets you buy things without cash
• Takes money directly from YOUR account (not borrowed)
• Works at stores, online, and ATMs
• Much safer than carrying cash

✅ **Benefits:**
• No need to carry lots of cash
• Can't spend more than you have (unlike credit cards)
• Get cash back at grocery stores
• Track all purchases on bank app

🔐 **Safety tips:**
• Never share your PIN with anyone
• Cover your hand when typing PIN
• Check your account weekly for strange charges
• Call bank immediately if card is lost

💰 **Cost:** Most checking accounts include a FREE debit card!`,
    
    'zelle': `**Zelle** is like texting money to people instantly.

📱 **How it works:**
• Send money using just someone's phone number or email
• Money moves in minutes (usually)
• No fees at most banks and credit unions
• Built into many banking apps

👨‍👩‍👧‍👦 **Perfect for:**
• Sending money to family
• Splitting dinner bills with friends
• Paying babysitters or small services
• Emergency money to relatives

⚠️ **Important safety:**
• Only send money to people you know and trust
• Double-check phone numbers/emails
• Money moves fast and can't easily be undone
• Never send money to strangers or "deals" online

🆚 **Vs other options:**
• Faster than checks or bank transfers
• Safer than cash
• No fees (unlike many money transfer apps)`,
    
    'direct-deposit': `**Direct deposit** means your paycheck goes straight into your bank account automatically.

💰 **How it works:**
• Your employer sends your pay directly to your bank
• No paper check to cash or deposit
• Money appears in your account on payday
• Usually happens very early in the morning

✅ **Amazing benefits:**
• **Save money:** No check-cashing fees (can be $5-15 each time!)
• **Save time:** No trips to cash checks or wait in lines
• **Get paid faster:** Often 1-2 days earlier than paper checks
• **No lost checks:** Money goes straight to your account
• **Unlock free banking:** Many banks waive monthly fees with direct deposit

📋 **What you need:**
• Bank's routing number
• Your account number
• A voided check OR deposit slip
• Your employer's payroll form

💡 **Pro tip:** This is the #1 way to get free banking and avoid fees!`,
    
    'what-to-bring': `Here's what you typically need to open a bank account:

📄 **Required documents:**
• **Government ID:** Driver's license, state ID, or passport
• **Social Security card** OR tax documents with your SSN
• **Proof of address:** Utility bill, lease, or bank statement (within 30 days)

💰 **Money for opening:**
• The minimum deposit amount (often $25 or less)
• Bring cash or a check made out to yourself

📱 **Nice to have:**
• Phone number where they can text you
• Email address for online banking
• Employment information (employer name and address)

🕐 **Time needed:**
• Usually 15-30 minutes
• Credit unions might take longer but give better explanations

💡 **Don't worry if you don't have everything!** Bank staff can help you figure out alternatives. They WANT to help you open an account.`,
    
    'fees-to-avoid': `Here are the most common fees and how to avoid them:

💸 **Monthly maintenance fee ($5-15/month):**
• **Avoid by:** Direct deposit, keeping minimum balance, or using online banking

💸 **Overdraft fee ($25-35 per incident):**
• **Avoid by:** Opting out of overdraft "protection," checking balance before spending

💸 **ATM fees ($2-5 per use):**
• **Avoid by:** Using your bank's ATMs only, getting cash back at stores

💸 **Minimum balance fee ($5-25/month):**
• **Avoid by:** Keeping required amount in account (often just $100-300)

💸 **Paper statement fee ($2-5/month):**
• **Avoid by:** Choosing online/email statements (better for environment too!)

🎯 **The secret:** Choose accounts specifically designed to have NO fees - they exist!`,
    
    'default': `I'm here to help you understand banking! Here are some things I can explain:

🏦 **Banking basics:**
• What checking accounts do
• How to avoid fees
• Difference between banks and credit unions

💳 **Account features:**
• Debit cards and how they work
• Direct deposit benefits
• Online banking safety

💰 **Money management:**
• How to check your balance
• Understanding bank statements
• Building emergency savings

📱 **Technology:**
• Banking apps and how to use them
• ATM safety tips
• Online bill paying

**Just ask me about anything!** No question is too basic. I'm here to help you feel confident about banking.`
  };

  // Enhanced keyword matching for better education
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('bank') && (lowerQuestion.includes('credit union') || lowerQuestion.includes('difference'))) {
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
  if (lowerQuestion.includes('debit') && lowerQuestion.includes('card')) {
    return responses['debit-card'];
  }
  if (lowerQuestion.includes('zelle')) {
    return responses['zelle'];
  }
  if (lowerQuestion.includes('direct') && lowerQuestion.includes('deposit')) {
    return responses['direct-deposit'];
  }
  if (lowerQuestion.includes('what') && (lowerQuestion.includes('bring') || lowerQuestion.includes('need') || lowerQuestion.includes('open'))) {
    return responses['what-to-bring'];
  }
  if (lowerQuestion.includes('fee') || lowerQuestion.includes('avoid')) {
    return responses['fees-to-avoid'];
  }
  
  return responses['default'];
};

export const generateSummary = async (profile: any): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    "📋 Bring a government-issued ID (driver's license, state ID, or passport)",
    "🔢 Have your Social Security card or number ready",
    "🏠 Bring proof of address (utility bill, lease, or bank statement from last 30 days)",
    "💰 Prepare your initial deposit amount (often just $25 or less!)",
    "💵 Ask about setting up direct deposit to get FREE banking",
    "📱 Ask them to show you how to use mobile banking and find ATMs",
    "⚠️ Ask them to explain ALL fees and how to avoid them",
    "🚫 Tell them you want overdraft protection TURNED OFF to avoid fees",
    "📞 Get their customer service number and save it in your phone",
    "📝 Ask for a simple explanation of your account terms before signing"
  ];
};