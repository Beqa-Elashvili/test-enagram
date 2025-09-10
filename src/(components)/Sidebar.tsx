import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

import {
  BookOpenCheck,
  CaseSensitive,
  Mic,
  AudioLines,
  ClipboardPen,
  Ellipsis,
  ChevronsLeft,
  ArrowRight,
  ChevronsRight,
} from "lucide-react";

const items = [
  { href: "/1", label: "მართლმწერი", icon: BookOpenCheck },
  { href: "/", label: "ტექსტის შედარება", icon: CaseSensitive },
  {
    href: "/2",
    label: (
      <>
        ხმა <ArrowRight className="inline w-4 h-4 mx-1" /> ტექსტი
      </>
    ),
    icon: Mic,
  },
  {
    href: "/3",
    label: (
      <>
        ტექსტი <ArrowRight className="inline w-4 h-4 mx-1" /> ხმა
      </>
    ),
    icon: AudioLines,
  },
  { href: "/4", label: "PDF კონვერტაცია", icon: ClipboardPen },
];

export default function AppSidebar() {
  const pathname = window.location.pathname;
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-primary text-white min-h-screen shadow-md flex flex-col justify-between"
    >
      <button
        onClick={() => setOpen(!open)}
        className="p-2 flex self-end"
        aria-label="Toggle sidebar"
      >
        {open ? (
          <ChevronsLeft className="text-gray-500 w-4 h-4" />
        ) : (
          <ChevronsRight className="text-gray-500 w-4 h-4" />
        )}
      </button>
      <SidebarContent>
        <div className="flex items-center justify-between px-6">
          <img
            src="/icons/fullLogo.png"
            alt="Full Logo"
            className="h-12 object-contain"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ href, icon: Icon, label }) => {
                const isActive =
                  pathname === href ||
                  (pathname === "/" && href === "/dashboard");

                return (
                  <SidebarMenuItem
                    key={href}
                    className={`hover:bg-blue-400 p-2  font-medium hover:text-blue-600 ${
                      open ? "rounded-l-full" : "rounded-full"
                    } transition-colors ${
                      isActive ? "bg-white text-primary" : "text-white"
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <a
                        href={href}
                        className="flex items-center gap-3 px-1 py-3"
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? "text-primary" : "text-white"
                          }`}
                        />
                        <span className="font-medium">{label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0">
        <div className="border-t border-gray-400 px-2 text-center py-4 hidden md:flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-400 h-8 w-8 flex items-center justify-center font-semibold text-white text-xs">
              თ
            </div>
            {open && (
              <p className="font-medium font-mono text-white">თამარ ონიანი</p>
            )}
          </div>
          {open && <Ellipsis className="text-white w-5 h-5 cursor-pointer" />}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
