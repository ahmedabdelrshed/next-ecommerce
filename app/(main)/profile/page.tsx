"use client";


import { Package, DollarSign, Calendar } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useProfile from "@/hooks/useProfile";
import StatCard from "@/components/StatCard";

export default function ProfilePage() {
  const {isLoading,stats,user} = useProfile();
  return (
    <div className="  p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12  bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
          My Profile
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center pt-7">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <>
            <div className="bg-gray-2 border-2 p-6 rounded-lg shadow-lg mb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24 text-6xl text-purple-500">
                  <AvatarFallback className="bg-purple-500 text-gray-100">
                    {user?.formData[0].value.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-2xl font-semibold text-purple-500">
                    {user?.formData[0].value}
                  </h2>

                  <p className="text-gray-500">{user?.identifier}</p>
                </div>
              </div>
            </div>

            <div className="border-2 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-500">
                My Stats
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={<Package className="h-8 w-8 text-purple-500" />}
                  title="Lifetime Orders"
                  value={stats.lifetimeOrders}
                />

                <StatCard
                  icon={<DollarSign className="h-8 w-8 text-purple-500" />}
                  title="Lifetime Spent"
                  value={`$${stats.lifetimeSpent.toFixed(2)}`}
                />

                <StatCard
                  icon={<Calendar className="h-8 w-8 text-purple-500" />}
                  title="This Year"
                  value={`${stats.yearlyOrders} orders`}
                  subvalue={`$${stats.yearlySpent.toFixed(2)} spent`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
