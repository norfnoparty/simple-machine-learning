import numpy as np

def mle_bernoulli(data):
    r"""
    Menghitung Maximum Likelihood Estimation (MLE) untuk distribusi Bernoulli.
    Digunakan pada RQ1 untuk mengestimasi probabilitas (θ) sebuah issue bug 
    dapat diselesaikan dalam waktu cepat (<= 7 hari).
    
    Formula:
        \hat{\theta} = k / n
        di mana k = jumlah bug selesai <= 7 hari (sukses) dan n = total sampel issue bug.
        
    Referensi:
        Tsun (2020), Halaman 254
        
    Parameters:
        data (list or np.ndarray): Array biner (1 jika durasi <= 7 hari, 0 jika > 7 hari).
        
    Returns:
        float: Nilai estimasi parameter theta (θ).
    """
    n = len(data)
    if n == 0:
        return 0.0
    k = np.sum(data)
    return float(k / n)

def mle_poisson(data):
    r"""
    Menghitung Maximum Likelihood Estimation (MLE) untuk distribusi Poisson.
    Digunakan pada RQ2 untuk mengestimasi rata-rata laju (λ) penyelesaian issue bug per minggu.
    
    Formula:
        \hat{\lambda} = \frac{1}{n} \sum_{i=1}^{n} x_i
        di mana \sum x_i = total bug yang diselesaikan dan n = total minggu pengamatan.
        
    Referensi:
        Tsun (2020), Halaman 254
        
    Parameters:
        data (list or np.ndarray): Array berisi jumlah frekuensi bug yang selesai per minggu.
        
    Returns:
        float: Nilai estimasi parameter lambda (λ).
    """
    n = len(data)
    if n == 0:
        return 0.0
    total_resolved = np.sum(data)
    return float(total_resolved / n)

def beta_posterior(k, m):
    r"""
    Menghitung parameter bentuk (α, β) untuk distribusi Beta Posterior berdasarkan 
    pendekatan Bayesian (prior seragam Beta(1,1)) untuk mengukur ketidakpastian probabilitas RQ1.
    
    Formula:
        \alpha = k + 1
        \beta = m + 1
        Mode = (\alpha - 1) / (\alpha + \beta - 2)
        Mean = \alpha / (\alpha + \beta)
        di mana k = jumlah bug selesai <= 7 hari, m = jumlah bug selesai > 7 hari.
        
    Referensi:
        Tsun (2020), Halaman 269
        
    Parameters:
        k (int): Jumlah issue bug yang selesai cepat (<= 7 hari).
        m (int): Jumlah issue bug yang selesai lama (> 7 hari).
        
    Returns:
        dict: Kamus berisi nilai 'alpha', 'beta', 'mode', dan 'mean'.
    """
    alpha = int(k + 1)
    beta = int(m + 1)
    
    # Perhitungan Mode dan Mean sesuai aturan formal buku Tsun (2020)
    mode = float((alpha - 1) / (alpha + beta - 2)) if (alpha + beta > 2) else 0.5
    mean = float(alpha / (alpha + beta))
    
    return {
        "alpha": alpha,
        "beta": beta,
        "mode": mode,
        "mean": mean
    }

def log_likelihood_bernoulli(theta, k, n):
    r"""
    Menghitung nilai log-likelihood distribusi Bernoulli untuk parameter theta (RQ1).
    
    Formula:
        \ln L(\theta) = k \ln(\theta) + (n - k) \ln(1 - \theta)
    
    Referensi:
        Tsun (2020), Halaman 254
    """
    theta = np.clip(theta, 1e-10, 1.0 - 1e-10)
    return k * np.log(theta) + (n - k) * np.log(1.0 - theta)

def log_likelihood_poisson(theta, data):
    r"""
    Menghitung nilai log-likelihood distribusi Poisson untuk parameter lambda (RQ2).
    
    Formula:
        \ln L(\lambda) = -n\lambda + \ln(\lambda) \sum_{i=1}^{n} x_i - \sum_{i=1}^{n} \ln(x_i!)
        
    Referensi:
        Tsun (2020), Halaman 254
    """
    n = len(data)
    sum_x = np.sum(data)
    theta = np.clip(theta, 1e-10, None)
    return -n * theta + np.log(theta) * sum_x