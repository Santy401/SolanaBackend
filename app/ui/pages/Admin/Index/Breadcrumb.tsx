// app/layout/Breadcrumb.tsx (o donde tengas tu layout)
"use client";

import { ChevronRight } from "lucide-react";

const SIDEBAR_ITEMS = [
    { id: "inicio", label: "Inicio" },
    { id: "dashboard", label: "Dashboard" },
    { id: "ventas", label: "Ventas" },
    { id: "ventas-venta", label: "Comprobante De Venta", parentId: "ventas" },
    { id: "ventas-cotizaciones", label: "Cotizaciones", parentId: "ventas" },
    { id: "ventas-remisiones", label: "Remisiones", parentId: "ventas" },
    { id: "ventas-clientes", label: "Clientes", parentId: "ventas" },
    { id: "ventas-productos", label: "Productos De Venta", parentId: "ventas" },
    { id: "vendedores", label: "Vendedores", icon: null },
    { id: "notifications", label: "Notifications" },
    { id: "market", label: "Market" },
    { id: "news", label: "News" },
    { id: "interactive-chart", label: "Interactive Chart" },
    { id: "mutual-funds", label: "Mutual Funds" },
    { id: "portfolio", label: "Portfolio" },
    { id: "support", label: "Support" },
    { id: "settings", label: "Settings" },
];

interface BreadcrumbProps {
    activeItem: string;
}

export default function Breadcrumb({ activeItem }: BreadcrumbProps) {
    const currentItem = SIDEBAR_ITEMS.find(item => item.id === activeItem);

    if (!currentItem || activeItem === 'inicio') {
        return (
            <div className="text-gray-400 flex items-center">
                <span className="text-white font-medium">Simplapp</span>
            </div>
        );
    }

    const parentItem = currentItem.parentId
        ? SIDEBAR_ITEMS.find(item => item.id === currentItem.parentId)
        : null;

    return (
        <div className="text-gray-400 flex items-center">
            <span className="text-white font-medium">Simplapp</span>

            {parentItem && (
                <>
                    <ChevronRight width={16} height={16} className="mx-2 text-gray-500" />
                    <span className="text-gray-400">{parentItem.label}</span>
                </>
            )}

            <ChevronRight width={16} height={16} className="mx-2 text-gray-500" />
            <span className="text-gray-400">{currentItem.label}</span>
        </div>
    );
}