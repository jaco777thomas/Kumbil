"use client";

import React, { useState } from "react";
import { siteSettings } from "@/lib/mock-data";

type SettingsTab = "general" | "profile" | "appearance" | "notifications";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    siteName: siteSettings.siteName,
    tagline: siteSettings.tagline,
    phone: siteSettings.phone,
    email: siteSettings.email,
    address: siteSettings.address,
  });

  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@kumbil.in",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [appearance, setAppearance] = useState({
    primaryColor: "#2E6F40",
    accentColor: "#F28F03",
    darkMode: false,
    compactSidebar: false,
  });

  const [notifications, setNotifications] = useState({
    orderEmail: true,
    orderPush: true,
    lowStock: true,
    newsletter: false,
    marketing: false,
    security: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs: { key: SettingsTab; label: string; icon: React.ReactElement }[] = [
    {
      key: "general",
      label: "General",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      key: "appearance",
      label: "Appearance",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your store configuration and preferences
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm flex items-center gap-2 animate-fade-scale">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Settings saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-kumbil-primary shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        {/* ─── General ──────────────────────────────── */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Store Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Store Name
                </label>
                <input
                  value={general.siteName}
                  onChange={(e) =>
                    setGeneral({ ...general, siteName: e.target.value })
                  }
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Tagline
                </label>
                <input
                  value={general.tagline}
                  onChange={(e) =>
                    setGeneral({ ...general, tagline: e.target.value })
                  }
                  className="input-premium"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone
                </label>
                <input
                  value={general.phone}
                  onChange={(e) =>
                    setGeneral({ ...general, phone: e.target.value })
                  }
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  value={general.email}
                  onChange={(e) =>
                    setGeneral({ ...general, email: e.target.value })
                  }
                  className="input-premium"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Address
              </label>
              <textarea
                rows={3}
                value={general.address}
                onChange={(e) =>
                  setGeneral({ ...general, address: e.target.value })
                }
                className="input-premium resize-none"
              />
            </div>
          </div>
        )}

        {/* ─── Profile ─────────────────────────────── */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Admin Profile
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-kumbil-primary to-kumbil-primary-light flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-kumbil-primary/20">
                A
              </div>
              <div>
                <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                  Change Avatar
                </button>
                <p className="text-xs text-slate-400 mt-1">
                  JPG, PNG, or SVG. Max 2MB
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Display Name
                </label>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="input-premium"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-700 mb-4">
                Change Password
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        currentPassword: e.target.value,
                      })
                    }
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) =>
                      setProfile({ ...profile, newPassword: e.target.value })
                    }
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="input-premium"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Appearance ──────────────────────────── */}
        {activeTab === "appearance" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Visual Preferences
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={appearance.primaryColor}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer"
                  />
                  <input
                    value={appearance.primaryColor}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        primaryColor: e.target.value,
                      })
                    }
                    className="input-premium flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={appearance.accentColor}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        accentColor: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer"
                  />
                  <input
                    value={appearance.accentColor}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        accentColor: e.target.value,
                      })
                    }
                    className="input-premium flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: "darkMode" as const,
                  label: "Dark Mode",
                  desc: "Enable dark theme for the admin panel",
                },
                {
                  key: "compactSidebar" as const,
                  label: "Compact Sidebar",
                  desc: "Use icons only in the sidebar",
                },
              ].map((toggle) => (
                <label
                  key={toggle.key}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      {toggle.label}
                    </div>
                    <div className="text-xs text-slate-400">{toggle.desc}</div>
                  </div>
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      appearance[toggle.key]
                        ? "bg-kumbil-primary"
                        : "bg-slate-200"
                    }`}
                    onClick={() =>
                      setAppearance({
                        ...appearance,
                        [toggle.key]: !appearance[toggle.key],
                      })
                    }
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        appearance[toggle.key] ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ─── Notifications ──────────────────────── */}
        {activeTab === "notifications" && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Notification Preferences
            </h2>

            <div className="space-y-1">
              {[
                {
                  key: "orderEmail" as const,
                  label: "Order Email Alerts",
                  desc: "Get email notifications for new orders",
                },
                {
                  key: "orderPush" as const,
                  label: "Order Push Notifications",
                  desc: "Get browser push notifications for new orders",
                },
                {
                  key: "lowStock" as const,
                  label: "Low Stock Alerts",
                  desc: "Get notified when a product is running low on stock",
                },
                {
                  key: "newsletter" as const,
                  label: "Newsletter Subscribers",
                  desc: "Get notified about new newsletter subscribers",
                },
                {
                  key: "marketing" as const,
                  label: "Marketing Updates",
                  desc: "Receive Kumbil platform updates and tips",
                },
                {
                  key: "security" as const,
                  label: "Security Alerts",
                  desc: "Get notified about suspicious login attempts",
                },
              ].map((notif) => (
                <label
                  key={notif.key}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      {notif.label}
                    </div>
                    <div className="text-xs text-slate-400">{notif.desc}</div>
                  </div>
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notifications[notif.key]
                        ? "bg-kumbil-primary"
                        : "bg-slate-200"
                    }`}
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [notif.key]: !notifications[notif.key],
                      })
                    }
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        notifications[notif.key] ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-semibold shadow-lg shadow-kumbil-primary/20 hover:shadow-xl transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
