import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AdminLayout from './AdminLayout';
import Overview from './Widgets/Overview';
import SecurityWidget from './Widgets/SecurityWidget';
import HealthWidget from './Widgets/HealthWidget';
import ServicesWidget from './Widgets/ServicesWidget';
import EnvironmentWidget from './Widgets/EnvironmentWidget';

import CitizensWidget from './Widgets/CitizensWidget';

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
    return (
        <div className="admin-app-root h-full">
            <AdminLayout>
                <ContentSwitcher />
            </AdminLayout>
        </div>
    );
}

function ContentSwitcher({ activeTab }) {
    const content = () => {
        switch (activeTab) {
            case 'general': return <Overview />;
            case 'security': return <SecurityWidget />;
            case 'health': return <HealthWidget />;
            case 'services': return <ServicesWidget />;
            case 'environment': return <EnvironmentWidget />;
            case 'citizens': return <CitizensWidget />;
            default: return <Overview />;
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {content()}
            </motion.div>
        </AnimatePresence>
    );
}
