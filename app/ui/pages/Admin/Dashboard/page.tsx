'use client';

import { OptionsTargets } from "@/app/ui/components/Dashboard/OptionsTargets"

export default function Dashboard() {
    return (
        <div className="p-4">
            <h1 className="text-4xl text-white font-bold mb-6">Dashboard</h1>
            <div className="p-3 bg-[#1c1c1c] rounded my-5">
                <span className="text-white">Buenas Noches <span className="font-bold">Santiago Castellar</span></span>
            </div>
            <div className="overflow-auto active:cursor-grabbing mx-auto my-auto">
                <OptionsTargets />
            </div>
        </div>
    )
}