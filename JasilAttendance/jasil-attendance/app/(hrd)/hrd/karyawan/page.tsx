import React from 'react'

export default function KaryawanPage() {
  return (
    <>
    <main className='flex-1 min-h-screen'>
      <header className='top-header'>
        <h1 className='page-title'>Data Karyawan</h1>
      </header>
      <div className='content-body'>
        <div className='stats-grid'>
          <div className='section-card'>
            <div className='section-header'>
              <h2 className='section-title'></h2>
            </div>
            <table className='data-table'>
              <thead>
                <tr>
                  <th>PIN</th>
                  <th>NAMA KARYAWAN</th>
                  <th>CHECK IN</th>
                  <th>CHECK OUT</th>
                  <th>STATUS</th>
                  <th>DURASI TELAT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>101</td>
                  <td>Riyadh Fadilah</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

