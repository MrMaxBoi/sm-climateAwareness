import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const frontendBuild = path.join(projectRoot, "frontend", "dist");
const publicDirectory = path.join(projectRoot, "public");

await rm(publicDirectory, { recursive: true, force: true });
await mkdir(publicDirectory, { recursive: true });
await cp(frontendBuild, publicDirectory, { recursive: true });

console.log("Prepared frontend/dist as Vercel public assets.");
