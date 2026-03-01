import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

function App() {
  const [latency, setLatency] = useState(43)
  const [data, setData] = useState<any>(null)
  const [accuracy, setAccuracy] = useState(82)

  useEffect(() => {
    socket.on('job_data', (res) => setData(res))
    socket.on('accuracy_update', (val) => setAccuracy(val))
    return () => { socket.off('job_data'); socket.off('accuracy_update') }
  }, [])

  return (
    <div style={{ backgroundColor: '#0b0b0b', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #333', marginBottom: '30px' }}>
        <h1 style={{ color: '#00ffaa' }}>⚡ 3SVK (Infinity World)</h1>
        <p>KAPILA Patent Prototype | Roll: 23X05A6207</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <h3>NAPS Logic (Network-Adaptive)</h3>
          <input type="range" min="10" max="500" value={latency} onChange={(e) => setLatency(Number(e.target.value))} style={{ width: '100%' }} />
          <p>Simulated Latency: <span style={{ color: latency > 200 ? '#ff4444' : '#00ffaa' }}>{latency}ms</span></p>
          <button onClick={() => socket.emit('fetch_job', latency)} style={{ background: '#00ffaa', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Fetch Data</button>
          <div style={{ marginTop: '20px', background: '#000', padding: '10px', borderRadius: '5px', fontSize: '12px', height: '100px', overflow: 'auto' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {latency > 200 && <p style={{ color: '#ff4444' }}>⚠️ High latency detected. NAPS applied.</p>}
          </div>
        </div>

        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <h3>RL Engine (Optimized Matching)</h3>
          <p>Current Accuracy: <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{accuracy}%</span></p>
          <div style={{ height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${accuracy}%`, height: '100%', background: '#00ffaa', transition: 'width 0.5s' }}></div>
          </div>
          <button onClick={() => socket.emit('mentor_verify')} style={{ marginTop: '20px', background: '#fff', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Verify Task as Mentor</button>
        </div>
      </div>
    </div>
  )
}

export default App