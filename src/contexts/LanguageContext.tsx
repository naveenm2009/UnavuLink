import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    brand_name: 'UnavuLink',
    tagline: 'Predicting Surplus. Prioritising Need. Delivering Food Safely.',
    hero_headline: 'Every Meal Deserves a Destination.',
    hero_subheading: 'UnavuLink connects surplus food with communities in need through intelligent matching, safety-first handling, verified delivery, and self-recovering rescue operations across Tamil Nadu.',
    donate_food: 'Donate Food',
    find_food: 'Find Food',
    join_ngo: 'Register as NGO',
    become_volunteer: 'Become a Volunteer',
    admin_dashboard: 'Command Centre',
    donor_dashboard: 'Donor Dashboard',
    acceptor_dashboard: 'Acceptor Dashboard',
    ngo_dashboard: 'NGO Dashboard',
    common_people_dashboard: 'Community Home',
    my_tasks: 'My Rescue Tasks',
    community_map: 'Community Map',
    live_impact: 'Live Impact',
    food_passport: 'Food Safety Passport',
    digital_twin: 'Digital Twin Simulation',
    safety_incidents: 'Safety Incidents & Recalls',
    explore_food: 'Explore Food',
    how_it_works: 'How It Works',
    login: 'Sign In',
    register: 'Create Account',
    logout: 'Log Out',
    batch_id: 'Batch ID',
    status: 'Status',
    eligible: 'Safety Eligible',
    under_review: 'Under Review',
    frozen: 'Safety Frozen',
    in_transit: 'In Transit',
    delivered: 'Delivered Safely',
    meals_served: 'Meals Served',
    kg_rescued: 'Food Rescued (kg)',
    co2_saved: 'CO₂ Saved (kg)',
    active_missions: 'Active Missions',
  },
  ta: {
    brand_name: 'உணவுலிங்க் (UnavuLink)',
    tagline: 'உணவு உபரியைக் கணித்தல். தேவையை முன்னிறுத்துதல். பாதுகாப்பாக விநியோகித்தல்.',
    hero_headline: 'ஒவ்வொரு உணவுக்கும் ஒரு இலக்கு உண்டு.',
    hero_subheading: 'உணவுலிங்க் தமிழ்நாடு முழுவதும் உள்ள உபரி உணவை, தேவைப்படும் சமூகங்களுடன் புத்திசாலித்தனமான பொருத்தம், உணவு பாதுகாப்பு சான்றிதழ் மற்றும் விரைவான தொண்டர்கள் மூலம் பாதுகாப்பாக இணைக்கிறது.',
    donate_food: 'உணவு வழங்குக',
    find_food: 'உணவை கண்டறிக',
    join_ngo: 'தொண்டு நிறுவனமாக இணைக',
    become_volunteer: 'தொண்டராகப் பதிவு செய்க',
    admin_dashboard: 'கட்டளை மையம்',
    donor_dashboard: 'நன்கொடையாளர் பலகை',
    acceptor_dashboard: 'பெறுநர் பலகை',
    ngo_dashboard: 'தொண்டு நிறுவன பலகை',
    common_people_dashboard: 'சமூக மையம்',
    my_tasks: 'எனது மீட்புப் பணிகள்',
    community_map: 'சமூக வரைபடம்',
    live_impact: 'நேரலை தாக்கம்',
    food_passport: 'உணவு பாதுகாப்பு பாஸ்போர்ட்',
    digital_twin: 'டிஜிட்டல் இரட்டை மாதிரி',
    safety_incidents: 'பாதுகாப்பு புகார்கள் & எச்சரிக்கைகள்',
    explore_food: 'உணவுகளைப் பார்க்க',
    how_it_works: 'இது எவ்வாறு செயல்படுகிறது',
    login: 'உள்நுழைக',
    register: 'கணக்கு தொடங்குக',
    logout: 'வெளியேறுக',
    batch_id: 'தொகுதி எண்',
    status: 'நிலை',
    eligible: 'பாதுகாப்பானது',
    under_review: 'ஆய்வில் உள்ளது',
    frozen: 'முடக்கப்பட்டது',
    in_transit: 'பயணத்தில் உள்ளது',
    delivered: 'வழங்கப்பட்டது',
    meals_served: 'வழங்கப்பட்ட உணவுகள்',
    kg_rescued: 'மீட்கப்பட்ட உணவு (கிலோ)',
    co2_saved: 'சேமிக்கப்பட்ட CO₂ (கிலோ)',
    active_missions: 'செயலில் உள்ள பணிகள்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('unavulink_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('unavulink_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
