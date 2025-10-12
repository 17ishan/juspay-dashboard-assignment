// src/components/Sidebar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PieChart,
  ShoppingBag,
  Folder,
  Book,
  User,
  CreditCard,
  Users,
  FileText,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";


const SIDEBAR_FULL = "w-56"; 
const SIDEBAR_COLLAPSED = "w-20"; // icons only

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false); // overlay on small screens
  const [collapsed, setCollapsed] = useState(false); 
  const [profileOpen, setProfileOpen] = useState(false); // nested user profile
  const sidebarRef = useRef(null);

  // Ensure default theme is light if nothing in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  // Set default collapse state depending on viewport (tablet collapsed)
  useEffect(() => {
    const setInitial = () => {
      const w = window.innerWidth;
      // Tablet range: 768 - 1023 => collapsed by default
      if (w >= 768 && w < 1024) {
        const saved = localStorage.getItem("sidebar-collapsed");
        // default collapsed true on tablet unless explicitly set false
        setCollapsed(saved === "false" ? false : true);
      } else {
        // Expanded on desktop, mobile uses overlay
        setCollapsed(false);
      }
    };

    setInitial();
    const onResize = () => setInitial();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Persist collapse preference for tablet
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
  }, [collapsed]);

  // Close mobile overlay on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close mobile overlay
  useEffect(() => {
    const handler = (e) => {
      if (!mobileOpen) return;
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Data
  const favorites = [{ label: "Overview" }, { label: "Projects" }];

  const dashboards = [
    { key: "default", label: "Default", to: "/", icon: <PieChart size={16} /> , icon1: <ChevronRight style={16}/> },
    { key: "orders", label: "orders", to: "/orders", icon: <ShoppingBag size={16} /> , icon1: <ChevronRight style={16}/> },
    { key: "ecommerce", label: "eCommerce", to: "/ecommerce", icon: <ShoppingBag size={16} /> , icon1: <ChevronRight style={16}/> },
    { key: "projects", label: "Projects", to: "/projects", icon: <Folder size={16} /> ,icon1: <ChevronRight style={16}/>},
    { key: "courses", label: "Online Courses", to: "/courses", icon: <Book size={16} /> ,icon1: <ChevronRight style={16}/>},
  ];

  const pages = [
    {
      label: "User Profile",
      icon: <User size={16} />,
      sub: ["Overview", "Projects", "Campaigns", "Documents", "Followers"],
    },
    { label: "Account", icon: <CreditCard size={16} /> },
    { label: "Corporate", icon: <Users size={16} /> },
    { label: "Blog", icon: <FileText size={16} /> },
    { label: "Social", icon: <MessageSquare size={16} /> },
  ];

  // Nav item rendering using NavLink children as function to detect isActive
  function NavItem({ to, icon1, icon, label, end = false }) {
    return (
      <NavLink to={to} end={end} className="relative block px-2 " title={collapsed ? label : undefined}>
        {({ isActive }) => (
          <div
            className={`relative flex items-center gap-3   ${
              collapsed ? "justify-center" : "justify-start"
            } px-2 py-1 rounded-lg transition-colors duration-200 text-sm  ${
              isActive
                ? "bg-gray-100  text-black "
                : "text-black  hover:bg-gray-50 "
            }`}
          >
            {/* left active vertical pill when active & not collapsed */}

            
            {!collapsed && isActive && (
              <span
                aria-hidden
                className="absolute left-0 -ml-3 w-1 h-4 rounded-full bg-black "
              />
            )}

            <div
              className={`flex items-center justify-center ${
                collapsed ? "w-9 h-9" : "w-6 h-6"
              } text-gray-600 `}
              aria-hidden
            >
                
              
              {icon}
            </div>

            {!collapsed && <div className="flex-1">{label}</div>}
          </div>
        )}
      </NavLink>
    );
  }

  return (
    <>
      {/* Mobile overlay dim */}
      <div
        className={`w-[15%] inset-0 z-40 md:hidden transition-opacity duration-200  ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
      </div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`   top-0 left-0 bottom-0 z-50 transform transition-transform duration-200 ease-out 
          ${collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_FULL}
          bg-white  border-r border-gray-100 
          ${
            // for mobile: hide offscreen unless mobileOpen
            typeof window !== "undefined" && window.innerWidth < 768
              ? mobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
        aria-label="Main sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 p-2 ">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                collapsed ? "mx-auto" : ""
              } bg-gradient-to-br from-sky-400 to-indigo-400`}
              aria-hidden
            >
              <span className="text-white font-semibold">B</span>
            </div>

            {!collapsed && (
              <div className="flex flex-col ">
                <span className="text-sm font-medium text-gray-900 ">ByeWind</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* collapse toggle (visible md+) */}
            <button
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((s) => !s)}
              className="hidden md:inline-flex p-2 rounded-md text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              title={collapsed ? "Expand" : "Collapse"}
            >
              <ChevronRight size={16} className={`transform ${collapsed ? "rotate-180" : ""}`} />
            </button>

            {/* mobile toggle (visible on small screens) */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden inline-flex p-2 rounded-md hover:bg-gray-100  transition"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <nav className="px-2 pb-6 overflow-y-auto  " style={{ maxHeight: "calc(100vh - 88px)" }}>
          {/* Favorites / Recently */}
          <div className={`mb-4 ${collapsed ? "text-center" : ""}`}>
            <div className={`flex items-center justify-between ${collapsed ? "flex-col" : ""}`}>
              <div className={`text-sm ${collapsed ? "hidden" : "text-gray-400"}`}>Favorites</div>
              <div className={`text-xs ${collapsed ? "hidden" : "text-gray-300"}`}>Recently</div>
            </div>

            {!collapsed ? (
              <ul className="mt-3 space-y-2">
                {favorites.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-3 text-sm text-gray-600 "
                  >
                    <span className="w-2 h-2 rounded-full bg-gray-300 " />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-3 mt-3 ">
                <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-600 " />
                <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-600" />
              </div>
            )}
          </div>

          {/* Dashboards header */}
          <div className={`${collapsed ? "sr-only" : "text-sm text-gray-400 uppercase mb-2"}`}>Dashboards</div>

          {/* Dashboards list */}
          <div className="mb-2  ">
            {dashboards.map((d) => (
              <div key={d.key} className="px-1 ">
                <NavItem to={d.to} icon1={d.icon1} icon={d.icon} label={d.label} end={d.key === "default"} />
              </div>
            ))}
          </div>

          {/* Pages */}
          <div className={`${collapsed ? "sr-only" : "text-sm text-gray-400 uppercase mb-2 "}`}>Pages</div>

          <div className="">
            {pages.map((p) => {
              const hasSub = Array.isArray(p.sub);
              if (!hasSub) {
                return (
                  <div key={p.label} className="px-1   ">
                    <NavLink
                      to={`/${p.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 px-3 py-1 rounded-lg transition-colors duration-200 text-sm ${
                          collapsed ? "justify-center" : ""
                        } ${
                          isActive
                            ? "bg-gray-100  text-black "
                            : "text-black hover:bg-gray-50 "
                        }`
                      }
                      title={collapsed ? p.label : undefined}
                    >
                      {/* left active pill */}
                      {({ isActive }) => (
                        <>
                          {!collapsed && isActive && (
                            <span
                              aria-hidden
                              className="absolute left-0 -ml-3 w-1.5 h-8 rounded-full  dark:bg-white"
                            />
                          )}
                          <div className="w-6 h-6 flex items-center justify-center text-black ">
                            {p.icon}
                          </div>
                          {!collapsed && <div className="flex-1">{p.label}</div>}
                        </>
                      )}
                    </NavLink>
                  </div>
                );
              }

              // User Profile with nested items
              return (
                <div key={p.label} className="px-1">
                  <button
                    onClick={() => setProfileOpen((s) => !s)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setProfileOpen((s) => !s);
                      }
                    }}
                    aria-expanded={profileOpen}
                    aria-controls="profile-sublist"
                    className={`w-full flex items-center   px-3 py-1 rounded-lg transition-colors duration-200 text-sm text-black ${
                      collapsed ? "justify-center" : ""
                    } text-black  hover:bg-gray-50 `}
                    title={collapsed ? p.label : undefined}
                  >
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${profileOpen ? "rotate-90" : ""}`}
                    />
                    <div className="w-6 h-6 flex items-center justify- text-gray-600 ">
                      {p.icon}
                    </div>

                    {!collapsed && (
                      <>
                        <div className="flex text-sm font-medium ">{p.label}</div>
                      </>
                    )}
                  </button>

                  {/* Nested list */}
                  <div
                    id="profile-sublist"
                    className={`overflow-hidden transition-[max-height] duration-200  ${
                      profileOpen ? "max-h-48 mt-2" : "max-h-0"
                    }`}
                    aria-hidden={!profileOpen}
                  >
                    <ul className={`pl-2 ${collapsed ? "sr-only" : ""}`}>
                      {p.sub.map((s) => (
                        <li key={s}>
                          <NavLink
                            to={`/profile/${s.toLowerCase().replace(/\s+/g, "-")}`}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-2 py-1 rounded-lg transition-colors duration-200 text-sm ml-6 ${
                                isActive
                                  ? "bg-gray-100 dark:bg-slate-800 text-black "
                                  : "text-black  hover:bg-gray-100 "
                              }`
                            }
                          >
                            
                            <span>{s}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer/copyright */}
        <div className="flex-1" />
        {!collapsed && <div className="px-3 py-4 text-xs text-gray-400">© {new Date().getFullYear()} ByeWind</div>}
      </aside>
    </>
  );
}


