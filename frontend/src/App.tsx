import { useState, useEffect } from 'react'

function App() {
  const [latency, setLatency] = useState(43)
  const [data, setData] = useState<any>(null)
  const [accuracy, setAccuracy] = useState(82)
  const [isVerifying, setIsVerifying] = useState(false)

  // MOCK LOGIC: Instead of socket.emit, we simulate the 3SVK Protocol response
  const handleFetchData = () => {
    setData("Analyzing Network...");
    
    // Simulate NAPS Logic processing time based on latency
    setTimeout(() => {
      const mockResponse = {
        protocol: "3SVK-NAPS v1.0",
        status: "Success",
        payload: latency > 200 ? "Optimized (Lightweight)" : "Full Dataset",
        verified_by: "Roll: 23X05A6207",
        timestamp: new Date().toLocaleTimeString()
      };
      setData(mockResponse);
    }, 500);
  };

  const handleMentorVerify = () => {
    setIsVerifying(true);
    // Simulate RL Engine increasing accuracy after human verification
    setTimeout(() => {
      setAccuracy(prev => Math.min(prev + 2, 98));
      setIsVerifying(false);
    }, 800);
  };

  return (
    <div style={{ backgroundColor: '#0b0b0b', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #333', marginBottom: '30px' }}>
        <h1 style={{ color: '#00ffaa', margin: 0 }}>⚡ 3SVK (Infinity World)</h1>
        <p style={{ opacity: 0.8 }}>KAPILA Patent Prototype | Inventor: Siripuram Vinod Kumar | Roll: 23X05A6207</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '20px' }}>
        
        {/* LEFT PANEL: NAPS LOGIC */}
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333', boxShadow: '0 4px 20px rgba(0,255,170,0.1)' }}>
          <h3 style={{ color: '#00ffaa' }}>NAPS Logic (Network-Adaptive)</h3>
          <p style={{ fontSize: '13px', color: '#888' }}>Detects "Below Earth" network lag and strips non-essential payload data.</p>
          
          <input 
            type="range" 
            min="10" 
            max="500" 
            value={latency} 
            onChange={(e) => setLatency(Number(e.target.value))} 
            style={{ width: '100%', cursor: 'pointer', accentColor: '#00ffaa' }} 
          />
          
          <p>Simulated Latency: <span style={{ fontWeight: 'bold', color: latency > 200 ? '#ff4444' : '#00ffaa' }}>{latency}ms</span></p>
          
          <button 
            onClick={handleFetchData} 
            style={{ background: '#00ffaa', color: '#000', padding: '12px 24px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
          >
            Fetch Data via 3SVK Protocol
          </button>

          <div style={{ marginTop: '20px', background: '#000', padding: '15px', borderRadius: '8px', border: '1px solid #444', height: '140px', overflow: 'auto' }}>
            <pre style={{ margin: 0, fontSize: '13px', color: '#00ffaa' }}>{JSON.stringify(data, null, 2)}</pre>
            {latency > 200 && (
              <p style={{ color: '#ff4444', fontWeight: 'bold', marginTop: '10px', fontSize: '14px' }}>
                ⚠️ High latency detected ({latency}ms). NAPS Logic Applied: Stripping Heavy CSS/Assets.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: RL ENGINE */}
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ color: '#fff' }}>RL Engine (Optimized Matching)</h3>
          <p style={{ fontSize: '13px', color: '#888' }}>Reinforcement Learning validates student skills against industry nodes.</p>
          
          <p>Current System Accuracy: <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ffaa' }}>{accuracy}%</span></p>
          
          <div style={{ height: '12px', background: '#333', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ width: `${accuracy}%`, height: '100%', background: '#00ffaa', transition: 'width 0.8s ease-in-out' }}></div>
          </div>

          <button 
            onClick={handleMentorVerify} 
            disabled={isVerifying}
            style={{ 
              background: isVerifying ? '#444' : '#fff', 
              color: '#000', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              cursor: isVerifying ? 'not-allowed' : 'pointer',
              width: '100%' 
            }}
          >
            {isVerifying ? "Verifying..." : "Verify Task as Mentor"}
          </button>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '15px', fontStyle: 'italic' }}>
            *Note: Accuracy increases as Mentor Nodes validate Proof-of-Work.
          </p>
        </div>

      </div>

      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#444' }}>
        &copy; 2026 3SVK Protocol. All Rights Reserved. Protected by GPL-3.0 Patent License.
      </footer>
    </div>
  )
}

export default App;
