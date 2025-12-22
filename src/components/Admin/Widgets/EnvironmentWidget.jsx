import React from 'react';
import { Cloud, Sun, Wind, Droplets, Thermometer, Leaf } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Gauge = ({ value, label, unit, color }) => (
    <div className="relative flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 rounded-full border-4 border-gray-800 flex items-center justify-center relative">
            <div
                className={`absolute inset-0 rounded-full border-4 ${color} border-t-transparent border-l-transparent transform -rotate-45`}
                style={{ opacity: 0.8 }}
            />
            <div className="text-center">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-xs text-gray-400 block">{unit}</span>
            </div>
        </div>
        <span className="mt-2 text-sm text-gray-300">{label}</span>
    </div>
);

const airQualityData = [
    { time: '08:00', val: 15 },
    { time: '10:00', val: 25 },
    { time: '12:00', val: 45 },
    { time: '14:00', val: 30 },
    { time: '16:00', val: 20 },
    { time: '18:00', val: 35 },
];

export default function EnvironmentWidget() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Leaf className="text-green-400" size={32} />
                    <div>
                        <h2 className="text-2xl font-bold text-white">Monitor Ambiental</h2>
                        <p className="text-gray-400 text-sm">Estación Parque Las Acollaradas</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-white">24°C</p>
                    <p className="text-sm text-gray-400">Soleado</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Real-time Gauges */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50">
                    <h3 className="font-bold text-white mb-6">Sensores en Tiempo Real</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Gauge value="42" label="Calidad Aire (AQI)" unit="Bueno" color="border-green-500" />
                        <Gauge value="7" label="Índice UV" unit="Alto" color="border-yellow-500" />
                        <Gauge value="45%" label="Humedad" unit="HR" color="border-blue-500" />
                        <Gauge value="12" label="Viento" unit="km/h" color="border-cyan-500" />
                    </div>
                </div>

                {/* Charts & Alerts */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50 h-[220px]">
                        <h3 className="font-bold text-white mb-4">Tendencia CO2 / MP2.5</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={airQualityData}>
                                <defs>
                                    <linearGradient id="colorAir" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#6b7280" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="val" stroke="#10b981" fill="url(#colorAir)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-4">
                        <Leaf className="text-green-400 mt-1" size={20} />
                        <div>
                            <h4 className="font-bold text-green-400">Calidad Óptima</h4>
                            <p className="text-sm text-gray-300">
                                Las condiciones actuales son ideales para actividades al aire libre en el parque.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
