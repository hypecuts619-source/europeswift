import fs from 'fs';

async function run() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/PeterNerlich/swift-codes/master/swift_codes.json');
    if (!res.ok) {
      console.log('Failed:', res.status, res.statusText);
      return;
    }
    const data = await res.json();
    console.log('Got data, keys:', Object.keys(data).length);
  } catch (e) {
    console.log('Error:', e.message);
  }
}
run();
