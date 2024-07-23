/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      "bg-img": "url(/public/bg-img.jpg)",
    },
  },
  plugins: [require("tailwindcss-animated")],
};
