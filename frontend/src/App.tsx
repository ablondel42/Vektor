import { useEffect, useState } from 'react';

type PingResponse = {
  ok: boolean;
  message: string;
};

function App() {
  const [data, setData] = useState<PingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching ping from backend...');
    fetch('http://localhost:3000/ping')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((json: PingResponse) => setData(json))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      });
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Frontend to Backend Test</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!error && !data && <p>Loading...</p>}

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}

export default App;