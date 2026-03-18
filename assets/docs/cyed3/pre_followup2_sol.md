```markdown
# Solution Notebook — Finite Automata with pyformlang

This notebook presents the **complete solution** to the pre-follow-up assessment
on finite automata, where three automata are built using `pyformlang` to filter
transactions from a real dataset:

- A **Deterministic Finite Automaton (DFA)** to identify tax transactions
- A **Non-deterministic Finite Automaton (NFA)** to identify public service transactions
- A **Non-deterministic Finite Automaton with epsilon transitions (NFA-ε)** to identify shopping transactions

Each automaton is applied as a filter over the `identificador` column of a
pandas DataFrame loaded from `transacciones.xlsx`, producing three separate
DataFrames: `taxes`, `public_services`, and `shopping`.

***

## 🚀 Open the Solution Notebook in Google Colab

Click the badge below to open and run the notebook:

<a href="https://colab.research.google.com/drive/1ex0qdVfI-kObaSWkM6AO7qMthqKPtuJ3?usp=sharing">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab" style="height: 40px;">
</a>

***

### What the Notebook Covers

- Loading `transacciones.xlsx` into a pandas DataFrame
- Building a **DFA** for the tax identifier pattern using `DeterministicFiniteAutomaton`
- Building an **NFA** for public services with intentional non-determinism on a shared symbol
- Building an **NFA-ε** for shopping using two epsilon transitions from the start state
- Validating each automaton with positive and negative test cases
- Filtering the original DataFrame with each automaton to produce the three result DataFrames

***

> 📥 **[Download transacciones.xls](/assets/cyed3/transacciones.xls)**
> — required to run the notebook locally or upload it to Colab.
```
