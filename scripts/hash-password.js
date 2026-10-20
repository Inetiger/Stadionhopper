const { randomBytes, scryptSync } = require("node:crypto");
const readline = require("node:readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stderr, terminal: true });
rl.question("Passord for lokal testkonto (ikke bruk et ekte passord): ", password => {
  rl.close();
  if (!password) {
    process.stderr.write("Passord kan ikke være tomt.\n");
    process.exitCode = 1;
    return;
  }
  const salt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(password, salt, 64).toString("hex");
  process.stdout.write(JSON.stringify({ salt, passwordHash }) + "\n");
});
