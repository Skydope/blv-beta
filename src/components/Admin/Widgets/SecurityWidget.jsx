import React from 'react';
import { Camera, MapPin, ShieldAlert, Radio } from 'lucide-react';

export default function SecurityWidget() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Centro de Monitoreo Urbano</h2>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Live Feeds Simulation */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Acceso Av. Brown", "Plaza Alsina", "Centro Cívico", "Av. San Martín"
                        ].map((cam, idx) => (
                            <div key={idx} className="relative group overflow-hidden rounded-xl border border-white/10 bg-black aspect-video">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                    <span className="text-gray-700 text-xs">NO SIGNAL (DEMO)</span>
                                    {/* In a real app, this would be an img or video stream */}
                                </div>
                                {/* Simulated UI Overlay */}
                                <div className="absolute top-2 left-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-xs font-mono text-white bg-black/50 px-1 rounded">LIVE</span>
                                </div>
                                <div className="absolute bottom-2 left-2 text-xs text-white font-mono bg-black/50 px-2 py-1 rounded">
                                    CAM-{idx + 101}: {cam}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incident Feed */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Alertas Recientes</h3>
                        <Radio className="text-red-400 animate-pulse" size={20} />
                    </div>

                    <div className="space-y-4">
                        {[
                            { loc: "Villa Diamante", type: "Botón Antipánico", time: "Hace 2 min" },
                            { loc: "Parque Las Acollaradas", type: "Movimiento inusual", time: "Hace 15 min" },
                            { loc: "Barrio Cooperativa", type: "Corte de luz", time: "Hace 42 min" },
                        ].map((alert, i) => (
                            <div key={i} className="p-3 rounded-xl bg-gray-800/50 border border-white/5">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-red-400">{alert.type}</span>
                                    <span className="text-xs text-gray-500">{alert.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <MapPin size={14} className="text-gray-500" />
                                    {alert.loc}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20 hover:bg-red-500/20 transition-colors">
                        Ver Mapa Completo
                    </button>
                </div>
            </div>
        </div>
    );
}
