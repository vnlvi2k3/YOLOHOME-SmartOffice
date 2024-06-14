/** @type {import('next').NextConfig} */

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/login",
  //       headers: [
  //         {
  //           key: "Cross-Origin-Embedder-Policy",
  //           value: "unsafe-none",
  //         },
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin allow-popups",
  //         },
  //       ],
  //     },
  //   ];
  // },
};
export default withSerwist(nextConfig);
