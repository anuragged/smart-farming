
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom soil monitoring colors
				soil: {
					brown: "#8B6D5D",
					lightBrown: "#A68B7B",
					darkBrown: "#634C3F",
					sand: "#DBCBBD",
					clay: "#BF9D7E"
				},
				status: {
					optimal: "#4CAF50",    // Changed to a cooler green
					warning: "#2196F3",    // Changed to blue instead of orange
					critical: "#F44336",   // Kept red but slightly cooler shade
					optimalLight: "#E8F5E9",
					warningLight: "#E3F2FD",
					criticalLight: "#FFEBEE"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.7'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'fade-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'data-update': {
					'0%': {
						backgroundColor: 'rgba(92, 184, 92, 0.2)'
					},
					'100%': {
						backgroundColor: 'transparent'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'data-update': 'data-update 1.5s ease-out'
			},
			backgroundImage: {
				'soil-gradient': 'linear-gradient(to bottom, #E3F2FD, #BBDEFB)',
				'card-gradient': 'linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(255,255,255,0.2))',
				'optimal-gradient': 'linear-gradient(184.1deg, rgba(224,242,255,1) 44.7%, rgba(179,229,252,1) 67.2%)',
				'warning-gradient': 'linear-gradient(90deg, hsla(199, 98%, 48%, 1) 0%, hsla(187, 100%, 45%, 1) 100%)',
				'critical-gradient': 'linear-gradient(90deg, hsla(340, 100%, 76%, 1) 0%, hsla(349, 100%, 58%, 1) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
