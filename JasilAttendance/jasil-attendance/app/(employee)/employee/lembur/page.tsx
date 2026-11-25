import React from 'react'

export default function LemburPage() {
  return (
  <>
  <main className='flex-1 min-h-screen'>
    <header className='top-header'>
      <h1 className='page-title'>Jadwal Lembur</h1>
    </header>
    <div className="content-body">
            <div className="stats-grid">
                <div className="section-card">
                    <div className="section-header">
                        <h2 className="section-title items-center">Jadwal Lembur Saya</h2>
                    </div>
                    <table className="data-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Jam Rencana</th>
                            <th>Realisasi</th>
                            <th>Keterangan Tugas</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    </table>
                </div>
            </div> 
    </div>   
  </main>
  </>
  )
}

