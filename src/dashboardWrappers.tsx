import React from "react";
import Sidebar from "./(components)/Sidebar";
import StoreProvider from "./redux";
import Header from "./(components)/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={` flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <Sidebar />
      <main className="w-full h-full">
        <Header />
        {children}
      </main>
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
