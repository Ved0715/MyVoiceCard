"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/status");
        const data = await response.json();
        setApiStatus(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to connect to the backend");
        setLoading(false);
      }
    };

    testBackend();

  }, []);

  
  
  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Personal Voice Agent
          </h1>
          <p className="text-gray-400 text-lg">
            RAG-Powered Voice Assistant
          </p>
        </div>

        {/* Backend Connection Status */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Backend Connection Test</h2>
            
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Connecting to backend...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                <p className="text-red-400">❌ {error}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Make sure FastAPI server is running: <code className="bg-gray-900 px-2 py-1 rounded">uvicorn app.main:app --reload</code>
                </p>
              </div>
            )}

            {apiStatus && !loading && (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
                  <p className="text-green-400 font-semibold">✅ Connected to Backend!</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <pre className="text-gray-300">
                    {JSON.stringify(apiStatus, null, 2)}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Backend Status</p>
                    <p className="text-xl font-semibold text-green-400">{apiStatus.status}</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">API Version</p>
                    <p className="text-xl font-semibold text-blue-400">{apiStatus.version}</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <a 
                    href="http://localhost:8000/docs" 
                    target="_blank"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    View API Documentation
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>✨ Frontend-Backend connection successful!</p>
            <p>Ready for Step 5: Environment Configuration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
