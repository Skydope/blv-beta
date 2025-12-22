import React from 'react';
import { Users, Activity, AlertTriangle, CloudRain, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const cardData = [
    { title: "Población Activa", value: "37,281", change: "+2.4%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Calidad Aire (AQI)", value: "42", change: "Bueno", icon: CloudRain, color: "text-green-400", bg: "bg-green-500/10" },
    { title: "Alertas Activas", value: "3", change: "-2 vs ayer", icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "Eficiencia Energetica", value: "94%", change: "+1.2%", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const chartData = [
    { name: '00:00', load: 30 },
    { name: '04:00', load: 20 },
    { name: '08:00', load: 65 },
    { name: '12:00', load: 85 },
    { name: '16:00', load: 75 },
    { name: '20:00', load: 55 },
    { name: '23:59', load: 40 },
];

export default function Overview() {
    return (
        <div className="space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 bg-gray-900/50">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${card.bg}`}>
                                    <Icon className={card.color} size={20} />
                                </div>
                                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                    {card.change}
                                </span>
                            </div>
                            <h3 className="text-gray-400 text-sm">{card.title}</h3>
                            <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Main Charts Area */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-blue-400" />
                        Tráfico de Red Municipal (LoRaWAN)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                                    itemStyle={{ color: '#60a5fa' }}
                                />
                                <Area type="monotone" dataKey="load" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLoad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50">
                    <h3 className="text-lg font-bold text-white mb-4">Actividad Reciente</h3>
                    <div className="space-y-4">
                        {[
                            { time: "10:42", text: "Alerta de tráfico en Av. San Martín", type: "warning" },
                            { time: "10:15", text: "Nuevo reporte: Luminaria rota", type: "info" },
                            { time: "09:30", text: "Unidad Sanitaria 5 operativa", type: "success" },
                            { time: "09:00", text: "Recolección completada: Zona Norte", type: "success" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-start p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <span className="text-xs text-gray-500 whitespace-nowrap mt-0.5">{item.time}</span>
                                <div>
                                    <p className="text-sm text-gray-300">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
