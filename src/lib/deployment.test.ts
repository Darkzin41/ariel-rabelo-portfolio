import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

test("Vercel serves the SPA entrypoint for direct route requests", () => {
  const configPath = new URL("../../vercel.json", import.meta.url)
  const config = JSON.parse(readFileSync(configPath, "utf8")) as {
    rewrites?: Array<{ source: string; destination: string }>
  }

  assert.deepEqual(config.rewrites, [
    { source: "/(.*)", destination: "/index.html" },
  ])
})
