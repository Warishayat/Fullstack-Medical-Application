import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url = os.getenv("Supabase_url")
key = os.getenv("Supabase_key")

client = create_client(url,key)
