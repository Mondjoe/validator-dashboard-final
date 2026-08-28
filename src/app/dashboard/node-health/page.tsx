useEffect(() => {
  let timer: any;

  async function load() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/operator/node-health`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Failed to load node health:", e);
    } finally {
      setLoading(false);
    }
  }

  // initial load
  load();

  // auto-refresh every 5 seconds
  timer = setInterval(load, 5000);

  return () => clearInterval(timer);
}, []);