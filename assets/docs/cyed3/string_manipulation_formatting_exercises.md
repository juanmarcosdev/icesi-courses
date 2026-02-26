# Workshop — Python String Manipulation & Formatting

This workshop covers slicing, stride, case manipulation, splitting, joining, searching, replacing, and string formatting techniques in Python.

---

## Part 1 — Slicing

### 1.1 Slicing with both indices

Given:

```python
text = "DataScience"
```

Extract the substring `"Data"` using slicing with both start and end indices.

---

### 1.2 Slicing with only the first index

Using the same string:

Extract `"Science"` using slicing with only the starting index.

---

### 1.3 Slicing with only the last index

Extract `"Data"` using slicing with only the ending index.

---

## Part 2 — Stride

### 2.1 Skipping characters

Given:

```python
word = "Programming"
```

Extract every two characters.

---

### 2.2 Reverse a string

Reverse `"Programming"` using slicing.

---

## Part 3 — Case Manipulation

### 3.1 lower()

Convert the following string to lowercase:

```python
s = "PyThOn Is FuN"
```

---

### 3.2 upper()

Convert the same string to uppercase.

---

### 3.3 capitalize()

Capitalize only the first letter of the string.

---

## Part 4 — Splitting

### 4.1 split()

Given:

```python
sentence = "Python is powerful and readable"
```

Split the sentence into words.

---

### 4.2 rsplit()

Split the same sentence from the right, limiting the split to 2 splits.

---

### 4.3 splitlines()

Given:

```python
multi = "Line1\nLine2\nLine3"
```

Split it into separate lines.

---

## Part 5 — Joining

### 5.1 join()

Given:

```python
words = ["Python", "is", "awesome"]
```

Join them into a sentence separated by spaces.

---

## Part 6 — Stripping

### 6.1 strip()

Remove leading and trailing spaces from:

```python
text = "   hello world   "
```

---

### 6.2 lstrip()

Remove only leading spaces.

---

### 6.3 rstrip()

Remove only trailing spaces.

---

## Part 7 — Searching

### 7.1 find()

Find the position of `"world"` in:

```python
text = "hello world"
```

---

### 7.2 index()

Try to find `"python"` in `"hello world"` using `index()`.  
What happens?

---

### 7.3 count()

Count how many times `"is"` appears in:

```python
text = "This island is beautiful because it is isolated"
```

---

## Part 8 — replace()

### 8.1 replace() with 2 arguments

Replace `"cat"` with `"dog"` in:

```python
text = "The cat sat on the cat"
```

---

### 8.2 replace() with 3 arguments

Replace only the first occurrence of `"cat"`.

---

## Part 9 — str.format()

### 9.1 Basic placeholders

Create the sentence:

```
My name is Alice and I am 25 years old.
```

Using:

```python
name = "Alice"
age = 25
```

---

### 9.2 Positional formatting

Reorder the variables using positional placeholders.

---

### 9.3 Dictionary formatting

Given:

```python
person = {"name": "Bob", "age": 30}
```

Use `str.format()` with dictionary unpacking to build:

```
Bob is 30 years old.
```

---

## Part 10 — f-strings

### 10.1 Basic f-string

Rewrite the sentence from 9.1 using f-strings.

---

### 10.2 Type formatting

Format the number:

```python
pi = 3.14159265
```

So it prints with 2 decimal places.

---


## Part 11 — Template Strings

Import `Template` from `string`.

### 11.1 substitute()

Create a template:

```
Hello, $name!
```

Replace `$name` with `"Charlie"`.

---

### 11.2 safe_substitute()

Create a template with `$name` and `$age`, but only provide `$name`.  
Use `safe_substitute()` and observe the result.