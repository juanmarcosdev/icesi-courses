# Interactive Workshop — Regular Expressions (Regex) in Python (`re`)


This is an **interactive workshop** focused on learning how to search, extract, split, and transform text using **regular expressions** (regex) with Python’s built-in `re` module.


You’ll practice:


- What a regular expression is (pattern vs text)
- Metacharacters: `\d`, `\w`, `\s`, and their opposites `\D`, `\W`, `\S`
- Core functions: `findall`, `split`, `sub`
- Quantifiers: `*`, `+`, `?`, `{min,max}`
- `search` vs `match` (and when to use each)
- Special characters: `^`, `$`, and escaping with `\`
- OR with `|` and character classes: `[]`, `[a-zA-Z]`, `[0-9]`, `[#\"&!]`, etc.
- Negation inside classes: `[^ ... ]`
- Greedy vs non-greedy (lazy) matching: `*` vs `*?`, `+` vs `+?`


The workshop includes guided examples, runnable cells, and end-to-end exercises that combine all concepts.


---


## Open the Interactive Workshop in Google Colab


Click the image below to open the workshop in Google Colab and start coding:


[![Open in Google Colab](https://algotrading101.com/learn/wp-content/uploads/2021/05/Google-Colab-Guide-e1620759490851.jpg)](https://colab.research.google.com/drive/1P0OZX9_GrwXYyOQyAov_iduWdqVACpoE?usp=sharing)


---


### What You’ll Do in This Workshop


- Detect patterns like dates, times, usernames, emails, IPs, and prices using regex
- Extract matches with `re.findall()` (including repeated patterns and token capture)
- Split messy text into clean tokens with `re.split()`
- Sanitize or mask sensitive data with `re.sub()` (e.g., replace IPs with `<IP>`)
- Compare:
  - `re.match()` (checks only at the beginning)
  - `re.search()` (finds the first match anywhere)
- Build patterns using:
  - Quantifiers (`\d+`, `\w{3,8}`, optional parts with `?`)
  - Anchors (`^...$`) to validate an entire line
  - Alternatives (`login|logout`, `OK|FAIL`)
  - Character classes (`[a-zA-Z]`, `[0-9]`, and custom symbol sets)
  - Negated classes (`[^0-9]`) to match “anything except…”
- Understand and fix “too much matching” with **greedy vs non-greedy** quantifiers
  - Example: `"<.*>"` vs `"<.*?>"` when extracting tags


---


Open the notebook, run the cells, modify the patterns, and observe how the output changes.

Happy coding!
