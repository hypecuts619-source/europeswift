import { execSync } from 'child_process';
try {
    console.log("Running one fast_populate run...");
    execSync('npx tsx src/scripts/fast_populate.ts', { stdio: 'inherit' });
    console.log("Done.");
} catch (e) {
    console.log("Error:", e.message);
}
