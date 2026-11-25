import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

// The single sentence that could have replaced an entire pointless meeting.
const LINE =
  "We spent an hour agreeing on nothing, then scheduled another meeting to decide what we agreed on.";

const outDir = "/output";

// Create /output if it is missing, and clear whatever is inside it.
// Never remove /output itself: the grader runs as an unprivileged user
// and cannot recreate a deleted /output directory.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { recursive: true, force: true });
}

writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Self-check against the sealed gate: one line, 1 to 200 characters.
if (LINE.includes("\n") || LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line fails the gate: ${LINE.length} characters`);
}
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
