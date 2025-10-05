"use client";

import type React from "react";
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

export default function DashboardPage() {
  const { data, loading, error, refetch } = useAnalytics();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-muted-foreground">
        <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Loading analytics...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <AlertCircle className="w-5 h-5 mr-2" /> Error: {error}
      </div>
    );

  if (!data) return null;

  const totalRevenue = (data.successPayments || 0) * 50;

  const conversionRate =
    data.totalPayments > 0
      ? ((data.successPayments / data.totalPayments) * 100).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="w-full space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
              Platform Analytics
            </h1>
            <p className="text-muted-foreground text-lg">
              Track users, payments, and overall platform performance
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-primary-foreground bg-primary hover:opacity-90 transition-opacity font-medium"
            >
              Back to Website
            </Link>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-5 py-2.5 bg-card text-card-foreground rounded-lg hover:bg-muted transition-colors border border-border"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={data.totalUsers}
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-primary/10"
            iconColor="text-primary"
            delay="animation-delay-200"
          />

          <StatCard
            title="Total Bookings"
            value={data.totalPayments}
            icon={<CreditCard className="w-5 h-5" />}
            iconBg="bg-secondary"
            iconColor="text-secondary-foreground"
            delay="animation-delay-400"
          />

          <StatCard
            title="Successful Payments"
            value={data.successPayments}
            icon={<CheckCircle2 className="w-5 h-5" />}
            iconBg="bg-accent/20"
            iconColor="text-accent"
            delay="animation-delay-600"
          />

          <StatCard
            title="Pending Payments"
            value={data.pendingPayments}
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-muted"
            iconColor="text-muted-foreground"
            delay="animation-delay-800"
          />
        </div>

        <div className="bg-card rounded-xl p-8 shadow-sm border border-border hover-lift animate-fade-in-up animation-delay-1000">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary rounded-xl">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-card-foreground">
                Payment Conversion
              </h3>
              <p className="text-muted-foreground">
                Success rate and estimated total revenue
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 items-center justify-between">
            <div className="animate-counter animation-delay-1000">
              <p className="text-6xl font-bold text-foreground">
                {conversionRate}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Success rate from all payments
              </p>
            </div>

            <div className="animate-counter animation-delay-2000">
              <p className="text-4xl font-semibold text-accent">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Estimated Revenue
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  delay,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  delay?: string;
}) => (
  <div
    className={`bg-card rounded-xl p-6 shadow-sm border border-border hover-lift animate-fade-in-up ${
      delay || ""
    }`}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2.5 rounded-lg ${iconBg} ${iconColor}`}>{icon}</div>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
    <div className="text-4xl font-bold text-card-foreground animate-counter">
      {value}
    </div>
  </div>
);
