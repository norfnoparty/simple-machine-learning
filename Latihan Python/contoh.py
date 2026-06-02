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

# =========================================
# DATASET (SIMULASI AKADEMIK)
# =========================================
data = {
    'hari': np.arange(1, 21),
    'harga': [100,102,101,105,107,110,108,112,115,117,
              120,119,123,125,128,130,129,132,135,138]
}

df = pd.DataFrame(data)

# =========================================
# PREPROCESSING
# =========================================
X = df[['hari']]
y = df['harga']

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================================
# MODELING (LINEAR REGRESSION)
# =========================================
model = LinearRegression()
model.fit(X_train, y_train)

# =========================================
# PREDIKSI
# =========================================
y_pred = model.predict(X_test)

# =========================================
# EVALUASI MODEL
# =========================================
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("=== Evaluasi Model ===")
print("MAE :", mae)
print("R2  :", r2)

# =========================================
# PREDIKSI DATA BARU
# =========================================
hari_baru = np.array([[21]])
prediksi_baru = model.predict(hari_baru)

print("\nPrediksi harga hari ke-21:", prediksi_baru[0])

# =========================================
# ANALISIS STATISTIKA (Z-SCORE)
# =========================================
df['z_score'] = zscore(df['harga'])

print("\nData dengan Z-Score:")
print(df)

# =========================================
# VISUALISASI
# =========================================

# Grafik regresi
plt.figure()
plt.scatter(X, y)
plt.plot(X, model.predict(X))
plt.title("Regresi Linear Harga Saham")
plt.xlabel("Hari")
plt.ylabel("Harga")
plt.show()

# Grafik Z-Score
plt.figure()
plt.scatter(df['harga'], df['z_score'])
plt.axhline(y=0)
plt.title("Z-Score Harga Saham")
plt.xlabel("Harga")
plt.ylabel("Z-Score")
plt.show()