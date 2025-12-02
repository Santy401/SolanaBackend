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

export default function ClientesPage() {
  const columns = [
    {
      key: "name",
      header: "Cliente",
      cell: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold">
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
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-gray-400" />
            <span className="text-gray-600">{customer.phone}</span>
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
          <span className="text-sm text-gray-600 truncate">{customer.address}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      cell: (customer: Customer) => {
        const statusColors = {
          "Activo": "bg-green-100 text-green-800 border-green-200",
          "Inactivo": "bg-red-100 text-red-800 border-red-200",
          "Pendiente": "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
        
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              customer.status === "Activo" ? "bg-green-500" : 
              customer.status === "Inactivo" ? "bg-red-500" : "bg-yellow-500"
            }`} />
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusColors[customer.status]
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
          <span className="text-sm text-gray-700">{customer.registrationDate}</span>
        </div>
      ),
    },
    {
      key: "totalPurchases",
      header: "Compras Totales",
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-green-500" />
          <span className="font-semibold text-gray-900">
            ${customer.totalPurchases.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: "lastPurchase",
      header: "Última Compra",
      cell: (customer: Customer) => (
        <div className="text-sm text-gray-600">{customer.lastPurchase}</div>
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
    // Abrir formulario de nuevo cliente
  };

  const handleExportCustomers = () => {
    console.log("Exportar clientes");
    // Lógica para exportar a CSV/Excel
  };

  const customActions = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="gap-2">
        <UserCheck size={16} />
        Segmentar
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ver Inactivos
      </Button>
    </div>
  );

  return (
    <div>
      <div className="w-300 mx-auto">
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
          actions={customActions}
          className="bg-transparent rounded-xl shadow-lg"
        />

        {/* Estadísticas Adicionales */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Clientes Activos</div>
                <div className="text-2xl font-bold text-gray-900">
                  {customersData.filter(c => c.status === "Activo").length}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Ventas Totales</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${customersData.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Clientes Premium</div>
                <div className="text-2xl font-bold text-gray-900">
                  {customersData.filter(c => c.segment === "Premium").length}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}