import { execSync } from 'child_process';
for (let i = 0; i < 30; i++) {
  try {
    console.log(`Run ${i+1}...`);
    execSync('npx tsx src/scripts/fast_populate.ts', { stdio: 'inherit' });
  } catch (e) {
    break;
  }
}
