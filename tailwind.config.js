/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        liftoff:
          "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/1ff4b7100999053.603f5151216f6.gif')",
      },
    },
  },
  plugins: [],
};
