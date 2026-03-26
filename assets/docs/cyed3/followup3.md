# Follow-Up 3 — Resources


This page contains all the files you need to complete Follow-Up 3.


***


## 📄 Statement


The full problem statement is available as a PDF:


> 📥 **[Download seg3.pdf](https://raw.githubusercontent.com/juanmarcosdev/icesi-courses/main/assets/docs/cyed3/seg3.pdf)**


***


## 🐍 Verification


Once you have built your FST in \`pyformlang\`, use the following snippet
to collect and print all outputs.
Your result must contain **exactly** the five expected strings — no more, no less:


\`\`\`python
results = list(map(lambda x: "".join(x), list(fst.translate('musica'))))
print(results)
# Expected (any order):
# ['music', 'musique', 'musik', 'musiek', 'musikk']
\`\`\`


***


DELIVER TO GITHUB CLASSROOM: [https://classroom.github.com/a/sfWhmEb1](https://classroom.github.com/a/sfWhmEb1)