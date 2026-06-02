#==================
#1. Import Library 
#==================
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error,r2_score

#==================
#2. Load Dataset
#==================
df=pd.read_csv(r"D:\Code\Latihan Python\rumah.csv")

print("Data")
print(df.head())

#==================
#3. Fitur & Harga
#==================

X = df[['luas','jumlah_kamar','jarak_ke_kota']]
y = df['harga']

#==================
#4. Split Data
#==================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


#==================
#5. Model (statistika)
#==================
model = LinearRegression()
model.fit (X_train, y_train)

#==================
#6. Prediksi
#==================
y_pred = model.predict(X_test)

#==================
#7. Evaluasi 
#==================
print("\nEvaluasi Model:")
print("MAE:", mean_absolute_error(y_test, y_pred))
print("R2 Score:", r2_score(y_test,y_pred))
#MAE : Semakin Tinggi Model Semakin Buruk (error banyak)
#R2 : Semakin Tinggi Model Semakin Baik (mengukur seberapa besar variasi pada variabel dependen)

#==================
#8. Prediksi Data Baru 
#==================
#contoh: luas = 200, kamar = 5, jarak = 5

data_baru = pd.DataFrame([[200,5,5]],
columns=['luas','jumlah_kamar','jarak_ke_kota'])

prediksi = model.predict(data_baru)


print("\nPrediksi harga rumah baru:")
print(f"Harga:{prediksi[0]:.2f}juta")


