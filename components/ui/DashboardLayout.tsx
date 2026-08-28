"use client";
import React from "react";
import { OperatorSidebar } from "@/components/OperatorSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <OperatorSidebar />
      <div style={{ marginLeft: 220, padding: 20, width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
