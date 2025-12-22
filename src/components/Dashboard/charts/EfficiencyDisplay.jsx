import { motion } from 'framer-motion';

export default function EfficiencyDisplay() {
    return (
        <div className="flex flex-col items-center justify-center h-[200px] w-full">
            <div className="relative flex items-center justify-center mb-4">
                {/* Animated Circle Background */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute w-32 h-32 rounded-full bg-tech-green/10"
                />
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-green to-emerald-400">
                    -45min
                </div>
            </div>

            <div className="flex items-center gap-2 text-tech-green bg-tech-green/10 px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="font-semibold">Mejora del 60%</span>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Promedio ahorro/trámite</p>
        </div>
    );
}
