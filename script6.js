async function run() {
  try {
    const res = await fetch('https://api.github.com/users/PeterNerlich/repos');
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log('Error:', e.message);
  }
}
run();
