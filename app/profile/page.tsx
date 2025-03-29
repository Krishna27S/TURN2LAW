"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, MapPin, Building, ArrowLeft } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  username: string;
  joinedDate: string;
  location: string;
  organization: string;
  avatar: string;
  bio: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Krishna S",
    email: "krishna.s@example.com",
    username: "Krishna27S",
    joinedDate: "2025-03-29",
    location: "India",
    organization: "TURN2LAW",
    avatar: `https://github.com/Krishna27S.png`,
    bio: "Full-stack developer passionate about creating legal tech solutions.",
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center text-teal-400 hover:text-teal-300 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-teal-400">Profile</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 border-b border-gray-700">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-gray-400">@{profile.username}</p>
                <p className="mt-2 text-gray-300">{profile.bio}</p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-teal-400 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Building className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{profile.organization}</span>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-teal-400 mb-4">
                  Account Information
                </h3>
                <div className="space-y-3">
                  
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Joined {profile.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="p-6 sm:p-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">
              Recent Activity
            </h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300">
                No recent activity to display.
              </p>
            </div>
          </div>

          {/* Settings Button */}
          <div className="p-6 sm:p-8 border-t border-gray-700">
            <button
              onClick={() => router.push('/settings')}
              className="w-full sm:w-auto px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}