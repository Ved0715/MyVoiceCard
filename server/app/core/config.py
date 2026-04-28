from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # OpenAI
    openai_api_key: str
    openai_model: str = "gpt-4o"
    openai_guardrail_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"

    # Supabase
    supabase_url: str
    supabase_service_key: str

    # Firebase
    firebase_project_id: str
    firebase_credentials_path: str = "firebase-credentials.json"

    # Admin
    admin_secret: str

    # App
    environment: str = "development"
    cors_origin: str = "http://localhost:3000"


settings = Settings()
