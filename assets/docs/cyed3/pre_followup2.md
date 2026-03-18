## Computing and Discrete Structures III

### Assessment (Pre-follow up 2): Finite Automata

***

## Objectives

**Unit 1 — Regular Languages and Finite Automata**

- Formally define the different types of finite automata (deterministic,
  non-deterministic, non-deterministic with lambda transitions, transducers),
  provide examples, identify their components, and understand their applications.

- Understand and apply the notions of regular languages and regular expressions,
  as well as finite state automata, for pattern recognition, processing,
  validation, and text extraction using a programming language.

***

## Problem Statement

You are given an Excel file `transacciones.xls` containing 100 transactions.
Each transaction has the following columns: `consecutivo`, `identificador`,
`fecha`, `valor`, `banco`, and `medio`.

> 📥 **[Download transacciones.xls](https://raw.githubusercontent.com/juanmarcosdev/icesi-courses/main/assets/docs/cyed3/transacciones.xls)**

As a first step, load the file into a **pandas DataFrame**. From that DataFrame
you must generate three separate DataFrames named `taxes`, `public_services`,
and `shopping`. Each one is obtained by using a **finite automaton as a filter**
over the `identificador` column.

The `identificador` column is the key field — it encodes the type of transaction
(taxes, public services, or shopping).

***

## Filter Specifications

### 1. Taxes — `taxes`
**Required automaton: Deterministic Finite Automaton (DFA)**

The identifier starts with `im` or `tx` (uppercase, lowercase, or any
combination), followed by three consecutive zeros, then one non-zero digit
`[1-9]`, then five digits `[0-9]`, and ends with `z` (uppercase or lowercase).

**Pattern:** `(im|tx)(case-insensitive)` + `000` + `[1-9]` + `[0-9]{5}` + `(z|Z)`

> Example: `Im000312345z`, `TX0007654321Z`

***

### 2. Public Services — `public_services`
**Required automaton: Non-deterministic Finite Automaton (NFA)**
*(at least one state must have two transitions on the same symbol)*

The identifier starts with `s` (uppercase or lowercase), followed by the
string `11` or `10`, then the string `22` or `33`, then 6 digits `[0-9]`,
and ends with `s` (uppercase or lowercase).

**Pattern:** `(s|S)` + `(11|10)` + `(22|33)` + `[0-9]{6}` + `(s|S)`

> Example: `s1122456789s`, `S1033001122S`

***

### 3. Shopping — `shopping`
**Required automaton: Non-deterministic Finite Automaton with Lambda Transitions (NFA-ε)**
*(at least two epsilon transitions must be used)*

The identifier starts with `c` (uppercase or lowercase) **or** the string
`shp` (uppercase, lowercase, or any combination), followed by one special
character (`-`, `/`, or `:`), then two zeros, one non-zero digit `[1-9]`,
then eight digits `[0-9]`, and ends with uppercase `Y`.

**Pattern:** `(c|C|shp-variants)` + `(-|/|:)` + `00` + `[1-9]` + `[0-9]{8}` + `Y`

> Example: `c-00234567890Y`, `SHp:00987654321Y`

***

## Deliverables

- **Diagrams** of the three automata (DFA, NFA, NFA-ε).
- **Google Colab notebook** with the implementation of the three automata
  using `pyformlang` and the resulting filtered DataFrames.