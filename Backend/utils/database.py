import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url = os.environ.get("Supabase_url")
key = os.environ.get("Supabase_key")

client = create_client(url,key)



if __name__ == "__main__":
    print("All is working fine")