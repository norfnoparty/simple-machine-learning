import React from 'react'

export default function LivePage() {
  return (
    <>
    <main className='flex-1 min-h-screen'>
        <header className='top-header'>
            <h1 className='page-title'>Live Monitoring</h1>
        </header>
        <div className='content-body'>
            <div className='stats-grid'>
                <div className="section-card">
                    <div className="section-header">
                        <h2 className="section-title">Live Tap Mesin</h2>
                    </div> 
                </div>
            </div>
        </div>
    </main>
    </>
  )
}
