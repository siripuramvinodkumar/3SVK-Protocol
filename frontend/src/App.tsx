import { useState } from 'react'

function App() {
  const [latency, setLatency] = useState(43)
  const [data, setData] = useState<any>(null)
  const [accuracy, setAccuracy] = useState(82)
  const [isVerifying, setIsVerifying] = useState(false)

  // 3SVK NAPS Local Logic (Removes CORS/Localhost dependency)
  const handleFetchData = () => {
    setData("Analyzing Network Nodes...");
    
    setTimeout(() => {
      const mockResponse = {
        protocol: "3SVK-NAPS v1.0",
        status: "Success",
        payload: latency > 200 ? "Optimized (High Latency Strip applied)" : "Full Dataset (Standard)",
        verified_by: "Roll: 23X05A6207",
        node: "Jeedimetla-Edge-Node",
        timestamp: new Date().toLocaleTimeString()
      };
      setData(mockResponse);
    }, 400);
  };

  const handleMentorVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setAccuracy(prev => Math.min(prev + 1, 99));
      setIsVerifying(false);
    }, 600);
  };

  return (
    <div style={{ backgroundColor: '#0b0b0b', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #333', marginBottom: '25px', paddingBottom: '10px' }}>
        <h1 style={{ color: '#00ffaa', margin: 0, fontSize: '22px' }}>⚡ 3SVK (Infinity World)</h1>
        <p style={{ opacity: 0.8, fontSize: '13px' }}>KAPILA Patent Prototype | Roll: 23X05A6207</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* NAPS PANEL */}
        <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ color: '#00ffaa', marginTop: 0, fontSize: '16px' }}>NAPS Logic (Network-Adaptive)</h3>
          <input 
            type="range" min="10" max="500" value={latency} 
            onChange={(e) => setLatency(Number(e.target.value))} 
            style={{ width: '100%', accentColor: '#00ffaa', marginBottom: '10px' }} 
          />
          <p style={{ fontSize: '14px' }}>Latency: <span style={{ fontWeight: 'bold', color: latency > 200 ? '#ff4444' : '#00ffaa' }}>{latency}ms</span></p>
          <button 
            onClick={handleFetchData} 
            style={{ background: '#00ffaa', color: '#000', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
          >
            Fetch Data
          </button>
          <div style={{ marginTop: '15px', background: '#000', padding: '10px', borderRadius: '5px', border: '1px solid #444' }}>
            <pre style={{ margin: 0, fontSize: '11px', color: '#00ffaa', whiteSpace: 'pre-wrap' }}>{data ? JSON.stringify(data, null, 2) : "Ready..."}</pre>
            {latency > 200 && <p style={{ color: '#ff4444', fontWeight: 'bold', marginTop: '8px', fontSize: '12px' }}>⚠️ High latency. NAPS Applied.</p>}
          </div>
        </div>

        {/* RL PANEL */}
        <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ color: '#fff', marginTop: 0, fontSize: '16px' }}>RL Engine (Optimized Matching)</h3>
          <p style={{ fontSize: '14px' }}>System Accuracy: <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#00ffaa' }}>{accuracy}%</span></p>
          <div style={{ height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden', marginBottom: '15px' }}>
            <div style={{ width: `${accuracy}%`, height: '100%', background: '#00ffaa', transition: 'width 0.5s' }}></div>
          </div>
          <button 
            onClick={handleMentorVerify} disabled={isVerifying}
            style={{ background: isVerifying ? '#444' : '#fff', color: '#000', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', width: '100%' }}
          >
            {isVerifying ? "Verifying..." : "Verify Task as Mentor"}
          </button>
        </div>

      </div>
      <footer style={{ marginTop: '30px', textAlign: 'center', fontSize: '10px', color: '#555' }}>
        Protected by GPL-3.0 Patent License | Hosted on Render
      </footer>
    </div>
  )
}

export default App;
