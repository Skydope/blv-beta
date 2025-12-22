import React, { useState, useEffect } from 'react';
import { Camera, Radio, Car } from 'lucide-react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import MapWrapper from './MapWrapper';

// Custom Icons
const createPatrolIcon = (isAlert = false) => {
    const color = isAlert ? '#ef4444' : '#3b82f6';
    const iconMarkup = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            {isAlert && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>}
            <div className={`w-8 h-8 rounded-full border-2 border-gray-900 bg-[${color}] flex items-center justify-center shadow-lg`} style={{ backgroundColor: color }}>
                <Car size={16} className="text-white" />
            </div>
        </div>
    );
    return L.divIcon({ html: iconMarkup, className: 'custom-patrol-icon', iconSize: [32, 32], iconAnchor: [16, 16] });
};

const createCamIcon = () => {
    const iconMarkup = renderToStaticMarkup(
        <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center">
            <Camera size={12} className="text-gray-400" />
        </div>
    );
    return L.divIcon({ html: iconMarkup, className: 'custom-cam-icon', iconSize: [24, 24], iconAnchor: [12, 12] });
}

// Fixed Locations for Cameras
const CAMERAS = [
    { id: "C-01", name: "Plaza Alsina", pos: [-36.2330, -61.1150] },
    { id: "C-02", name: "Parque Las Acollaradas", pos: [-36.2450, -61.1200] },
    { id: "C-03", name: "Acceso Av. Brown", pos: [-36.2200, -61.1000] },
];

export default function SecurityWidget() {
    const [patrols, setPatrols] = useState([
        { id: 'M-101', pos: [-36.2350, -61.1180], status: 'Patrullando', isAlert: false },
        { id: 'M-104', pos: [-36.2420, -61.1210], status: 'En Alerta', isAlert: true },
        { id: 'M-108', pos: [-36.2280, -61.1120], status: 'Patrullando', isAlert: false },
    ]);

    // Simulate Random Walk for Patrols
    useEffect(() => {
        const interval = setInterval(() => {
            setPatrols(prev => prev.map(p => ({
                ...p,
                pos: [
                    p.pos[0] + (Math.random() * 0.001 - 0.0005),
                    p.pos[1] + (Math.random() * 0.001 - 0.0005)
                ]
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Centro de Monitoreo Urbano</h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold flex items-center gap-2 animate-pulse">
                        <Radio size={16} /> ALERTA NIVEL 2
                    </span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Map with Patrols */}
                <div className="lg:col-span-2 glass-panel p-0 rounded-2xl border border-white/5 bg-gray-900 overflow-hidden relative min-h-[450px]">
                    <MapWrapper>
                        {/* Cameras */}
                        {CAMERAS.map(cam => (
                            <Marker key={cam.id} position={cam.pos} icon={createCamIcon()}>
                                <Popup className="bg-gray-900 text-black">CAM: {cam.name}</Popup>
                            </Marker>
                        ))}

                        {/* Patrols */}
                        {patrols.map(p => (
                            <Marker key={p.id} position={p.pos} icon={createPatrolIcon(p.isAlert)}>
                                <Popup className="bg-gray-900 text-black">
                                    <strong>{p.id}</strong><br />{p.status}
                                </Popup>
                            </Marker>
                        ))}
                    </MapWrapper>
                </div>

                {/* Feeds & List */}
                <div className="space-y-6">
                    <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50">
                        <h3 className="font-bold text-white mb-4">Cámaras en Vivo</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {["Acceso Brown", "Av. San Martín", "Terminal", "Centro"].map((cam, i) => (
                                <div key={i} className="aspect-video bg-black rounded-lg relative overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] text-gray-600">LIVE FEED</span>
                                    </div>
                                    <div className="absolute bottom-1 left-1 bg-black/50 px-1 rounded text-[8px] text-white">
                                        {cam}
                                    </div>
                                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50 flex-1">
                        <h3 className="font-bold text-white mb-4">Unidades Activas</h3>
                        <div className="space-y-3">
                            {patrols.map((p, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <Car size={14} className="text-blue-400" />
                                        <span className="text-gray-300">{p.id}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isAlert ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {p.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
