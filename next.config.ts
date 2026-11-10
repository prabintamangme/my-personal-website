import type { NextConfig } from "next";
import path from "node:path";

const localNodePreview = process.env.LOCAL_NODE_PREVIEW === "1";

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: localNodePreview
    ? { resolveAlias: { "cloudflare:workers": "./lib/cloudflare-preview-shim.ts" } }
    : undefined,
  webpack(config) {
    if (localNodePreview) {
      config.resolve.alias["cloudflare:workers"] = path.resolve(
        process.cwd(),
        "lib/cloudflare-preview-shim.ts",
      );
    }
    return config;
  },
};

export default nextConfig;
