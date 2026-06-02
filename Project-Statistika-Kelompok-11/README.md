# Project-Statistika-Kelompok-11


> Audit statistik terhadap repository open-source `pandas` 
> dengan menggunakan Konsep Statistika dan Probabilitas.


## 📝 Latar Belakang
Pandas adalah library manipulasi data paling populer di ekosistem Python. Dengan ribuan kontributor, menjaga kualitas kode adalah tantangan besar. Proyek ini bertujuan untuk melakukan audit kesehatan repositori menggunakan pendekatan statistika formal untuk mengukur efisiensi kerja developer dan stabilitas sistem.

## 🎯 Research Questions

| # | Pertanyaan | Tujuan | Teknik | Notebook |
|---|-----------|-------|--------|---------|
| **RQ1** | Berapa estimasi probabilitas sebuah issue bug (is_bug = 1) dapat diselesaikan dalam waktu ≤ 7 hari, dan seberapa tinggi tingkat ketidakpastian estimasi tersebut? | Mengukur peluang penyelesaian cepat untuk issue bug berdasarkan data historis Pandas | MLE Bernoulli, Beta Distribution, Bayesian Estimation | `02` + `03` |
| **RQ2** | Berapa rata-rata jumlah issue bug yang diselesaikan setiap minggu pada repositori Pandas, dan apakah rata-rata tersebut berbeda secara signifikan dari nilai yang diasumsikan? | Menganalisis laju penyelesaian bug dan menguji signifikansi statistiknya | MLE Poisson, Confidence Interval, Z-Test | `02` + `04` |
| **RQ3** | Berapa peluang sebuah issue membutuhkan waktu penyelesaian lebih dari 60 hari, dan bagaimana distribusi peluang tersebut jika disimulasikan secara komputasi? | Memprediksi kemungkinan terjadinya issue dengan durasi penyelesaian yang sangat lama | Monte Carlo Simulation | `05` |

## 👥 Tim (Kelompok 11)

| Peran | Nama | NIM | Jobdesk |
| :--- | :--- | :--- | :--- |
| **Member A** | Natasya Nur Afriyani | 1519625022 | **Data Engineer**: Scraping GitHub API & Data Cleaning |
| **Member B** | Elpa Padila | 1519625020 | **Estimation Analyst**: MLE & Parameter Fitting |
| **Member C** | Riyadh Fadilah | 1519625030 | **Inference Analyst**: Bayesian & Confidence Interval |
| **Member D** | Daffa Alfaridzi | 1519625054 | **Hypothesis Analyst**: Z-Test & Significance Testing |
| **Member E** | Adam Raysa Rahman | 1519625009 | **Computation Analyst**: Monte Carlo Simulation |

## 📁 Struktur Repository

```text
Project-Statistika-Kelompok-11/
├── README.md
├── AI_USAGE_LOG.md
├── data/
│   ├── raw/                         # Data mentah hasil crawling GitHub API
│   └── clean/
│       └── dataset_final.csv        # Dataset hasil cleaning
├── src/
│   ├── estimator.py                 # Analisis estimasi parameter (Member B)
│   ├── inference.py                 # Bayesian & confidence interval (Member C)
│   ├── hypothesis.py                # Pengujian hipotesis (Member D)
│   └── simulation.py                # Monte Carlo simulation (Member E)
├── notebooks/
│   ├── 01_eda.ipynb
│   ├── 02_estimation.ipynb
│   ├── 03_confidence_interval.ipynb
│   ├── 04_hypothesis_testing.ipynb
│   └── 05_simulation.ipynb
├── report/
│   └── statistical_health_report.pdf
├── presentation/
│   └── video_link.md
└── requirements.txt
```

## 🚀 Cara Menjalankan

```bash
# 1. Clone repositori ini.

# 2. Install library
pip install -r requirements.txt

# 3. Jalankan notebook secara berurutan dari 01 sampai 05.
```
## 📊 Temuan Utama (Statistical Insights)

Masih dalam pengerjaan

## 🔗 Sumber Data & Metodologi

* **Repositori Target:** pandas-dev/pandas
* **Sumber Data:** GitHub REST API v3
* **Periode Data:** Data diambil hingga Mei 2026.

### Pengumpulan Data

Data dikumpulkan secara otomatis menggunakan GitHub REST API v3 dengan pendekatan time-based pagination.

Dataset terdiri dari:

* Closed Issues: 1.311 data
* Merged Pull Requests: 1.112 data

Total observasi setelah proses penggabungan dan pembersihan data:

* 2.423 record

### Data Cleaning

Tahapan pembersihan data meliputi:

1. Memisahkan data Issue dan Pull Request.
2. Memilih hanya Issue berstatus closed dan Pull Request yang telah merged.
3. Mengonversi timestamp ke format datetime.
4. Menghitung durasi penyelesaian (`duration_days`) dari selisih `closed_at` dan `created_at`.
5. Membuat variabel indikator bug (`is_bug`) berdasarkan label issue.
6. Menghapus data duplikat berdasarkan kombinasi `number` dan `type`.

Outlier tidak dihapus karena observasi dengan durasi ekstrem merupakan bagian penting dari analisis probabilitas issue berdurasi panjang pada RQ3.

### Lokasi Dataset

* Data mentah:

  * `data/raw/pandas_issues_raw.csv`
  * `data/raw/pandas_prs_raw.csv`

* Data bersih:

  * `data/clean/dataset_final.csv`


---

## 📜 Lisensi & Penggunaan AI
* Proyek ini dibuat untuk tujuan edukasi di **Universitas Negeri Jakarta**.
* Penggunaan AI (Gemini/ChatGPT) didokumentasikan secara transparan dalam file `AI_USAGE_LOG.md` sesuai dengan etika akademik STI 2025.

