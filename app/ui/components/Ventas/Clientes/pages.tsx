"use client";

import { DataTable } from "@/app/ui/components/shared/DataTable";
import { Customer } from "@/domain/entities/customer.entity";
import { customersData } from "@/interfaces/data/customers";
import {
  UserCheck,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Tag
} from "lucide-react";
import { Button } from "@/app/ui/cn/components/ui/button";
import { useEffect, useState } from "react";

interface ClientesProps {
  onSelect?: (view: string) => void;
}

export default function ClientesPage({ onSelect }: ClientesProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const columns = [
    {
      key: "name",
      header: "Cliente",
      cell: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text- font-semibold">
            {customer.name.split(" ")[0][0]}
            {customer.name.split(" ")[1]?.[0] || ""}
          </div>
          <div>
            <div className="font-medium text-white w-[12rem]">{customer.name}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Tag size={12} />
              {customer.segment}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contacto",
      cell: (customer: Customer) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={14} className="text-gray-400" />
            <span className="text-gray-500 hover:text-blue-600 cursor-pointer">
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-gray-400" />
            <span className="text-gray-400">{customer.phone}</span>
          </div>
        </div>
      ),
    },
    {
      key: "address",
      header: "Dirección",
      cell: (customer: Customer) => (
        <div className="flex items-start gap-2 max-w-[200px]">
          <MapPin size={14} className="text-gray-400 mt-1 flex-shrink-0" />
          <span className="text-sm text-gray-500 truncate">{customer.address}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      cell: (customer: Customer) => {
        const statusColors = {
          "Activo": "text-green-800",
          "Inactivo": "text-red-800",
          "Pendiente": "text-yellow-800",
        };

        return (
          <div className={`flex items-center gap-2 p-1 justify-center rounded ${customer.status === "Activo" ? "border-green-500" :
            customer.status === "Inactivo" ? "border-red-500" : "border-yellow-500"
            } border`}>
            <div className={`w-2 h-2 rounded-full ${customer.status === "Activo" ? "bg-green-500" :
              customer.status === "Inactivo" ? "bg-red-500" : "bg-yellow-500"
              }`} />
            <span className={`rounded-full text-xs font-medium ${statusColors[customer.status]
              }`}>
              {customer.status}
            </span>
          </div>
        );
      },
    },
    {
      key: "registrationDate",
      header: "Registro",
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-sm text-gray-300">{customer.registrationDate}</span>
        </div>
      ),
    },
    {
      key: "totalPurchases",
      header: "Compras Totales",
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-green-500" />
          <span className="font-semibold text-gray-300">
            ${customer.totalPurchases.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: "lastPurchase",
      header: "Última Compra",
      cell: (customer: Customer) => (
        <div className="text-sm text-gray-100">{customer.lastPurchase}</div>
      ),
    },
  ];

  // Handlers para las acciones
  const handleEditCustomer = (customer: Customer) => {
    console.log("Editar cliente:", customer);
    // Navegar a página de edición o abrir modal
  };

  const handleDeleteCustomer = (customer: Customer) => {
    console.log("Eliminar cliente:", customer);
    // Mostrar confirmación y eliminar
  };

  const handleViewCustomer = (customer: Customer) => {
    console.log("Ver detalles de cliente:", customer);
    // Abrir modal o página de detalles
  };

  const handleAddCustomer = () => {
    console.log("Agregar nuevo cliente");
    if (onSelect) {
      onSelect('ventas-clientes-create');
    }
  };

  const handleExportCustomers = () => {
    console.log("Exportar clientes");
  };

  useEffect(() => {
    // Verificar localStorage primero
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (storedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Verificar preferencia del sistema
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDark);
      if (systemDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <div>
      <div className="w-270 mx-auto">
        {/* Header Personalizado */}
        <div className="mt-2">
        </div>

        <DataTable
          data={customersData}
          columns={columns}
          title="Lista de Clientes"
          searchable={true}
          pagination={true}
          itemsPerPage={10}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
          onView={handleViewCustomer}
          onAdd={handleAddCustomer}
          onExport={handleExportCustomers}
          className="bg-transparent rounded-xl shadow-lg"
        />

        <div className="mt-2 mb-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="bg- p-6 rounded-xl shadow border border-[#2d2d2d]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Clientes Activos</div>
                <div className="text-2xl font-bold text-gray-200">
                  {customersData.filter(c => c.status === "Activo").length}
                </div>
              </div>
              <div className="p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg- p-6 rounded-xl shadow border border-[#2d2d2d]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Ventas Totales</div>
                <div className="text-2xl font-bold text-gray-200">
                  ${customersData.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg- p-6 rounded-xl shadow border border-[#2d2d2d]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Clientes Premium</div>
                <div className="text-2xl font-bold text-gray-200">
                  {customersData.filter(c => c.segment === "Premium").length}
                </div>
              </div>
              <div className="p-3 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}