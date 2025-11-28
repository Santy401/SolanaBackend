'use client';

import Link from 'next/link';
import { useSession } from '@/interfaces/hooks/features/auth/use-session';

const setupSteps = [
  {
    id: 'company',
    title: 'Configura tu empresa',
    description: 'Establece la información básica de tu empresa para comenzar.',
    completed: false,
    path: '/dashboard/setup/company',
    priority: 1
  },
  {
    id: 'e-invoicing',
    title: 'Configura la Factura Electrónica',
    description: 'Aprende cómo configurar la factura electrónica para transmitir a la DIAN.',
    completed: false,
    path: '/dashboard/setup/e-invoicing',
    priority: 2
  },
  {
    id: 'first-sale',
    title: 'Crea una venta',
    description: 'Registra una venta para crear tu primera factura en Xubio.',
    completed: false,
    path: '/sales/create',
    priority: 3
  },
  {
    id: 'first-purchase',
    title: 'Crea una compra',
    description: 'Registra gastos y compras para llevar el control completo.',
    completed: false,
    path: '/purchases/create',
    priority: 4
  }
];

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useSession();
  
  const pendingSteps = setupSteps.filter(step => !step.completed);
  const completedSteps = setupSteps.filter(step => step.completed);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">No autenticado</h1>
        <p className="text-gray-600 mt-2">Por favor inicia sesión</p>
        <Link href="/login" className="text-blue-600 hover:underline mt-4 inline-block">
          Ir al login
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ¡Te damos la bienvenida, {user?.name || 'Usuario'}!
        </h1>
        <p className="text-blue-100 text-lg">
          Sigue los próximos pasos para optimizar al máximo tu gestión
        </p>
      </div>

      {pendingSteps.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Configuraciones Pendientes
            </h2>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {pendingSteps.length} pendientes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingSteps.map((step, index) => (
              <div
                key={step.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  {!step.completed && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Pendiente
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6">
                  {step.description}
                </p>

                <Link
                  href={step.path}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Comenzar
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pasos Completados */}
      {completedSteps.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Configuraciones Completadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedSteps.map((step) => (
              <div
                key={step.id}
                className="border border-green-200 rounded-xl p-6 bg-green-50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      ✓
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Completado
                  </span>
                </div>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashboard Principal - Se muestra cuando todo está completo */}
      {pendingSteps.length === 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Resumen General
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ventas del Mes</h3>
              <p className="text-3xl font-bold text-green-600">$0</p>
              <p className="text-gray-500 text-sm">Sin ventas registradas</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compras del Mes</h3>
              <p className="text-3xl font-bold text-blue-600">$0</p>
              <p className="text-gray-500 text-sm">Sin compras registradas</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Productos</h3>
              <p className="text-3xl font-bold text-purple-600">0</p>
              <p className="text-gray-500 text-sm">Sin productos registrados</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clientes</h3>
              <p className="text-3xl font-bold text-orange-600">0</p>
              <p className="text-gray-500 text-sm">Sin clientes registrados</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}