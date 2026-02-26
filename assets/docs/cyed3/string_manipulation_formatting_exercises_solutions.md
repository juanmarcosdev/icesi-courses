# Workshop — Solutions

---

## Part 1 — Slicing

```python
text = "DataScience"

# 1.1
print(text[0:4])  # Data

# 1.2
print(text[4:])   # Science

# 1.3
print(text[:4])   # Data
```

---

## Part 2 — Stride

```python
word = "Programming"

# 2.1
print(word[::2])  # Pormig

# 2.2
print(word[::-1]) # gnimmargorP
```

---

## Part 3 — Case Manipulation

```python
s = "PyThOn Is FuN"

print(s.lower())       # python is fun
print(s.upper())       # PYTHON IS FUN
print(s.capitalize())  # Python is fun
```

---

## Part 4 — Splitting

```python
sentence = "Python is powerful and readable"

print(sentence.split())
print(sentence.rsplit(" ", 2))

multi = "Line1\nLine2\nLine3"
print(multi.splitlines())
```

---

## Part 5 — Joining

```python
words = ["Python", "is", "awesome"]
print(" ".join(words))  # Python is awesome
```

---

## Part 6 — Stripping

```python
text = "   hello world   "

print(text.strip())
print(text.lstrip())
print(text.rstrip())
```

---

## Part 7 — Searching

```python
text = "hello world"

print(text.find("world"))  # 6

# index()
try:
    print(text.index("python"))
except ValueError:
    print("Substring not found")

text = "This island is beautiful because it is isolated"
print(text.count("is"))  # 3
```

---

## Part 8 — replace()

```python
text = "The cat sat on the cat"

print(text.replace("cat", "dog"))
print(text.replace("cat", "dog", 1))
```

---

## Part 9 — str.format()

```python
name = "Alice"
age = 25

print("My name is {} and I am {} years old.".format(name, age))

print("My name is {1} and I am {0} years old.".format(age, name))

person = {"name": "Bob", "age": 30}
print("{name} is {age} years old.".format(**person))
```

---

## Part 10 — f-strings

```python
name = "Alice"
age = 25

print(f"My name is {name} and I am {age} years old.")

pi = 3.14159265
print(f"{pi:.2f}")  # 3.14


```

---

## Part 11 — Template Strings

```python
from string import Template

# substitute()
t = Template("Hello, $name!")
print(t.substitute(name="Charlie"))

# safe_substitute()
t2 = Template("Hello, $name! You are $age years old.")
print(t2.safe_substitute(name="Charlie"))
```