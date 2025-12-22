import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function KPICard({ title, tag, tagColor, children, className, delay = 0 }) {
    const getTagColor = (color) => {
        switch (color) {
            case 'cyan': return 'bg-cyan-500/20 text-cyan-400';
            case 'blue': return 'bg-blue-500/20 text-blue-400';
            case 'green': return 'bg-emerald-500/20 text-emerald-400';
            default: return 'bg-gray-700/50 text-gray-300';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={twMerge(
                "glass-effect p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors bg-gray-900/50 backdrop-blur-xl",
                className
            )}
        >
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white">{title}</h4>
                {tag && (
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getTagColor(tagColor)}`}>
                        {tag}
                    </span>
                )}
            </div>
            {children}
        </motion.div>
    );
}
