import React from 'react';
import { KPICard } from './KPICard';
import AdoptionChart from './charts/AdoptionChart';
import SatisfactionChart from './charts/SatisfactionChart';
import CallsChart from './charts/CallsChart';
import EfficiencyDisplay from './charts/EfficiencyDisplay';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* General KPIs Row */}
            <div className="grid md:grid-cols-3 gap-6">
                <KPICard title="Adopción Digital" tag="Crecimiento" tagColor="cyan" delay={0.1}>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">75%</div>
                    <p className="text-gray-400 text-sm mb-4">% de trámites digitales</p>
                    <AdoptionChart />
                </KPICard>

                <KPICard title="Satisfacción" tag="Comunidad" tagColor="blue" delay={0.2}>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">4.5/5</div>
                    <p className="text-gray-400 text-sm mb-4">Experiencia ciudadana</p>
                    <SatisfactionChart />
                </KPICard>

                <KPICard title="Eficiencia" tag="Impacto" tagColor="green" delay={0.3}>
                    <EfficiencyDisplay />
                </KPICard>
            </div>

            {/* Citizen Calls Row */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-8 text-center text-blue-400">KPIs de Llamados Ciudadanos</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard title="Reclamos por Tipo" tag="Distribución" tagColor="cyan" className="lg:col-span-2" delay={0.4}>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-1">
                                <div className="text-2xl font-bold text-white mb-2">1,234</div>
                                <p className="text-gray-400 text-sm">Total de reclamos último mes</p>
                            </div>
                            <div className="flex-1 w-full h-[200px]">
                                <CallsChart />
                            </div>
                        </div>
                    </KPICard>

                    <KPICard title="Tiempo Respuesta" tag="Promedio" tagColor="blue" delay={0.5}>
                        <div className="h-full flex flex-col justify-center items-center text-center">
                            <div className="text-5xl font-bold text-blue-400 mb-2">24h</div>
                            <p className="text-gray-400 text-sm">Tiempo promedio resolutivo</p>
                            <div className="mt-4 text-xs text-green-400">▼ 12% vs mes anterior</div>
                        </div>
                    </KPICard>

                    <KPICard title="Tasa Resolución" tag="Efectividad" tagColor="green" delay={0.6}>
                        <div className="h-full flex flex-col justify-center items-center text-center">
                            <div className="relative h-32 w-32 flex items-center justify-center">
                                <svg className="h-full w-full -rotate-90 text-gray-800" viewBox="0 0 36 36">
                                    <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    <path className="text-green-500" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <div className="absolute text-2xl font-bold text-white">92%</div>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">Reclamos cerrados satisfactoriamente</p>
                        </div>
                    </KPICard>
                </div>
            </div>
        </div>
    );
}
