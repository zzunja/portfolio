import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx', 'jsx']
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)

