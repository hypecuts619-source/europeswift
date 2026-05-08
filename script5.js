async function run() {
  try {
    const res = await fetch('https://api.github.com/repos/PeterNotenboom/SwiftCodes/contents');
    const data = await res.json();
    console.log(data.map(i => i.name));
  } catch (e) {
    console.log('Error:', e.message);
  }
}
run();
