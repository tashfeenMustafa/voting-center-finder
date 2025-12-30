'use client';

import { useState, useMemo, useEffect } from 'react';
import constituenciesData from './constituencies.json';

type Constituency = {
  id: number;
  no_en: string;
  no_bn: string;
  district_en: string;
  district_bn: string;
  composition_en: string;
  composition_bn: string;
  thana: string[];
  thana_bn: string[];
  wards: string[];
  unions: string[];
  unions_bn: string[];
  pauroshava: string[];
  pauroshava_bn: string[];
  search_tags: string[];
};

const constituencies = constituenciesData as Constituency[];

const VOTER_HUB_CONTENT = {
  en: {
    searchTips: {
      title: "Search Tips",
      splitUpazilas: "Note: Some Upazilas (like Savar or Rani Sankail) are split between multiple seats. If you don't see your area here, try searching by your Union name.",
      newUpazilas: "Note: Boundaries for newly formed Upazilas (like Dasar or Eidgaon) are based on the latest 2025 Delimitation rules."
    },
    dictionary: {
      title: "Election Dictionary",
      items: [
        {
          term: "Upazila vs. Thana",
          description: "In rural areas, administrative units are called Upazilas. In metropolitan cities like Dhaka or Chattogram, they are called Thanas. Your constituency is often determined by the Thana (Police Station) your address belongs to."
        },
        {
          term: "What is a Ward?",
          description: "A Ward is the smallest urban unit. In City Corporations, your Ward Number is the key to finding your specific polling center (usually a nearby school or community center)."
        },
        {
          term: "Constituency (Asan)",
          description: "This is your parliamentary 'Seat' (e.g., Dhaka-10). Voters in each constituency elect one Member of Parliament (MP) to represent them in the Jatiya Sangsad."
        }
      ]
    },
    findingCenter: {
      title: "Find Your Polling Center",
      appTitle: "Smart Election Management BD",
      description: "The official app by the Bangladesh Election Commission helps you find your polling center, voter serial number, and candidate details.",
      features: [
        "Find your Voter Serial Number",
        "Locate your assigned Polling Center",
        "View Candidate profiles and party data",
        "Real-time election updates"
      ],
      linkText: "Download on Google Play",
      appLink: "https://play.google.com/store/apps/details?id=com.atcl.bd.electioncommission"
    },
    prep: {
      title: "Voter Prep Checklist",
      items: [
        "Voting Hours: 8:00 AM to 5:00 PM (ensure you are in line before 5:00 PM).",
        "Bring your NID card or at least have your NID number ready.",
        "Use the Smart Election BD app to note your 'Serial Number' for faster voting.",
        "Mobile phones and cameras are strictly prohibited inside the voting booth.",
        "Ensure your finger is marked with indelible ink after casting your vote."
      ]
    },
    sources: {
      title: "Official Sources",
      description: "Data is gathered from the Bangladesh Election Commission's official 'Delimitation of Constituencies' Gazette published on December 11, 2025.",
      gazetteLinkText: "View Official Gazette (PDF)",
      gazetteUrl: "https://www.ecs.gov.bd/files/2ceFJGlIGLiCkOUslJTIzMqgJcz5QyjOjzD8hUgr.pdf"
    },
    disclaimer: {
      title: "Disclaimer",
      text: "This is an independent educational tool and NOT an official government website. While we use official 2025 Gazette data, always verify your information through the 'Smart Election Management BD' app or official EC channels."
    }
  },
  bn: {
    searchTips: {
      title: "অনুসন্ধান টিপস",
      splitUpazilas: "দ্রষ্টব্য: কিছু উপজেলা (যেমন সাভার বা রানীশংকৈল) একাধিক আসনের মধ্যে বিভক্ত। আপনি যদি এখানে আপনার এলাকা খুঁজে না পান, তবে আপনার ইউনিয়নের নাম লিখে সার্চ করার চেষ্টা করুন।",
      newUpazilas: "দ্রষ্টব্য: নতুন গঠিত উপজেলাগুলোর (যেমন ডাসার বা ঈদগাঁও) সীমানা সর্বশেষ ২০২৫ সালের সীমানা নির্ধারণ গেজেটের নিয়মের ওপর ভিত্তি করে তৈরি।"
    },
    dictionary: {
      title: "নির্বাচন অভিধান",
      items: [
        {
          term: "উপজেলা বনাম থানা",
          description: "পল্লি এলাকায় প্রশাসনিক ইউনিটকে উপজেলা বলা হয়। ঢাকা বা চট্টগ্রামের মতো মহানগরীতে এগুলোকে থানা বলা হয়। আপনার ঠিকানা কোন থানার অধীনে তা আপনার নির্বাচনী আসন নির্ধারণে গুরুত্বপূর্ণ।"
        },
        {
          term: "ওয়ার্ড কী?",
          description: "ওয়ার্ড হলো সবচেয়ে ছোট নগর ইউনিট। সিটি কর্পোরেশন এলাকায় আপনার ভোটকেন্দ্র (স্কুল বা কমিউনিটি সেন্টার) খুঁজে পেতে ওয়ার্ড নম্বরটি সবচেয়ে বেশি প্রয়োজন হয়।"
        },
        {
          term: "নির্বাচনী এলাকা (আসন)",
          description: "এটি আপনার সংসদীয় আসন (যেমন: ঢাকা-১০)। জাতীয় সংসদে আপনার প্রতিনিধিত্ব করার জন্য প্রতিটি আসন থেকে একজন সংসদ সদস্য (MP) নির্বাচিত হন।"
        }
      ]
    },
    findingCenter: {
      title: "ভোটকেন্দ্র ও তথ্য খুঁজে নিন",
      appTitle: "স্মার্ট ইলেকশন ম্যানেজমেন্ট বিডি",
      description: "বাংলাদেশ নির্বাচন কমিশনের এই অফিসিয়াল অ্যাপটি আপনাকে ভোটকেন্দ্র, ভোটার তালিকা নম্বর এবং প্রার্থীদের তথ্য খুঁজে পেতে সাহায্য করবে।",
      features: [
        "আপনার ভোটার তালিকা নম্বর (Serial Number) খুঁজুন",
        "নির্ধারিত ভোটকেন্দ্রের অবস্থান জানুন",
        "প্রার্থী ও রাজনৈতিক দলের তথ্য দেখুন",
        "নির্বাচনের রিয়েল-টাইম আপডেট পান"
      ],
      linkText: "গুগল প্লে থেকে ডাউনলোড করুন",
      appLink: "https://play.google.com/store/apps/details?id=com.atcl.bd.electioncommission"
    },
    prep: {
      title: "ভোটের দিনের প্রস্তুতি",
      items: [
        "ভোটগ্রহণের সময়: সকাল ৮:০০ থেকে বিকেল ৫:০০ পর্যন্ত (৫টার মধ্যে লাইনে দাঁড়ানো নিশ্চিত করুন)।",
        "এনআইডি (NID) কার্ড সাথে রাখুন অথবা এনআইডি নম্বরটি মুখস্থ রাখুন।",
        "দ্রুত ভোট দিতে স্মার্ট ইলেকশন অ্যাপ থেকে আপনার 'সিরিয়াল নম্বর' সংগ্রহ করুন।",
        "ভোটকেন্দ্রের ভেতরে মোবাইল ফোন বা ক্যামেরা নেওয়া সম্পূর্ণ নিষিদ্ধ।",
        "ভোট দেওয়ার পর আঙুলে অমোচনীয় কালির চিহ্ন দিতে ভুলবেন না।"
      ]
    },
    sources: {
      title: "তথ্যের উৎস",
      description: "সকল নির্বাচনী এলাকার সীমানা ১১ ডিসেম্বর, ২০২৫ তারিখে প্রকাশিত বাংলাদেশ নির্বাচন কমিশনের 'নির্বাচনী এলাকার সীমানা নির্ধারণ' গেজেটের উপর ভিত্তি করে তৈরি।",
      gazetteLinkText: "অফিসিয়াল গেজেট দেখুন (PDF)",
      gazetteUrl: "https://www.ecs.gov.bd/files/2ceFJGlIGLiCkOUslJTIzMqgJcz5QyjOjzD8hUgr.pdf"
    },
    disclaimer: {
      title: "সতর্কবার্তা",
      text: "এটি একটি স্বাধীন শিক্ষামূলক টুল এবং কোনো সরকারি ওয়েবসাইট নয়। আমরা ২০২৫ সালের গেজেট অনুযায়ী তথ্য দিয়েছি, তবে চূড়ান্তভাবে তথ্য নিশ্চিত করতে 'স্মার্ট ইলেকশন ম্যানেজমেন্ট বিডি' অ্যাপ বা অফিসিয়াল ইসি চ্যানেল ব্যবহার করুন।"
    }
  }
};

const translations = {
  en: {
    title: 'Bangladesh Election Constituency Finder',
    heroTitle: 'Find your Constituency & Voting Center',
    heroDescription: 'Search through all 300 parliamentary constituencies by district, thana, union, ward, or any related term.',
    heroDisclaimer: '⚠️ This is NOT an official government website or affiliated with the Election Commission. This is for informational purposes only. Always verify information with Election Commission channels.',
    searchPlaceholder: 'Search by District, Thana, Union, Ward, or any keyword...',
    seatNumber: 'Seat Number',
    district: 'District',
    area: 'Area',
    thana: 'Thana',
    wards: 'Wards',
    pauroshava: 'Pauroshava',
    unions: 'Unions',
    tags: 'Search Tags',
    votingCenter: 'Your Voting Center(s)',
    noResults: 'No constituencies found matching your search.',
    faq: 'Frequently Asked Questions',
    faq1: 'What is a Thana?',
    faq1Answer: 'A Thana (also called Upazila) is an administrative division in Bangladesh, typically covering a sub-district area with multiple unions.',
    faq2: 'What is a Ward?',
    faq2Answer: 'A Ward is the smallest administrative unit in urban areas (Pauroshava/Municipality), representing a specific neighborhood or area within a city or town.',
    disclaimer: 'Disclaimer',
    disclaimerText: 'This is not an official government website. The information provided is for reference purposes only.',
    sources: 'Sources',
    sourcesText: 'Data sourced from the 2025 Gazette Delimitation Boundary document published by the Election Commission of Bangladesh.',
    toggleLanguage: 'বাংলা',
    loadMore: 'Load More Constituencies',
    github: 'GitHub',
  },
  bn: {
    title: 'বাংলাদেশ নির্বাচনী এলাকা খুঁজুন',
    heroTitle: 'আপনার নির্বাচনী এলাকা ও ভোট কেন্দ্র খুঁজুন',
    heroDescription: 'জেলা, থানা, ইউনিয়ন, ওয়ার্ড বা যেকোনো সম্পর্কিত শব্দ দিয়ে ৩০০টি সংসদীয় নির্বাচনী এলাকা খুঁজুন।',
    heroDisclaimer: '⚠️ এটি কোনো সরকারি ওয়েবসাইট নয় বা নির্বাচন কমিশনের সাথে সম্পর্কিত নয়। এটি শুধুমাত্র তথ্যগত উদ্দেশ্যে। সর্বদা নির্বাচন কমিশনের চ্যানেলের মাধ্যমে তথ্য যাচাই করুন।',
    searchPlaceholder: 'জেলা, থানা, ইউনিয়ন, ওয়ার্ড বা যেকোনো শব্দ দিয়ে খুঁজুন...',
    seatNumber: 'আসন নম্বর',
    district: 'জেলা',
    area: 'এলাকা',
    thana: 'থানা',
    wards: 'ওয়ার্ড',
    pauroshava: 'পৌরসভা',
    unions: 'ইউনিয়ন',
    tags: 'অনুসন্ধান ট্যাগ',
    votingCenter: 'আপনার ভোট কেন্দ্র(সমূহ)',
    noResults: 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নির্বাচনী এলাকা পাওয়া যায়নি।',
    faq: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
    faq1: 'থানা কী?',
    faq1Answer: 'থানা (উপজেলা নামেও পরিচিত) বাংলাদেশের একটি প্রশাসনিক বিভাগ, যা সাধারণত একাধিক ইউনিয়ন নিয়ে গঠিত একটি উপজেলা এলাকা কভার করে।',
    faq2: 'ওয়ার্ড কী?',
    faq2Answer: 'ওয়ার্ড হল শহরাঞ্চলে (পৌরসভা/পৌর কর্পোরেশন) সবচেয়ে ছোট প্রশাসনিক ইউনিট, যা একটি শহর বা শহরের মধ্যে একটি নির্দিষ্ট এলাকা বা পাড়া উপস্থাপন করে।',
    disclaimer: 'দায়বদ্ধতা অস্বীকার',
    disclaimerText: 'এটি কোনো সরকারি ওয়েবসাইট নয়। প্রদত্ত তথ্য শুধুমাত্র রেফারেন্সের উদ্দেশ্যে।',
    sources: 'উৎস',
    sourcesText: 'তথ্য বাংলাদেশ নির্বাচন কমিশন কর্তৃক প্রকাশিত ২০২৫ সালের গেজেট সীমানা নির্ধারণ দলিল থেকে সংগ্রহ করা হয়েছে।',
    toggleLanguage: 'English',
    loadMore: 'আরও নির্বাচনী এলাকা দেখুন',
    github: 'GitHub',
  },
};


// Helper function to highlight matching text
const highlightText = (text: string, query: string, isDark: boolean): React.ReactElement => {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const normalizedQuery = query.toLowerCase().trim().replace(/[,\-]/g, ' ').replace(/\s+/g, ' ');
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);
  
  let highlightedText = text;
  const parts: Array<{ text: string; highlight: boolean }> = [];
  let lastIndex = 0;
  
  // Create a regex pattern that matches any of the query terms
  const pattern = new RegExp(
    queryTerms.map(term => {
      // Escape special regex characters
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Also match with hyphens/spaces
      return `(${escaped}|${escaped.replace(/\s/g, '-')}|${escaped.replace(/-/g, ' ')})`;
    }).join('|'),
    'gi'
  );

  let match;
  while ((match = pattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, match.index), highlight: false });
    }
    // Add highlighted match
    parts.push({ text: match[0], highlight: true });
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), highlight: false });
  }

  if (parts.length === 0) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, idx) => 
        part.highlight ? (
          <mark
            key={idx}
            className={`${isDark ? 'bg-yellow-500/30 text-yellow-200' : 'bg-yellow-200 text-yellow-900'} px-0.5 rounded`}
          >
            {part.text}
          </mark>
        ) : (
          <span key={idx}>{part.text}</span>
        )
      )}
    </>
  );
};

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardsToShow, setCardsToShow] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = translations[language];

  const filteredConstituencies = useMemo(() => {
    if (!searchQuery.trim()) {
      return constituencies;
    }

    // Normalize the query: handle spaces/hyphens and convert to lowercase
    const normalizedQuery = searchQuery
      .toLowerCase()
      .trim()
      .replace(/[,\-]/g, ' ') // Replace commas and hyphens with spaces
      .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
    
    // Split query into individual terms
    const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);
    
    return constituencies.filter((constituency) => {
      // Build comprehensive searchable text from all fields
      const searchableFields = [
        // Normalize seat numbers: "Dhaka-1" and "Dhaka 1" should both match
        constituency.no_en.replace(/-/g, ' '),
        constituency.no_bn.replace(/-/g, ' '),
        constituency.no_en, // Also keep original with hyphen
        constituency.no_bn, // Also keep original with hyphen
        constituency.district_en,
        constituency.district_bn,
        constituency.composition_en,
        constituency.composition_bn,
        // Thana names (English and Bangla)
        ...constituency.thana,
        ...(constituency.thana_bn || []),
        // Union names (English and Bangla)
        ...constituency.unions,
        ...(constituency.unions_bn || []),
        // Wards with "ward" prefix for natural search like "ward 9"
        ...constituency.wards.map((w) => `ward ${w}`),
        ...constituency.wards.map((w) => w), // Also without prefix
        // Pauroshava names (English and Bangla)
        ...constituency.pauroshava,
        ...(constituency.pauroshava_bn || []),
        // Search tags
        ...constituency.search_tags,
      ].map(field => field.toLowerCase());

      // Create a single searchable string
      const searchableText = searchableFields.join(' ');

      // For multi-word queries, check if all terms match (anywhere in the text)
      // This allows queries like "ward 9 dhaka" or "dhaka ward 9" to match
      const allTermsMatch = queryTerms.every(term => {
        // Check if term matches directly
        if (searchableText.includes(term)) {
          return true;
        }
        
        // Also check normalized versions (with/without hyphens)
        const termWithHyphen = term.replace(/\s/g, '-');
        const termWithSpace = term.replace(/-/g, ' ');
        
        return searchableText.includes(termWithHyphen) || 
               searchableText.includes(termWithSpace);
      });

      return allTermsMatch;
    });
  }, [searchQuery]);

  // Reset cards to show when search changes
  useEffect(() => {
    setCardsToShow(10);
  }, [searchQuery]);

  // Show all results when searching, paginated when not searching
  const isSearching = searchQuery.trim().length > 0;
  const displayedConstituencies = isSearching 
    ? filteredConstituencies 
    : filteredConstituencies.slice(0, cardsToShow);
  const hasMore = !isSearching && filteredConstituencies.length > cardsToShow;

  const handleLoadMore = () => {
    setCardsToShow(prev => prev + 10);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      {/* Navigation Bar */}
      <div className={`${isDarkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200/80'} backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vote Koi Dibo?
            </h1>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/tashfeenMustafa/voting-center-finder"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} transition-all duration-200`}
                aria-label="GitHub Repository"
                title={language === 'en' ? 'View on GitHub' : 'GitHub এ দেখুন'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.027 2.747-1.027.546 1.377.202 2.394.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} transition-all duration-200`}
                aria-label="Toggle dark mode"
              >
                <span className="material-icons text-xl">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {t.toggleLanguage}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-center animate-fade-in">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-center text-blue-50 max-w-3xl mx-auto leading-relaxed mb-4">
            {t.heroDescription}
          </p>
          <div className={`mt-6 p-4 rounded-lg border-2 max-w-4xl mx-auto ${isDarkMode ? 'bg-yellow-900/30 border-yellow-500/50' : 'bg-yellow-50/95 border-yellow-400/80'} backdrop-blur-sm`}>
            <p className={`text-sm md:text-base text-center font-medium leading-relaxed ${isDarkMode ? 'text-yellow-100' : 'text-yellow-900'}`}>
              {t.heroDisclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className={`sticky top-[65px] z-40 ${isDarkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200/80'} backdrop-blur-sm border-b shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="relative">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              <span className="material-icons text-xl">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full pl-12 pr-12 py-4 text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-slate-300 ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400' 
                  : 'bg-white border-slate-200 text-slate-700 placeholder:text-slate-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'} transition-colors duration-150`}
              >
                <span className="material-icons text-xl">close</span>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className={`mt-3 text-sm animate-fade-in ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{filteredConstituencies.length}</span>{' '}
              {language === 'en' ? 'constituencies found' : 'নির্বাচনী এলাকা পাওয়া গেছে'}
            </p>
          )}
        </div>
      </div>

      {/* Constituencies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredConstituencies.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className={`inline-block p-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} rounded-full mb-4`}>
              <span className={`material-icons text-5xl ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>sentiment_dissatisfied</span>
            </div>
            <p className={`text-xl font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t.noResults}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedConstituencies.map((constituency, index) => {
                return (
              <div
                key={constituency.id}
                className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200/80'} rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border p-6 group hover:-translate-y-1 animate-fade-in-up`}
                style={{ animationDelay: `${Math.min(index * 20, 300)}ms` }}
              >
                <div className="mb-4">
                  <div className="inline-block px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-sm">
                    {highlightText(language === 'en' ? constituency.no_en : constituency.no_bn, searchQuery, isDarkMode)}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.district}
                    </span>
                    <p className={`text-base font-semibold mt-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {highlightText(
                        language === 'en' ? constituency.district_en : constituency.district_bn,
                        searchQuery,
                        isDarkMode
                      )}
                    </p>
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.area}
                    </span>
                    <p className={`text-sm mt-1 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {highlightText(
                        language === 'en' ? constituency.composition_en : constituency.composition_bn,
                        searchQuery,
                        isDarkMode
                      )}
                    </p>
                  </div>
                  
                  {/* Voting Center Section */}
                  <div className={`mt-4 pt-4 border-t-2 rounded-lg p-4 ${
                    isDarkMode 
                      ? 'border-blue-700 bg-gradient-to-br from-blue-900/30 to-purple-900/30' 
                      : 'border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50'
                  }`}>
                    <h3 className={`text-sm font-bold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      {t.votingCenter}
                    </h3>
                    <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>TBD</p>
                    <div className="space-y-2">
                      {constituency.thana.length > 0 && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                            {t.thana}
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {constituency.thana.map((thana, idx) => {
                              const displayName = language === 'bn' && constituency.thana_bn[idx]
                                ? constituency.thana_bn[idx]
                                : thana;
                              return (
                                <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                                  isDarkMode 
                                    ? 'bg-teal-900/50 text-teal-300 border-teal-700' 
                                    : 'bg-teal-100 text-teal-700 border-teal-300'
                                }`}>
                                  {highlightText(displayName, searchQuery, isDarkMode)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {constituency.wards.length > 0 && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                            {t.wards}
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {constituency.wards.map((ward, idx) => (
                              <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                                isDarkMode 
                                  ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700' 
                                  : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                              }`}>
                                {highlightText(`${t.wards} ${ward}`, searchQuery, isDarkMode)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {constituency.pauroshava.length > 0 && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-pink-400' : 'text-pink-700'}`}>
                            {t.pauroshava}
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {constituency.pauroshava.map((pauro, idx) => {
                              const displayName = language === 'bn' && constituency.pauroshava_bn[idx]
                                ? constituency.pauroshava_bn[idx]
                                : pauro;
                              return (
                                <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                                  isDarkMode 
                                    ? 'bg-pink-900/50 text-pink-300 border-pink-700' 
                                    : 'bg-pink-100 text-pink-700 border-pink-300'
                                }`}>
                                  {highlightText(displayName, searchQuery, isDarkMode)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {constituency.unions.length > 0 && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                            {t.unions} ({constituency.unions.length})
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {constituency.unions.map((union, idx) => {
                              const displayName = language === 'bn' && constituency.unions_bn[idx]
                                ? constituency.unions_bn[idx]
                                : union;
                              return (
                                <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                                  isDarkMode 
                                    ? 'bg-orange-900/50 text-orange-300 border-orange-700' 
                                    : 'bg-orange-100 text-orange-700 border-orange-300'
                                }`}>
                                  {highlightText(displayName, searchQuery, isDarkMode)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {constituency.search_tags.length > 0 && (
                    <div className={`pt-2 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t.tags}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {constituency.search_tags.map((tag, idx) => (
                          <span key={idx} className={`px-2 py-0.5 text-xs rounded border ${
                            isDarkMode 
                              ? 'bg-slate-700 text-slate-300 border-slate-600' 
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {highlightText(tag, searchQuery, isDarkMode)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              );
              })}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {t.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Voter Hub Content Section */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-b from-slate-50 to-white border-slate-200'} border-t mt-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Search Tips Card */}
            <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200/80'} rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 border`}>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {VOTER_HUB_CONTENT[language].searchTips.title}
              </h2>
              <div className="space-y-3">
                <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {VOTER_HUB_CONTENT[language].searchTips.splitUpazilas}
                </p>
                <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {VOTER_HUB_CONTENT[language].searchTips.newUpazilas}
                </p>
              </div>
            </div>

            {/* Voter Prep Checklist Card */}
            <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200/80'} rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 border`}>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {VOTER_HUB_CONTENT[language].prep.title}
              </h2>
              <ul className="space-y-3">
                {VOTER_HUB_CONTENT[language].prep.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Election Dictionary Card */}
          <div className={`mb-12 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200/80'} rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {VOTER_HUB_CONTENT[language].dictionary.title}
            </h2>
            <div className="space-y-5">
              {VOTER_HUB_CONTENT[language].dictionary.items.map((item, idx) => (
                <div key={idx} className={`pb-5 border-b last:border-0 last:pb-0 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                  <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    {item.term}
                  </h3>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Find Your Polling Center Card */}
          <div className={`mb-12 rounded-xl p-7 shadow-sm border ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' 
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/80'
          }`}>
            <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {VOTER_HUB_CONTENT[language].findingCenter.title}
            </h2>
            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              {VOTER_HUB_CONTENT[language].findingCenter.appTitle}
            </h3>
            <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {VOTER_HUB_CONTENT[language].findingCenter.description}
            </p>
            <ul className="space-y-2 mb-6">
              {VOTER_HUB_CONTENT[language].findingCenter.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`material-icons text-xl flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>check</span>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={VOTER_HUB_CONTENT[language].findingCenter.appLink}
            target="_blank"
            rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="material-icons text-xl">android</span>
              {VOTER_HUB_CONTENT[language].findingCenter.linkText}
            </a>
          </div>

          {/* Official Sources Card */}
          <div className={`mb-12 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200/80'} rounded-xl p-7 shadow-sm border`}>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {VOTER_HUB_CONTENT[language].sources.title}
            </h2>
            <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {VOTER_HUB_CONTENT[language].sources.description}
            </p>
            <a
              href={VOTER_HUB_CONTENT[language].sources.gazetteUrl}
            target="_blank"
            rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 font-semibold ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              <span className="material-icons text-xl">open_in_new</span>
              {VOTER_HUB_CONTENT[language].sources.gazetteLinkText}
            </a>
          </div>

          {/* Disclaimer */}
          <div className={`${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50/80 border-blue-600'} border-l-4 p-7 rounded-xl shadow-sm`}>
            <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              {VOTER_HUB_CONTENT[language].disclaimer.title}
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              {VOTER_HUB_CONTENT[language].disclaimer.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
