/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#e6f1ff',
					100: '#b3d7ff',
					200: '#80bdff',
					300: '#4da3ff',
					400: '#1a89ff',
					500: '#0070f3',
					600: '#005cc0',
					700: '#00478d',
					800: '#00325a',
					900: '#001d27',
				},
				tech: {
					cyan: '#00d4ff',
					blue: '#0070f3',
					green: '#00f2a9',
				}
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in',
				'slide-up': 'slideUp 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
