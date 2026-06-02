#===================
#import Library
#===================
import pandas as pd
import re 
from collections import Counter

#===================
#1. Load Dataset
#===================
df = pd.read_csv(r'D:\Code\tweets-data\MBG.csv')

df=df[['full_text']].dropna()
df.rename(columns={'full_text':'tweet'}, inplace=True)

#===================
#2. Cleaning Text (Pre-processing)
#===================
def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', "",text)
    text = re.sub(r'@\W+', "",text)
    text = re.sub(r'[^a-zA-Z\s]', "",text)
    return text

df['clean'] = df['tweet'].apply(clean_text)


#================== 
#3. Kamus Sentimen Sederhana
#==================

positif_words=['bagus','keren','mantap','cepat','baik','puas','lancar','mudah']
negatif_words=['basi','jelek','parah','gagal','lambat','racun','keracunan','error','buruk']

#==================
#4. label Sentimen
#==================
def get_sentimen(text):
    pos = sum(word in text for word in positif_words)
    neg = sum(word in text for word in negatif_words)

    if pos > neg:
        return 'positif'
    elif neg > pos: 
        return 'negatif'
    else: 
        return 'netral'
    
df['sentiment'] = df['clean'].apply(get_sentimen)

#==================
#5. Hitung Jumlah Sentimen
#==================
print("Jumlah Sentimen:")
print(df['sentiment'].value_counts())

#==================
#6. Ambil Kata Terbanyak 
#==================
def get_top_words(data,label): 
    words=''.join(data[data['sentiment']==label]['clean']).split()
    return Counter(words).most_common(10)

print("\nTop Kata Positif:")
print(get_top_words(df,'positif'))

print("\nTop Kata Negatif")
print (get_top_words(df,'negatif'))


