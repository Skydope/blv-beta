import React from 'react';
import { MessageSquare, ThumbsUp, AlertTriangle, Lightbulb, UserCheck, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const INTERESTS_DATA = [
    { name: 'Alumbrado', val: 85, color: '#facc15' },
    { name: 'Seguridad', val: 72, color: '#3b82f6' },
    { name: 'Limpieza', val: 65, color: '#10b981' },
    { name: 'Cultura', val: 45, color: '#8b5cf6' },
    { name: 'Tránsito', val: 30, color: '#ef4444' },
];

const FEEDBACK_DATA = [
    { type: 'PROPUESTA', text: 'Crear una plaza canina en Parque Las Acollaradas', author: 'Ana M.', time: 'Hace 2h', tag: 'Espacios Verdes' },
    { type: 'RECLAMO', text: 'Bache peligroso en Av. San Martín al 400', author: 'Carlos R.', time: 'Hace 4h', tag: 'Vialidad' },
    { type: 'PROPUESTA', text: 'Más talleres de robótica en el CRUB', author: 'Lucas P.', time: 'Hace 1d', tag: 'Educación' },
    { type: 'RECLAMO', text: 'Luminaria rota en Plaza Alsina', author: 'Marta S.', time: 'Hace 1d', tag: 'Alumbrado' },
    { type: 'PROPUESTA', text: 'Feria de emprendedores los domingos', author: 'Juan K.', time: 'Hace 2d', tag: 'Economía' },
];

const FeedItem = ({ item }) => (
    <div className="flex gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
        <div className={`mt-1 p-2 rounded-full h-fit flex-shrink-0 ${item.type === 'PROPUESTA' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {item.type === 'PROPUESTA' ? <Lightbulb size={16} /> : <AlertTriangle size={16} />}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === 'PROPUESTA' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {item.type}
                </span>
                <span className="text-xs text-gray-500">{item.time}</span>
            </div>
            <p className="text-sm text-gray-200 mb-1">{item.text}</p>
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Por {item.author}</span>
                <span className="text-[10px] text-gray-600 border border-gray-700 px-2 rounded-full">{item.tag}</span>
            </div>
        </div>
    </div>
);

export default function CitizensWidget() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Participación Ciudadana</h2>
                    <p className="text-sm text-gray-400">Canal directo con el vecino</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                    Descargar Reporte
                </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50 flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                        <ThumbsUp size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">78%</p>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Aprobación Gestión</p>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50 flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                        <Lightbulb size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">1,240</p>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Propuestas Activas</p>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gray-900/50 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                        <UserCheck size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">+12%</p>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Nuevos Usuarios (Mes)</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Feed */}
                <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/5 bg-gray-900/50 flex flex-col h-[400px]">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <MessageSquare size={18} className="text-gray-400" />
                            Buzón Ciudadano
                        </h3>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs text-green-500 font-mono">EN VIVO</span>
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 custom-scrollbar">
                        {FEEDBACK_DATA.map((item, i) => <FeedItem key={i} item={item} />)}
                        {FEEDBACK_DATA.map((item, i) => <FeedItem key={`dup-${i}`} item={item} />)} {/* Duplicate for scroll effect demo */}
                    </div>
                </div>

                {/* Topics Chart */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gray-900/50 flex flex-col">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-gray-400" />
                        Intereses Generales
                    </h3>
                    <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={INTERESTS_DATA} layout="vertical" margin={{ left: 0, right: 30 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={20}>
                                    {INTERESTS_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-4">
                        Basado en keywords de reclamos y búsquedas
                    </p>
                </div>
            </div>
        </div>
    );
}
