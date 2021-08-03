module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light_blue_icx: '#31F1F5',
        dark_blue_icx: '#32B8BB',
        darker_blue_icx: '#229fa2',
        gray_bar_icx: '#5c5c64',
        gray_text_icx: '#808080',
        light_gray_text_icx: '#85928d',
        dark_gray_button_icx: '#1f2120',
        light_gray_button_icx: '#3a3c3b',
        material_black: '#2a2a2a',
        depth_black: '#373537'
      },
      shadows: {
        'white': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      minHeight: {
        '3/5': '63vh',
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
      },
      keyframes: {
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px) translateY(0)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'bounce': 'bounce 1.2s running ease infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
