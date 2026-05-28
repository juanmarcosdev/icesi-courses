# Follow-Up 5 — Machine Learning: Predicting High Tips in NYC Yellow Taxi Trips

---

## 📋 Overview

In this follow-up, you will build and compare **four deep learning models** to predict whether a NYC Yellow Taxi trip received a **high tip** (≥ 20% of the fare). You will work with the full **2025 Yellow Taxi Trip Records** in Parquet format, perform exploratory data analysis, engineer a target variable, and benchmark DNN, RNN, LSTM, and Transformer models using standard classification metrics.

---

## 📅 Deadline

**Monday, June 1, 2026 — 11:59 PM COT (Colombian Time)**

---

## 🔗 GitHub Classroom

Submit your work here:

> 🚀 **[Accept Assignment on GitHub Classroom](https://classroom.github.com/a/-cQrh6zT)**

---

## 📂 Data Source

Download the **Yellow Taxi Trip Records** for **all months of 2025** in **Parquet format** from the NYC Taxi & Limousine Commission official data portal:

> 🗂️ **[NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)**

On that page, locate the **Yellow Taxi** section, select each month of **2025**, and download the `.parquet` files.

---

## 🧩 Tasks

### 1 — Load Parquet Files into a DataFrame

Read and load **all 12 months** of 2025 Yellow Taxi data from Parquet format into a single Pandas DataFrame.

> 💡 **Research:** Investigate how to read Parquet files in Python using `pandas` or `pyarrow`, and how to concatenate multiple files into a single DataFrame.


---

### 2 — Engineer the Target Column: `high_tip`

Add a new binary column called **`high_tip`** to your DataFrame. A trip is classified as high tip (`1`) if the tip amount is **20% or more** of the fare amount; otherwise it is `0`.

> 💡 **Research:** Investigate how to add a new derived column to a Pandas DataFrame using conditional logic (e.g., `.apply()`, `np.where()`, or vectorized boolean expressions).

**Definition:**

\[
\text{high\_tip} = \begin{cases} 1 & \text{if } \frac{\text{tip\_amount}}{\text{fare\_amount}} \geq 0.20 \\ 0 & \text{otherwise} \end{cases}
\]

> ⚠️ Be careful with rows where `fare_amount` is zero or negative — handle them before dividing.

---

### 3 — Exploratory Data Analysis (EDA)

Before modeling, thoroughly explore and understand the data. Your EDA should include at minimum:

- **Shape and data types** — how many rows and columns; what are the types?
- **Missing values** — which columns have nulls? What percentage?
- **Descriptive statistics** — mean, median, std, min/max for numerical columns
- **Target variable distribution** — class balance of `high_tip`
- **Correlation analysis** — heatmap of numerical features
- **Key distributions** — histograms or KDE plots for `fare_amount`, `tip_amount`, `trip_distance`, `passenger_count`
- **Outlier detection** — boxplots and IQR-based analysis
- **Temporal patterns** — tip behavior across hours of the day, days of the week, and months


---

### 4 — Modeling

Train and evaluate **four deep learning models** to predict `high_tip`. Split your data into **80% training / 20% testing**.

> 💡 Use `GridSearchCV` (or `KerasClassifier` wrappers for deep learning models) to search for optimal hyperparameters.

#### Models to Implement

| Model | Description |
|---|---|
| **DNN** | Dense Neural Network — fully connected layers |
| **RNN** | Recurrent Neural Network — captures sequential dependencies |
| **LSTM** | Long Short-Term Memory — handles long-range temporal patterns |
| **Transformer** | Attention-based architecture — parallel sequence modeling |


---

### 5 — Evaluation Metrics

Evaluate each model on the **test set** using the following metrics:

| Metric | Description |
|---|---|
| **Accuracy** | Proportion of all correct predictions |
| **Precision** | Of predicted positives, how many are truly positive? |
| **Recall** | Of all actual positives, how many did the model find? |
| **F1-Score** | Harmonic mean of Precision and Recall |
| **Cohen's Kappa** | Agreement between predictions and ground truth, correcting for chance |

> 💡 **Research:** Investigate `sklearn.metrics.cohen_kappa_score` for Kappa computation.


---

### 6 — Final Report

After completing the modeling, write a **report in English** (Markdown or PDF) that:

- Presents a **comparison table** of all four models across all five metrics
- Identifies the **best model** and explains **why**, based on metric analysis
- Reports the **optimal hyperparameters** found by `GridSearchCV` for the winning model
- Discusses **trade-offs** (e.g., a model with high recall but lower precision vs. vice versa)
- Provides a **brief interpretation** of the Cohen's Kappa score for each model

#### Example Comparison Table

| Model | Accuracy | Precision | Recall | F1-Score | Kappa |
|---|---|---|---|---|---|
| DNN | — | — | — | — | — |
| RNN | — | — | — | — | — |
| LSTM | — | — | — | — | — |
| Transformer | — | — | — | — | — |


---

## 📚 Key Concepts to Research

- Reading Parquet files with `pandas.read_parquet()` and `pyarrow`
- Adding derived columns with `np.where()` or `.apply()`
- Class imbalance handling (SMOTE, class weights)
- `scikeras` for wrapping Keras models in scikit-learn pipelines
- `GridSearchCV` with deep learning models
- Cohen's Kappa Score (`sklearn.metrics.cohen_kappa_score`)
- Building Transformer models for tabular classification in Keras/PyTorch

---

## ✅ Submission Checklist

- [ ] All 12 months of 2025 Yellow Taxi data loaded into a single DataFrame
- [ ] `high_tip` column correctly computed and added
- [ ] EDA with visualizations and written observations
- [ ] Four models implemented: DNN, RNN, LSTM, Transformer
- [ ] `GridSearchCV` used for hyperparameter tuning on each model
- [ ] Metrics computed: Accuracy, Precision, Recall, F1-Score, Cohen's Kappa
- [ ] Final comparison report in Markdown or PDF (in English)
- [ ] Repository pushed to GitHub Classroom before the deadline

---

*Follow-Up 5 — Machine Learning | Deadline: June 1, 2026, 11:59 PM COT*
