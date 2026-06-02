import requests
import pandas as pd
import time

TOKEN = ''
REPO = 'pandas-dev/pandas'
HEADERS = {'Authorization': f'token {TOKEN}'}

def fetch_issues(state='closed', per_page=100, total_needed=1000):
    all_issues = []
    page = 1

    while len(all_issues) < total_needed:
        url = f"https://api.github.com/repos/{REPO}/issues?state={state}&per_page={per_page}&page={page}"
        response = requests.get(url, headers=HEADERS)

        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            break

        data = response.json()
        if not data:
            break

        all_issues.extend(data)
        print(f"Berhasil mengambil {len(all_issues)} data...")

        page += 1
        time.sleep(1)

    return all_issues

raw_data = fetch_issues()
df = pd.DataFrame(raw_data)

df.to_csv('data/raw/github_issues.csv', index=False)