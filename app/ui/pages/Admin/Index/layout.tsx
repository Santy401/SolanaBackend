'use client';

import type { Metadata } from "next";
import "@/app/globals.css";
import Sidebar from "@/app/ui/components/Navbar/Sidebar";
import { useState } from "react";
import Dashboard from "../Dashboard/page";
import React from "react";
import Breadcrumb from "./Breadcrumb"; 
import Clientes from "@/app/ui/components/Ventas/Clientes/pages"
// import { Navbar } from "@/app/ui/components/Dashboard/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentView, setCurrentView] = useState('dashboard')

  const renderContent = () => {
    switch (currentView) {
      case 'inicio':
        return <div className="text-white">Eres el mejor brother :D!</div>
      case 'dashboard':
        return <Dashboard />
      case 'ventas-venta':
        return <div className="text-white p-8">Comprobante De Venta</div>
      case 'ventas-cotizaciones':
        return <div className="text-white p-8">Cotizaciones</div>
      case 'ventas-remisiones':
        return <div className="text-white p-8">Remisiones</div>
      case 'ventas-clientes':
        return <Clientes />
      case 'ventas-productos':
        return <div className="text-white p-8">Productos De Venta</div>
      case 'vendedores':
        return <div>Vendedores</div>
      case 'venta':
        return <h1>Hola</h1>
      case 'dashboard':
        return <div className="text-white">GOOOOD JOOB!</div>
      case 'dashboard':
        return <div className="text-white">GOOOOD JOOB!</div>
    }
  }
  return (
    <html lang="en">
      <body>
        <Sidebar onSelect={setCurrentView} />
        <div className="w-full ml-7 mt-7">
          {children}
          <Breadcrumb activeItem={currentView} />
          {renderContent()}
        </div>
      </body>
    </html>
  );
}
