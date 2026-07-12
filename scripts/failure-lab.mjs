import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";

const mode = process.argv[2];
const root = process.cwd();

if (!mode || !["test", "lint", "typecheck"].includes(mode)) {
  console.error("Usage: npm run failure-lab -- <test|lint|typecheck>");
  process.exit(2);
}

const workspace = await mkdtemp(join(root, ".failure-lab-tmp-"));

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("close", (code) => resolve(code ?? 1));
  });
}

try {
  let code;

  if (mode === "test") {
    const file = join(workspace, "failure-lab.test.mjs");
    await writeFile(
      file,
      [
        'import assert from "node:assert/strict";',
        'import test from "node:test";',
        'test("failure-lab: allocation total remains stable", () => {',
        '  assert.equal("expected-total", "actual-total");',
        "});",
        "",
      ].join("\n"),
    );
    console.error("[failure-lab] Deliberate unit-test failure: expected-total !== actual-total");
    code = await run(process.execPath, ["--test", file]);
  } else if (mode === "lint") {
    const file = join(workspace, "failure-lab-lint.mjs");
    await writeFile(file, 'const unusedFailureLabValue = "intentional lint failure";\n');
    const eslint = join(root, "node_modules", "eslint", "bin", "eslint.js");
    console.error("[failure-lab] Deliberate lint failure: unusedFailureLabValue is intentionally unused");
    code = await run(process.execPath, [eslint, "--max-warnings=0", file]);
  } else {
    const file = join(workspace, "failure-lab-type-error.ts");
    await writeFile(file, 'const amount: number = "not-a-number";\nconsole.log(amount);\n');
    const tsc = join(root, "node_modules", "typescript", "bin", "tsc");
    console.error("[failure-lab] Deliberate TypeScript failure: string is not assignable to number");
    code = await run(process.execPath, [tsc, "--noEmit", "--strict", "--skipLibCheck", "--target", "ES2022", "--module", "NodeNext", "--moduleResolution", "NodeNext", file]);
  }

  process.exitCode = code;
} finally {
  await rm(workspace, { recursive: true, force: true });
}
