import React from "react";
import Sidebar from "./(components)/Sidebar";
import StoreProvider from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={` flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <Sidebar />
      <main className="flex  w-full h-full  ">{children}</main>
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
