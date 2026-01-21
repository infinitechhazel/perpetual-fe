"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Ambulance,
  LayoutDashboard,
  Newspaper,
  Mail,
  User,
  LogOut,
  Shield,
  FileText,
  Building,
  ScrollText,
  Heart,
  UserCheck,
  ShieldCheck,
  Home,
  HandHelping,
  MapPin,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
<<<<<<< HEAD
} from "lucide-react";
import { authClient } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export default function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

=======
} from "lucide-react"
import { authClient } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (v: boolean) => void }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

  // Dropdown state
  const [expandedSections, setExpandedSections] = React.useState({
    government: false,
    civilRegistry: false,
    health: false,
    publicSafety: false,
<<<<<<< HEAD
    certificateItems: false,
    aboutUs: false,
  });
=======
    aboutUs: false,
  })
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
<<<<<<< HEAD
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
=======
    }))
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

    if (!isCollapsed) {
      setExpandedSections({
        government: false,
        civilRegistry: false,
        health: false,
        publicSafety: false,
<<<<<<< HEAD
        certificateItems: false,
        aboutUs: false,
      });
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoggingOut(true);

    try {
      await authClient.logout();
=======
        aboutUs: false,
      })
    }
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsLoggingOut(true)

    try {
      await authClient.logout()
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

      toast({
        title: "✓ Logged Out Successfully",
        description: "You have been securely logged out.",
        className: "bg-green-50 border-green-200",
        duration: 2000,
<<<<<<< HEAD
      });

      setTimeout(() => router.push("/login"), 500);
    } catch (error) {
      console.error("Logout error:", error);
=======
      })

      setTimeout(() => router.push("/login"), 500)
    } catch (error) {
      console.error("Logout error:", error)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred. Please try again.",
<<<<<<< HEAD
      });

      setIsLoggingOut(false);
    }
  };

  const isActive = (path: string) => {
    if (path === "/dashboard/admin") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(path + "/");
  };


  const isSectionActive = (items: { path: string }[]) =>
    items.some(item => isActive(item.path));
=======
      })

      setIsLoggingOut(false)
    }
  }

  const isActive = (path: string) => {
    if (path === "/dashboard/admin") {
      return pathname === path
    }
    return pathname === path || pathname.startsWith(path + "/")
  }

  const isSectionActive = (items: { path: string }[]) => items.some((item) => isActive(item.path))
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/admin" },
    { icon: Newspaper, label: "News", path: "/dashboard/admin/news" },
    { icon: Newspaper, label: "Announcements", path: "/dashboard/admin/announcements" },
    { icon: Mail, label: "Contact Messages", path: "/dashboard/admin/contact" },
<<<<<<< HEAD
    { icon: FileText, label: "Legitimacy", path: "/dashboard/admin/legitimacy" },
  ];

  // const certificateItems = [
  //   { icon: FileText, label: "Legitimacy", path: "/dashboard/admin/legitimacy" },
  //   { icon: FileText, label: "Certificate Verifications", path: "/dashboard/admin/certification-verifications" },
  // ];

=======
  ];

>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
  const aboutUs = [
    { icon: FileText, label: "Our Comunity", path: "/dashboard/admin/our-community" },
    { icon: FileText, label: "Goals", path: "/dashboard/admin/goals" },
    { icon: FileText, label: "Mission & Vision", path: "/dashboard/admin/mission-and-vision" },
    { icon: FileText, label: "Objectives", path: "/dashboard/admin/objectives" },
  ];

<<<<<<< HEAD


  // const iscertificateItemsActive =
  //   expandedSections.certificateItems || isSectionActive(certificateItems);
=======
  
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

  const isaboutUsActive =
    expandedSections.aboutUs || isSectionActive(aboutUs);

  return (
    <aside className={`hidden lg:block fixed top-0 left-0 h-full overflow-visible bg-gradient-to-b from-yellow-600/90 via-red-800/90 to-red-900/90 text-white shadow-2xl z-50 transition-all duration-300 ${isCollapsed ? "w-[70px]" : "w-[300px]"}`}>
      <button onClick={toggleSidebar} className="absolute top-4 -right-3 bg-white text-slate-800 rounded-full p-1.5 shadow-lg hover:bg-slate-100 transition-colors z-[999]">
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Scrollable Content */}
      <div className={`h-full overflow-y-auto overflow-x-hidden ${isCollapsed ? 'py-8 px-4' : 'py-8 px-8'} flex flex-col min-h-full`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#eda909b0 #992f2f"
        }}
      >
        {/* Logo Section */}
        <div className={`flex items-center gap-2 mb-4 py-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <Shield className="text-slate-800" size={20} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-base">Perpetual Village City</h1>
              <p className="text-xs text-slate-200">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1 flex-1 py-2 border-t border-white/20">
          {navigationItems.map((item, index) => {
<<<<<<< HEAD
            const active = isActive(item.path);
=======
            const active = isActive(item.path)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55

            return (
              <div key={index} className="group">
                {/* MAIN BUTTON */}
                <button
                  onClick={() => router.push(item.path)}
<<<<<<< HEAD
                  className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${isCollapsed ? 'justify-center' : ''} ${active ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"}`}>
=======
                  className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${isCollapsed ? "justify-center" : ""} ${active ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"}`}
                >
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                  <item.icon size={16} />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </button>

                {/* COLLAPSED MODE FLYOUT */}
                {isCollapsed && (
<<<<<<< HEAD
                  <div
                    className=" absolute left-full w-44 -translate-y-1/2 -m-5 px-3 py-2 -ml-2 bg-yellow-600 text-white text-xs font-semibold rounded-md shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[9999]">
=======
                  <div className=" absolute left-full w-44 -translate-y-1/2 -m-5 px-3 py-2 -ml-2 bg-yellow-600 text-white text-xs font-semibold rounded-md shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[9999]">
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}

<<<<<<< HEAD
         

=======
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
          <div className="group">
            {/* MAIN BUTTON */}
            <button
              onClick={() => !isCollapsed && toggleSection("aboutUs")}
<<<<<<< HEAD
              className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left transition-colors text-sm hover:bg-white/10 ${isaboutUsActive ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"} ${isCollapsed ? "justify-center" : ""}`}>
              <div className="flex items-center gap-2 justify-center">
                <FileText size={16} />
                {!isCollapsed && (
                  <span className={`font-semibold text-white/90 text-xs tracking-wide ${isaboutUsActive ? "text-white font-semibold" : "text-white/90"}`}>
=======
              className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left transition-colors text-sm hover:bg-white/10 ${isaboutUsActive ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"} ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="flex items-center gap-2 justify-center">
                <FileText size={16} />
                {!isCollapsed && (
                  <span
                    className={`font-semibold text-white/90 text-xs tracking-wide ${isaboutUsActive ? "text-white font-semibold" : "text-white/90"}`}
                  >
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                    ABOUT US
                  </span>
                )}
              </div>

<<<<<<< HEAD
              {!isCollapsed && (
                expandedSections.aboutUs ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronUp size={16} />
                )
              )}
=======
              {!isCollapsed && (expandedSections.aboutUs ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
            </button>

            {/* NORMAL EXPANDED MODE */}
            {!isCollapsed && expandedSections.aboutUs && (
              <div className="space-y-1 pl-3 m-1">
                {aboutUs.map((item, index) => {
<<<<<<< HEAD
                  const active = isActive(item.path);
=======
                  const active = isActive(item.path)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                  return (
                    <button
                      key={index}
                      onClick={() => router.push(item.path)}
<<<<<<< HEAD
                      className={`w-full flex items-center gap-2 p-3 py-3 rounded-lg text-left transition-colors text-xs ${active ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"
                        }`}
=======
                      className={`w-full flex items-center gap-2 p-3 py-3 rounded-lg text-left transition-colors text-xs ${
                        active ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"
                      }`}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                    >
                      <item.icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
<<<<<<< HEAD
                  );
=======
                  )
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                })}
              </div>
            )}

            {/* COLLAPSED MODE FLYOUT */}
            {isCollapsed && (
              <div className="absolute left-full -translate-y-1/2 -ml-5 py-2 w-56 bg-yellow-600 rounded-lg shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto group-hover:delay-150 transition-all duration-200 ease-out z-[9999]">
                <span className="w-full flex items-center px-4 py-2 font-semibold text-white/90 text-xs tracking-wide border-b border-white/20">
                  ABOUT US
                </span>
                {aboutUs.map((item, index) => {
<<<<<<< HEAD
                  const active = isActive(item.path);
=======
                  const active = isActive(item.path)
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                  return (
                    <button
                      key={index}
                      onClick={() => router.push(item.path)}
<<<<<<< HEAD
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${active ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                        }`}
=======
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                        active ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                      }`}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </button>
<<<<<<< HEAD
                  );
=======
                  )
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                })}
              </div>
            )}
          </div>

<<<<<<< HEAD

          {/* Business Partners Section */}
          <div className="group">
            {/* MAIN BUTTON */}
            <button onClick={() => router.push("/dashboard/admin/business-partners")} className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${isCollapsed ? "justify-center" : ""} ${isActive("/dashboard/admin/business-partners") ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"}`}>
              <User size={16} />
              {!isCollapsed && <span className="text-xs">Business Partners</span>}
            </button>

            {/* COLLAPSED MODE FLYOUT */}
            {isCollapsed && (
              <div
                className=" absolute left-full w-44 -translate-y-1/2  -my-5 -m-2 px-3 py-2 bg-yellow-600 text-white text-xs font-semibold rounded-md shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[9999]">
                Business Partners
              </div>
            )}
          </div>



          {/* Account Section */}
          <div className="group">
            {/* MAIN BUTTON */}
            <button onClick={() => router.push("/dashboard/admin/users")} className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${isCollapsed ? "justify-center" : ""} ${isActive("/dashboard/admin/users") ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"}`}>
=======
          {/* Account Section */}
          <div className="group">
            {/* MAIN BUTTON */}
            <button
              onClick={() => router.push("/dashboard/admin/users")}
              className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${isCollapsed ? "justify-center" : ""} ${isActive("/dashboard/admin/users") ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"}`}
            >
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
              <User size={16} />
              {!isCollapsed && <span className="text-xs">Users</span>}
            </button>

            {/* COLLAPSED MODE FLYOUT */}
            {isCollapsed && (
<<<<<<< HEAD
              <div
                className=" absolute left-full w-44 -translate-y-1/2  -my-5 -m-2 px-3 py-2 bg-yellow-600 text-white text-xs font-semibold rounded-md shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[9999]">
=======
              <div className=" absolute left-full w-44 -translate-y-1/2  -my-5 -m-2 px-3 py-2 bg-yellow-600 text-white text-xs font-semibold rounded-md shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[9999]">
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
                Users
              </div>
            )}
          </div>
<<<<<<< HEAD

          {/* Contact Us Section */}
          <div className="group">
            {/* MAIN BUTTON */}
            <button onClick={() => router.push("/dashboard/admin/office-contact")} className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg text-left transition-colors text-sm ${isCollapsed ? "justify-center" : ""} ${isActive("/dashboard/admin/users") ? "bg-white/20 font-semibold shadow-lg" : "hover:bg-white/10"}`}>
              <User size={16} />
              {!isCollapsed && <span className="text-xs">Office Contact</span>}
            </button>

            {/* COLLAPSED MODE FLYOUT */}
            {isCollapsed && (
              <div
                className=" absolute left-full w-44 -translate-y-1/2  -my-5 -m-2 px-3 py-2 bg-yellow-600 text-white text-xs font-semibold rounded-md shadow-xl opacity-0 translate-x-2 invisible pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[9999]">
                Office
              </div>
            )}
          </div>
=======
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
        </nav>

        {/* Logout Section */}
        <div className="py-6 border-t border-white/20">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
<<<<<<< HEAD
            className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-red-500/20 transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed text-sm ${isCollapsed ? 'justify-center' : ''
              }`}
=======
            className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-red-500/20 transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed text-sm ${
              isCollapsed ? "justify-center" : ""
            }`}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {!isCollapsed && <span className="font-medium">Logging out...</span>}
              </>
            ) : (
              <>
                <LogOut size={16} className="group-hover:text-red-200" />
<<<<<<< HEAD
                {!isCollapsed && (
                  <span className="font-medium group-hover:text-red-200">
                    Logout
                  </span>
                )}
=======
                {!isCollapsed && <span className="font-medium group-hover:text-red-200">Logout</span>}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
<<<<<<< HEAD
  );
}
=======
  )
}
>>>>>>> 561776b9ce8628155506d64a5d7a830f2d0d8d55
