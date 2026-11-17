import localFont from "next/font/local";

/** The brand typeface, shared by every root layout. */
export const switzer = localFont({
  src: [
    { path: "./Switzer-300.woff2", weight: "300" },
    { path: "./Switzer-400.woff2", weight: "400" },
    { path: "./Switzer-500.woff2", weight: "500" },
    { path: "./Switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-switzer",
  display: "swap",
});
