// How Many Tabs Do You Have Open?
// Writes one number, digits only: the honest count of browser tabs
// open right now. Node 22 stdlib only, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 63: a real tab-hoarder count. High enough to surprise a field full of
// 3s, 5s and 12s, odd and non-round so it reads as actually counted
// rather than guessed, and entirely plausible for someone who researches,
// reads and multitasks across several browser windows.
const COUNT = "63";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (!/^\d{1,5}$/.test(COUNT)) {
  console.error("entry is not 1-5 digits");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, COUNT, "utf8");

// Read back and confirm the file holds exactly the digits, nothing else.
const written = readFileSync(outFile, "utf8");
if (written !== COUNT) {
  console.error(`entry.txt mismatch: expected ${COUNT}, got ${JSON.stringify(written)}`);
  process.exit(1);
}
