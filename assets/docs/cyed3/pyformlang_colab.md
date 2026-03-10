# Interactive Workshop — Finite Automata with Pyformlang in Python


This is an **interactive workshop** focused on mastering finite automata theory using the **Pyformlang** library:


- What is Pyformlang and what it is used for
- The `State` and `Symbol` classes
- Building and querying a `DeterministicFiniteAutomaton` (DFA)
- Building and querying a `NondeterministicFiniteAutomaton` (NFA)
- Working with `EpsilonNFA` and epsilon transitions
- Converting between automata (NFA → DFA, ε-NFA → NFA → DFA)
- Set operations: intersection, complement, difference, reverse
- Minimization and equivalence checking
- Exporting automata to regular expressions and NetworkX graphs


The workshop includes guided exercises, live code execution, and examples you can modify and experiment with directly.


---


## 🚀 Open the Interactive Workshop in Google Colab


Click the image below to open the workshop in Google Colab and start coding:


[![Open in Google Colab](https://algotrading101.com/learn/wp-content/uploads/2021/05/Google-Colab-Guide-e1620759490851.jpg)](https://drive.google.com/file/d/1KgMC6qf-aW41ItjqKZT6ng-hLLq2ZZvR/view?usp=sharing)


---


### What You'll Do in This Workshop


- Create and configure `State` and `Symbol` objects  
- Build a DFA from scratch and test word acceptance with `accepts()`  
- Observe how non-determinism works in an NFA with multiple transitions per symbol  
- Add epsilon transitions to an `EpsilonNFA` and compute ε-closures  
- Convert automata across types:
  - NFA → DFA via subset construction
  - ε-NFA → NFA via `remove_epsilon_transitions()`
  - Any automaton → minimal DFA via `minimize()`
- Check language equivalence with `is_equivalent_to()`  
- Perform language operations: intersection, complement, difference, and reverse  
- Export any automaton to a regular expression using `to_regex()`  
- Visualize automata as graphs using the NetworkX integration  


---


Open the notebook, run the cells, modify the examples, and explore how each type of automaton behaves.


Happy coding!
