import React, { useState } from 'react';
import { ContentCopy, CardGiftcard, Star, People, CheckCircle, Pending, Cancel } from '@mui/icons-material';
import CustomButton from '../../components/Button';

const Referral = () => {
  const [copied, setCopied] = useState(false);

  const referralLink = "https://yourapp.com/ref/your-unique-code";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralTiers = [
    {
      id: 1,
      referrals: 1,
      reward: "1 Free Month",
      icon: <CardGiftcard className="text-blue-600" />,
      description: "Get started with your first referral"
    },
    {
      id: 2,
      referrals: 5,
      reward: "3 Free Months",
      icon: <Star className="text-yellow-600" />,
      description: "Unlock premium benefits"
    },
    {
      id: 3,
      referrals: 10,
      reward: "6 Free Months + Bonus",
      icon: <People className="text-green-600" />,
      description: "Advanced rewards package"
    },
    {
      id: 4,
      referrals: 25,
      reward: "1 Year Free + Premium",
      icon: <CardGiftcard className="text-purple-600" />,
      description: "Ultimate referral achievement"
    }
  ];

  const referrals = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joinDate: "1/15/2024",
      status: "Completed"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "1/20/2024",
      status: "Pending"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      joinDate: "1/25/2024",
      status: "Completed"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      joinDate: "1/30/2024",
      status: "Declined"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="text-green-600 w-4 h-4" />;
      case 'Pending':
        return <Pending className="text-yellow-600 w-4 h-4" />;
      case 'Declined':
        return <Cancel className="text-red-600 w-4 h-4" />;
      default:
        return <Pending className="text-gray-600 w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Referral
          </h1>
          <p className="text-gray-600 text-lg">
            Your Network Just Became More Valuable
          </p>
        </div>

        {/* My Referral Link and Successful Referrals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* My Referral Link */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              My Referral Link
            </h2>
            <p className="text-gray-600 mb-4">
              Share This Link To Earn Rewards
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
              <CustomButton
                onClick={handleCopyLink}
                color={copied ? "#10b981" : "#2563eb"}
                textColor="#ffffff"
                className="px-4 py-3 rounded-lg font-medium flex items-center gap-2"
              >
                <ContentCopy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </CustomButton>
            </div>
          </div>

          {/* Successful Referrals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Successful Referrals
            </h2>
            <p className="text-gray-600 mb-4">
              People Who Joined Through Your Link
            </p>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <p className="text-gray-600">2 completed, 1 pending</p>
            </div>
          </div>
        </div>

        {/* Your Current Tier */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your Current Tier
          </h2>
          <p className="text-gray-600 mb-6">
            Track Your Progress And Unlock Rewards
          </p>
      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Current Reward</h3>
                <div className="text-2xl font-bold text-green-600">1 Free Month</div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>3/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">2 More Referrals To Unlock 3 Free Months</p>
              </div>
            </div>
            
            <div className="text-right">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Next Tier</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">3 Free Months</div>
              <p className="text-gray-600">5 Referrals Needed</p>
            </div>
          </div>
        </div>

        {/* Referral Tiers */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Referral Tiers
          </h2>
          <p className="text-gray-600 mb-6">
            All Available Rewards And Their Requirements
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {referralTiers.map((tier) => (
              <div key={tier.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {tier.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{tier.referrals} Referral{tier.referrals > 1 ? 's' : ''}</div>
                <div className="text-lg font-semibold text-blue-600 mb-2">{tier.reward}</div>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Referrals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Referrals
            </h2>
            <p className="text-gray-600">
              Track The Status Of People You've Referred
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {referral.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(referral.status)}
                        <span className="text-sm text-gray-900">{referral.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral; 