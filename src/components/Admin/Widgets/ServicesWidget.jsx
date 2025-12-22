import React, { useState, useEffect } from 'react';
import { Truck, Battery, AlertCircle, CheckCircle } from 'lucide-react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import MapWrapper from './MapWrapper';

// Custom Truck Icon Creator
const createTruckIcon = (color = '#10b981') => {
    const iconMarkup = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            <div className={`w-8 h-8 rounded-full border-2 border-gray-900 bg-[${color}] flex items-center justify-center shadow-lg`} style={{ backgroundColor: color }}>
                <Truck size={16} className="text-gray-900" />
            </div>
        </div>
    );

    return L.divIcon({
        html: iconMarkup,
        className: 'custom-truck-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
};

const TRUCK_ROUTES = [
    {
        id: "R-01",
        start: [-36.2333, -61.1167],
        end: [-36.2400, -61.1200],
        color: '#10b981', // Green
        info: { area: "Centro", status: "Operativo", bat: "85%" }
    },
    {
        id: "R-02",
        start: [-36.2250, -61.1100],
        end: [-36.2300, -61.1000],
        color: '#10b981',
        info: { area: "Barrio Jardín", status: "Operativo", bat: "62%" }
    },
    {
        id: "R-03",
        start: [-36.2450, -61.1300],
        end: [-36.2450, -61.1300], // Stationary
        color: '#facc15', // Yellow
        info: { area: "Zona Industrial", status: "En Taller", bat: "-" }
    }
];

export default function ServicesWidget() {
    const [trucks, setTrucks] = useState(TRUCK_ROUTES.map(r => ({ ...r, current: r.start, progress: 0 })));

    // Simulate GPS Movement
    useEffect(() => {
        const interval = setInterval(() => {
            setTrucks(prev => prev.map(t => {
                if (t.info.status === "En Taller") return t; // Don't move stopped trucks

                let newProgress = t.progress + 0.05; // 5% per tick
                if (newProgress > 1) newProgress = 0; // Loop

                // Linear interpolation between start and end
                const lat = t.start[0] + (t.end[0] - t.start[0]) * newProgress;
                const lng = t.start[1] + (t.end[1] - t.start[1]) * newProgress;

                return { ...t, current: [lat, lng], progress: newProgress };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Gestión de Residuos Urbanos</h2>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center gap-2">
                    <Truck size={16} /> OPERATIVO
                </span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Live Map Panel */}
                <div className="lg:col-span-2 glass-panel p-0 rounded-2xl border border-white/5 bg-gray-900 overflow-hidden relative min-h-[450px]">
                    <MapWrapper>
                        {trucks.map((truck) => (
                            <Marker
                                key={truck.id}
                                position={truck.current}
                                icon={createTruckIcon(truck.color)}
                            >
                                <Popup className="bg-gray-900 text-black">
                                    <strong>{truck.id}</strong><br />
                                    {truck.info.area}
                                </Popup>
                            </Marker>
                        ))}
                    </MapWrapper>
                </div>

                {/* Fleet Status (Existing Logic) */}
                <div className="space-y-4">
                    <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50">
                        <h4 className="text-gray-400 text-sm mb-4">Estado de Unidades</h4>
                        <div className="space-y-3">
                            {trucks.map((t, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <Truck size={18} style={{ color: t.color }} />
                                        <div>
                                            <p className="text-sm font-bold text-white">{t.id}</p>
                                            <p className="text-xs text-gray-500">{t.info.area}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs`} style={{ color: t.color }}>{t.info.status}</span>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 justify-end mt-1">
                                            <Battery size={10} /> {t.info.bat}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 opacity-50">
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-gray-500" />
                                    <div>
                                        <p className="text-sm font-bold text-white">R-04</p>
                                        <p className="text-xs text-gray-500">Villa Diamante</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-gray-500">Finalizado</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 justify-end mt-1">
                                        <Battery size={10} /> 12%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50">
                        <h4 className="text-gray-400 text-sm mb-2">Eficiencia de Recolección</h4>
                        <div className="flex items-end gap-2 h-24 mt-4">
                            {[40, 65, 55, 80, 75, 90, 85].map((h, i) => (
                                <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm relative group">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-1000"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-2">Últimos 7 días</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
