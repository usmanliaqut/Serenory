"use client";
import React from "react";
import {
  Users,
  CreditCard,
  Clock,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import Link from "next/link";

const AnalyticsDashboard: React.FC = () => {
  const { data, loading, error, refetch } = useAnalytics();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Loading analytics...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" /> Error: {error}
      </div>
    );

  if (!data) return null;

  const totalRevenue = (data.successPayments || 0) * 50; // Example: assume each payment is $50

  const conversionRate =
    data.totalPayments > 0
      ? ((data.successPayments / data.totalPayments) * 100).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Platform Analytics
            </h1>
            <p className="text-gray-600">
              Track users, payments, and overall platform performance
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-90"
            >
              Back to Website
            </Link>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={data.totalUsers}
            icon={<Users className="w-5 h-5 text-blue-600" />}
            color="bg-blue-100"
          />

          <StatCard
            title="Total Bookings"
            value={data.totalPayments}
            icon={<CreditCard className="w-5 h-5 text-gray-700" />}
            color="bg-gray-100"
          />

          <StatCard
            title="Successful Payments"
            value={data.successPayments}
            icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
            color="bg-green-100"
          />

          <StatCard
            title="Pending Payments"
            value={data.pendingPayments}
            icon={<Clock className="w-5 h-5 text-amber-600" />}
            color="bg-amber-100"
          />
        </div>

        {/* Conversion and Revenue */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Payment Conversion
              </h3>
              <p className="text-gray-600">
                Success rate and estimated total revenue
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-gray-900">
                {conversionRate}%
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Success rate from all payments
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-emerald-600">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Estimated Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      <span className="text-sm font-medium text-gray-600">{title}</span>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
  </div>
);

export default AnalyticsDashboard;
