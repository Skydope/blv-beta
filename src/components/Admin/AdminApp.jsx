import React from 'react';
import AdminLayout from './AdminLayout';
import Overview from './Widgets/Overview';
import SecurityWidget from './Widgets/SecurityWidget';
import HealthWidget from './Widgets/HealthWidget';

// Preliminary placeholder components for other tabs
const Placeholder = ({ title }) => (
    <div className="flex items-center justify-center h-96 text-gray-500">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p>Módulo en desarrollo - Próximamente en Fase 3</p>
        </div>
    </div>
);

export default function AdminApp() {
    // Logic to render active tab content
    // Since AdminLayout uses React.Children mapping, we create a wrapper
    // that accepts activeTab prop injected by Layout

    return (
        <div className="admin-app-root">
            <AdminLayout>
                <ContentSwitcher />
            </AdminLayout>
        </div>
    );
}

function ContentSwitcher({ activeTab }) {
    switch (activeTab) {
        case 'general': return <Overview />;
        case 'security': return <SecurityWidget />;
        case 'health': return <HealthWidget />;
        case 'transport': return <Placeholder title="Movilidad Urbana" />;
        case 'environment': return <Placeholder title="Monitoreo Ambiental" />;
        case 'citizens': return <Placeholder title="Base Ciudadana" />;
        default: return <Overview />;
    }
}
