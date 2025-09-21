import * as React from 'react'

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tesco API Proxy Server</h1>
      <p>Proxy server is running on port 3001</p>
      <p>API endpoint: <code>/api/tesco</code></p>
    </div>
  )
}
