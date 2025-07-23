import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface UserProfile {
  zipCode: string;
  preferences: string[];
  typePreference: 'bank' | 'credit-union' | null;
  selectedAccount?: {
    bankName: string;
    accountName: string;
    minimumDeposit: string;
    monthlyFee: string;
    features: string[];
    hasDebitCard: boolean;
    hasZelle: boolean;
    hasDirectDeposit: boolean;
    link: string;
    requirements: string;
  };
}

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  zipCode: '',
  preferences: [],
  typePreference: null,
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('smart-start-profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('smart-start-profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    localStorage.removeItem('smart-start-profile');
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}