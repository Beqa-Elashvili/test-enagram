import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "../state";
import {
  LucideIcon,
  BookOpenCheck,
  CaseSensitive,
  Mic,
  AudioLines,
  ChevronsLeft,
  ChevronsRight,
  ClipboardPen,
  Ellipsis,
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
            : "justify-start py-4 ml-2 rounded-l-full  px-4"
        } 
      hover:text-blue-400 hover:bg-blue-100 text-white gap-3 transition-colors ${
        isActive ? "bg-white text-primary" : ""
      }
      `}
      >
        <Icon className={`w-6 h-6 ${isActive && "text-primary"}  `} />
        <span
          className={`${
            isCollapseed ? "hidden" : "block"
          } text-xs font-semibold ${
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
  } bg-primary   transition-all flex justify-between duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassnames}>
      <div>
        <div
          className={` flex gap-3 pt-8  ${
            isSidebarCollapsed
              ? "px-2 w-full flex-col items-center justify-between "
              : "px-8 w-full justify-between items-start flex-row-reverse"
          }`}
        >
          <button
            className="bg-transparent  bg-red-200 cursor-pointer text-gray-500  border-none"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? (
              <ChevronsRight className="w-4 h-4" />
            ) : (
              <ChevronsLeft className="w-4 h-4" />
            )}
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
            href="/"
            icon={BookOpenCheck}
            label="მართლმწერი"
            isCollapseed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/2"
            icon={CaseSensitive}
            label="ტექსტის შედარება"
            isCollapseed={isSidebarCollapsed}
          />{" "}
          <SidebarLinks
            href="/3"
            icon={Mic}
            label="ხმა > ტექსტი"
            isCollapseed={isSidebarCollapsed}
          />{" "}
          <SidebarLinks
            href="/4"
            icon={AudioLines}
            label="ტექსტი > ხმა"
            isCollapseed={isSidebarCollapsed}
          />
          <SidebarLinks
            href="/5"
            icon={ClipboardPen}
            label="PDF კონვერტაცია"
            isCollapseed={isSidebarCollapsed}
          />
        </div>
      </div>
      <div
        className={`${
          isSidebarCollapsed ? "hidden" : "block"
        }   border-t border-gray-400 `}
      >
        <div className="flex justify-between items-center my-4 mx-2 ">
          <div className=" text-white flex items-center gap-2">
            <div className="rounded-full  h-8 w-8 flex items-center justify-center font-semibold bg-blue-400">
              <p className="text-center text-xs">თ</p>
            </div>
            <p className="font-medium font-mono">თამარ ონიანი</p>
          </div>
          <div>
            <Ellipsis className="text-white h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
