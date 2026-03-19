# Follow-Up 2 — Resources

This page contains all the files you need to complete Follow-Up 2.

***

## 📄 Statement

The full problem statement is available as a PDF:

> 📥 **[Download seg2.pdf](https://raw.githubusercontent.com/juanmarcosdev/icesi-courses/main/assets/docs/cyed3/seg2.pdf)**

Or open it directly in the course site:

> 🌐 **[Open in Course Site](https://juanmarcosdev.github.io/icesi-courses/#curso-cyed3/0/6/0)**

***

## 🗂️ Dataset

The dataset required for Point 2 is:

> 📥 **[Download library_transactions.csv](https://raw.githubusercontent.com/juanmarcosdev/icesi-courses/main/assets/docs/cyed3/library_transactions.csv)**

The file contains 150 transaction records with the following columns:
`transaction_id`, `student_id`, `timestamp`, `item_title`, `action`.

Once downloaded, upload it to your Colab notebook:

```python
from google.colab import files
uploaded = files.upload()   # select library_transactions.csv
```

DELIVER TO GITHUB CLASSROOM: https://classroom.github.com/a/HllT0fzg

```python
def filter_df(df, automaton):
    mask = df['identificador'].apply(
        lambda x: automaton.accepts(list(str(x).strip()))
    )
    return df[mask].reset_index(drop=True)

taxes           = filter_df(df, dfa_taxes)
public_services = filter_df(df, nfa_serv)
shopping        = filter_df(df, nfa_shop)

print(f"taxes          : {len(taxes)} rows")
print(f"public_services: {len(public_services)} rows")
print(f"shopping       : {len(shopping)} rows")
total = len(taxes) + len(public_services) + len(shopping)
print(f"Unclassified   : {len(df) - total} rows")
```
