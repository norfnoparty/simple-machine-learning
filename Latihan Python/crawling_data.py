import os

filename = "MBG.csv"
search_keyword = "MBG since:2025-01-01 until:2025-09-20 lang:id"
limit = 10
token = "2197724ae39622af3b2feab6aa6b234e8535b221"

command = f'npx -y tweet-harvest@2.6.1 -o "{filename}" -s "{search_keyword}" --tab "LATEST" -l {limit} --token {token}'

os.system(command)
