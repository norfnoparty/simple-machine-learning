import requests
import pandas as pd
import time
import os

TOKEN = "Token_GITHUB_ANDA"  # Ganti dengan token GitHub Anda
headers = {"Authorization": f"token {TOKEN}"}

BASE_DIR = r'C:\Users\lenovo\Desktop\GitHub\Stat\Project-Statistika-Kelompok-11'
RAW_FOLDER = os.path.join(BASE_DIR, 'data', 'raw')
os.makedirs(RAW_FOLDER, exist_ok=True)

def fetch_github_data(category="issues", total_pages=15):
    all_data = []
    print(f"\n🚀 Mengambil data mentah {category}...")
    for page in range(1, total_pages + 1):
        url = f"https://api.github.com/repos/pandas-dev/pandas/{category}"
        params = {'state': 'closed', 'per_page': 100, 'page': page, 'sort': 'created', 'direction': 'desc'}
        try:
            res = requests.get(url, headers=headers, params=params, timeout=30)
            if res.status_code != 200: break
            data = res.json()
            if not data: break
            all_data.extend(data)
            print(f"📄 Page {page} sukses. Total: {len(all_data)}")
            time.sleep(1.5)
        except:
            continue
    return pd.DataFrame(all_data)

df_iss_raw = fetch_github_data("issues", total_pages=60)
df_prs_raw = fetch_github_data("pulls", total_pages=15)

df_iss_raw.to_csv(os.path.join(RAW_FOLDER, 'pandas_issues_raw.csv'), index=False)
df_prs_raw.to_csv(os.path.join(RAW_FOLDER, 'pandas_prs_raw.csv'), index=False)

print(f"\n✅ DATA MENTAH TERSIMPAN DI: {RAW_FOLDER}")