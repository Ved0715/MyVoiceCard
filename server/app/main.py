

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Personal Voice Agent API",
    description="API for Personal Voice Agent",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Personal Voice Agent API",
        "version": "0.1.0",
        "docs": "http://localhost:8000/docs",
        "status": "healthy",
    }


@app.get("/api/status")
async def status():
    """API status endpoint"""
    return {
        "database": "not connected yet",
        "vector_store": "not initialized yet",
        "total_chunks": 0,
        "total_sources": 0
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)