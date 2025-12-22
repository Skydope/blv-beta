import React from 'react';
import { Activity, Heart, Clock, Users, Ambulance } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const occupancyData = [
    { name: 'Lun', val: 65 },
    { name: 'Mar', val: 72 },
    { name: 'Mie', val: 68 },
    { name: 'Jue', val: 85 },
    { name: 'Vie', val: 75 },
    { name: 'Sab', val: 90 },
    { name: 'Dom', val: 88 },
];

export default function HealthWidget() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Hospital Miguel Capredoni</h2>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold animate-pulse">
                    OPERATIVO NORMAL
                </span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Ocupación de Camas", val: "78%", icon: Activity, color: "text-blue-400" },
                    { label: "Tiempo Espera Guardia", val: "14 min", icon: Clock, color: "text-yellow-400" },
                    { label: "Ambulancias Activas", val: "3/5", icon: Ambulance, color: "text-red-400" },
                    { label: "Turnos Hoy", val: "245", icon: Users, color: "text-purple-400" },
                ].map((stat, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50 flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                            <p className="text-xl font-bold text-white">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Stats */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50">
                    <h3 className="text-lg font-bold text-white mb-4">Ocupación Semanal</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={occupancyData}>
                                <defs>
                                    <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                                    cursor={{ stroke: '#ffffff20' }}
                                />
                                <Area type="monotone" dataKey="val" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorOcc)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50">
                    <h3 className="text-lg font-bold text-white mb-4">Estado de Unidades Sanitarias</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Villa Diamante", status: "Abierto", load: "Baja", staff: "Dr. Perez" },
                            { name: "Latino", status: "Abierto", load: "Media", staff: "Dra. Gomez" },
                            { name: "Pompilio Luciani", status: "Cerrado", load: "-", staff: "-" },
                            { name: "Jardin Maternal", status: "Abierto", load: "Alta", staff: "Lic. Diaz" },
                        ].map((unit, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                                <div>
                                    <p className="font-medium text-white">{unit.name}</p>
                                    <p className="text-xs text-gray-400">{unit.staff}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-1 rounded-full ${unit.status === 'Abierto' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                                        {unit.status}
                                    </span>
                                    {unit.status === 'Abierto' && (
                                        <p className="text-xs text-gray-500 mt-1">Carga: {unit.load}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
