import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "../state";
import {
  LucideIcon,
  BookOpenCheck,
  CaseSensitive,
  Mic,
  AudioLines,
  ClipboardPen,
} from "lucide-react";
import { useEffect } from "react";

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapseed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapseed,
}: SidebarLinksProps) => {
  const pathname = window.location.pathname;

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <a href={href} className="no-underline">
      <div
        className={`cursor-pointer flex items-center ${
          isCollapseed
            ? "justify-center py-4"
            : "justify-start py-4 ml-2 rounded-l-full px-4"
        } 
      hover:text-blue-400 hover:bg-blue-100 text-white gap-3 transition-colors ${
        isActive ? "bg-white text-primary" : ""
      }
      `}
      >
        <Icon className="w-6 h-6 " />
        <span
          className={`${
            isCollapseed ? "hidden" : "block"
          } text-sm font-semibold ${
            isActive && "text-primary"
          } underline-none `}
        >
          {label}
        </span>
      </div>
    </a>
  );
};

const Sidebar = () => {
  const pathname = window.location.pathname;
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  useEffect(() => {
    if (!isSidebarCollapsed) {
      dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }
  }, [pathname]);

  const sidebarClassnames = `flex min-h-screen flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-80 md:w-[240px]"
  } bg-primary   transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassnames}>
      <div
        className={` flex gap-3 pt-8  ${
          isSidebarCollapsed
            ? "px-2 w-full flex-col items-center justify-between "
            : "px-8 w-full justify-between items-start flex-row-reverse"
        }`}
      >
        <button
          className="bg-transparent  bg-red-200   border-none"
          onClick={toggleSidebar}
        >
          <img
            src="icons/chevrons-left.png"
            className="w-4 h-4 object-contain"
          />
        </button>
        <img
          src={`${
            isSidebarCollapsed ? "icons/logoMini.png" : "icons/fullLogo.png"
          }`}
          alt="logo"
          className="h-12 object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <SidebarLinks
          href="/dashboard"
          icon={BookOpenCheck}
          label="მართლმწერი"
          isCollapseed={isSidebarCollapsed}
        />
        <SidebarLinks
          href="/inventory"
          icon={CaseSensitive}
          label="ტექსტის შედარება"
          isCollapseed={isSidebarCollapsed}
        />{" "}
        <SidebarLinks
          href="/products"
          icon={Mic}
          label="ხმა > ტექსტი"
          isCollapseed={isSidebarCollapsed}
        />{" "}
        <SidebarLinks
          href="/users"
          icon={AudioLines}
          label="ტექსტი > ხმა"
          isCollapseed={isSidebarCollapsed}
        />{" "}
        <SidebarLinks
          href="/settings"
          icon={ClipboardPen}
          label="PDF კონვერტაცია"
          isCollapseed={isSidebarCollapsed}
        />
      </div>
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10 `}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>
  );
};

export default Sidebar;
