import React from "react";
import Sidebar from "./(components)/Sidebar";
import StoreProvider from "./redux";
import Header from "./(components)/Header";
import { SidebarProvider } from "./components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={` bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <SidebarProvider>
        <Sidebar />
        <main className="w-full h-full">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
export default DashboardWrapper;
