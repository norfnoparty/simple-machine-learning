import scipy.stats as stats
import numpy as np

def confidence_interval(theta_hat, sigma, n, confidence=0.95):
    """
    digunakan untuk menghitung rentang confidence interval dasar.

    Formula: theta_hat ± z * sigma / sqrt(n) (Tsun, 2020, hal. 300)
    """
    alpha = 1 - confidence
    
    # Menghitung z-score menggunakan distribusi normal
    z = stats.norm.ppf(1 - alpha / 2)
    
    margin_of_error = z * (sigma / np.sqrt(n))
    return theta_hat - margin_of_error, theta_hat + margin_of_error

def ci_bernoulli(k, n, confidence=0.95):
    """
    Confidence interval untuk variabel sukses/tidak (contohnya status PR di-merge/closed).
    """
    theta_hat = k / n
    sigma = np.sqrt(theta_hat * (1 - theta_hat))
    return confidence_interval(theta_hat, sigma, n, confidence)

def ci_poisson(lambda_hat, n, confidence=0.95):
    """
    Confidence interval untuk data frekuensi (contohnya jumlah issue baru per hari).
    """
    theta_hat = lambda_hat
    sigma = np.sqrt(lambda_hat)
    # Pada distribusi pooisson, varians sama dengan mean

    sigma = np.sqrt(theta_hat)
    return confidence_interval(theta_hat, sigma, n, confidence)

def credible_interval(alpha, beta, confidence=0.95):
    """
    Credible interval berdasarkan distribusi beta posterior.
    """
    tail = (1 - confidence) / 2
    lower = stats.beta.ppf(tail, alpha, beta)
    upper = stats.beta.ppf(1 - tail, alpha, beta)
    return lower, upper 