async function run() {
  try {
    const res = await fetch('https://api.github.com/search/repositories?q=swift+codes+json&sort=stars');
    const data = await res.json();
    console.log(data.items.slice(0,3).map(i => i.full_name));
  } catch (e) {
    console.log('Error:', e.message);
  }
}
run();
