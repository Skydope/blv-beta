import React, { useState } from 'react';
import { LayoutDashboard, Users, Activity, Shield, Truck, Trees, Menu, X, Bell, Search } from 'lucide-react';
import { clsx } from 'clsx';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('general');

    const menuItems = [
        { id: 'general', label: 'Visión General', icon: LayoutDashboard },
        { id: 'security', label: 'Seguridad', icon: Shield },
        { id: 'health', label: 'Salud', icon: Activity },
        { id: 'transport', label: 'Movilidad', icon: Truck },
        { id: 'environment', label: 'Ambiente', icon: Trees },
        { id: 'citizens', label: 'Ciudadanos', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-white/10 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                    !isSidebarOpen && "-translate-x-full lg:hidden"
                )}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Bolívar<span className="text-white">Admin</span>
                        </h1>
                        <p className="text-xs text-gray-400 mt-1">Panel de Control Central</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)} // In a real app, this would route
                                    className={clsx(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium",
                                        activeTab === item.id
                                            ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                                A
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">Augusto Admin</p>
                                <p className="text-xs text-gray-500 truncate">Intendencia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-white/10 bg-gray-900/50 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 text-gray-400 hover:text-white"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex-1 max-w-xl mx-4 hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar indicador, zona o reporte..."
                                className="w-full bg-gray-950 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                    </div>
                </header>

                {/* Dynamic Content Injection */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-grid-pattern">
                    {/* We pass the active tab down to children or manage it here. For simplicity in this demo, we clone children with props or just render a switch here if we were doing a full SPA. 
                 But better yet, let's treat `children` as the content consumer. 
                 For this specialized request, I'll actually make the AdminDashboard component manage the tabs internally and render the appropriate widgets.
             */}
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { activeTab });
                        }
                        return child;
                    })}
                </main>
            </div>
        </div>
    );
}
