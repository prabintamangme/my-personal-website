import type { NextConfig } from "next";
import path from "node:path";

const localNodePreview = process.env.LOCAL_NODE_PREVIEW === "1";
const nodeRuntimeBuild = localNodePreview || process.env.NEXT_NODE_BUILD === "1" || process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  agentRules: false,
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  turbopack: nodeRuntimeBuild
    ? { resolveAlias: { "runtime-bindings": "./lib/cloudflare-preview-shim.ts" } }
    : undefined,
  webpack(config, { webpack }) {
    if (nodeRuntimeBuild) {
      const bindingsShim = path.resolve(process.cwd(), "lib/cloudflare-preview-shim.ts");
      config.resolve.alias["runtime-bindings"] = bindingsShim;
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(
        /(?:^runtime-bindings$|[\\/]lib[\\/]runtime-bindings(?:\.ts)?$)/,
        bindingsShim,
      ));
    }
    return config;
  },
};

export default nextConfig;
