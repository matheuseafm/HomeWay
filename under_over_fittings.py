import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

# Dados simulados
np.random.seed(0)
x = np.sort(5 * np.random.rand(80, 1), axis=0)
y = np.sin(x).ravel() + np.random.normal(0, 0.2, x.shape[0])

# Conjunto de teste
x_test = np.linspace(0, 5, 100).reshape(-1, 1)
y_true = np.sin(x_test).ravel()

# Modelos: subajuste (grau 1), ideal (grau 4), sobreajuste (grau 15)
models = [
    ("Underfitting (grau 1)", make_pipeline(PolynomialFeatures(1), LinearRegression())),
    ("Bom ajuste (grau 4)", make_pipeline(PolynomialFeatures(4), LinearRegression())),
    ("Overfitting (grau 15)", make_pipeline(PolynomialFeatures(15), LinearRegression()))
]

# Plotagem
plt.figure(figsize=(15, 4))

for i, (title, model) in enumerate(models, 1):
    model.fit(x, y)
    y_pred = model.predict(x_test)
    
    plt.subplot(1, 3, i)
    plt.scatter(x, y, color='black', label='Dados de treino')
    plt.plot(x_test, y_true, color='green', linestyle='dashed', label='Função real')
    plt.plot(x_test, y_pred, color='red', label='Modelo')
    plt.title(title)
    plt.xlabel("x")
    plt.ylabel("y")
    plt.legend()

plt.tight_layout()
plt.show()
