const fs = require('fs');

async function download() {
  const url = 'https://raw.githubusercontent.com/PeterNotenBoom/SwiftCodes/master/swift_codes.json';
  console.log('Downloading from', url);
  try {
    const res = await fetch(url);
    if (!res.ok) {
        console.log("Not found or error");
        return;
    }
    const data = await res.json();
    fs.writeFileSync('swift_codes.json', JSON.stringify(data, null, 2));
    console.log('Saved to swift_codes.json');
  } catch(e) {
    console.log("Error:", e);
  }
}
download();
