# =========================================
# IMPORT LIBRARY
# =========================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

from scipy.stats import zscore

# ==========================================
#Input Hari Setelah Tanggal 7 April 2026
# ==========================================
hari = 33

# =========================================
# Dataset Emas Perbulan
# =========================================

df = pd.read_csv(r"D:\Code\Latihan Python\emas.csv")
print("Data Sebulan Terakhir: ")
print(df.head())

# =========================================
# Fitur Hari & Harga Emas
# =========================================
X = df[['hari']]
y = df['harga_emas']

#==========================================
# Split data (80% latihan, 20% tes)
#==========================================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================================
# Modeling (Linear Regression)
# =========================================
model = LinearRegression()
model.fit(X_train, y_train)

# =========================================
# Prediksi
# =========================================
y_pred = model.predict(X_test)


# =========================================
# Evaluasi Model
# =========================================
print("=== Evaluasi Model ===")
print("MAE :", mean_absolute_error(y_test, y_pred))
print("R2  :", r2_score(y_test, y_pred))

# =========================================
# Prediksi Data Baru
# =========================================
hari_baru = pd.DataFrame([hari])
prediksi = model.predict(hari_baru)

print("\nPrediksi Harga Emas Hari ke-({}):".format(hari), prediksi[0])

# =========================================
# Analisis Z-Score
# =========================================
df['z_score'] = zscore(df['harga_emas'])

print("\nData Harga Emas dengan Z-Score:")
print(df)

# =========================================
# Visualiasi Hasil 
# =========================================

# Grafik regresi linear
plt.figure()
plt.scatter(X, y)
plt.plot(X, model.predict(X))
plt.title("Regresi Linear Harga Emas")
plt.xlabel("Hari")
plt.ylabel("Harga Emas (Rp)")
plt.show()

# Grafik Z-Score
plt.figure()
plt.scatter(df['harga_emas'], df['z_score'])

# Garis Batas 
plt.axhline(y=0)
plt.axhline(y=2, linestyle='--')
plt.axhline(y=-2, linestyle='--')

plt.title("Z-Score Harga Emas")
plt.xlabel("Harga Emas (Rp)")
plt.ylabel("Z-Score")
plt.show()

