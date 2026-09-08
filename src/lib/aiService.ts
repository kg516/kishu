export interface CodeExplanation {
  overview: string;
  lineByLine: { line: number; code: string; explanation: string }[];
  concepts: string[];
  variables: { name: string; type: string; purpose: string }[];
  functions: string[];
  loops: string[];
  conditions: string[];
  expectedOutput: string;
  commonMistakes: string[];
  suggestedImprovements: string[];
}

export function generateCodeExplanation(language: string, code: string): CodeExplanation {
  const lines = code.split('\n');
  const lineByLine = lines
    .map((line, idx) => ({ line: idx + 1, code: line.trim() }))
    .filter((item) => item.code.length > 0)
    .map((item) => {
      let exp = 'Executes statement.';
      if (item.code.includes('import') || item.code.includes('#include')) {
        exp = 'Imports required system headers or standard libraries.';
      } else if (item.code.includes('def ') || item.code.includes('function ') || item.code.includes('main()')) {
        exp = 'Defines a modular function / entry point block with scoped parameters.';
      } else if (item.code.includes('for ') || item.code.includes('while ')) {
        exp = 'Initializes an iterative loop construct over a sequence or boundary condition.';
      } else if (item.code.includes('if ') || item.code.includes('elif ') || item.code.includes('else:')) {
        exp = 'Evaluates a boolean conditional branch to control program execution flow.';
      } else if (item.code.includes('print(') || item.code.includes('console.log(') || item.code.includes('printf(') || item.code.includes('std::cout')) {
        exp = 'Sends formatted character stream to the standard output terminal.';
      } else if (item.code.includes('=')) {
        exp = 'Allocates or binds an identifier to an evaluated expression or object value.';
      } else if (item.code.includes('return')) {
        exp = 'Terminates function execution and yields a result back to the caller.';
      }
      return { line: item.line, code: item.code, explanation: exp };
    });

  // Extract variables
  const variables: { name: string; type: string; purpose: string }[] = [];
  const varMatches = Array.from(code.matchAll(/(?:let|const|var|int|float|double|char|string|\b)([a-zA-Z_]\w*)\s*=\s*([^;\n]+)/g));
  for (const m of varMatches) {
    if (!['if', 'for', 'while', 'def', 'class'].includes(m[1]) && variables.length < 5) {
      variables.push({
        name: m[1],
        type: isNaN(Number(m[2])) ? 'String / Reference' : 'Numeric (Integer / Float)',
        purpose: `Holds runtime value: ${m[2].trim().slice(0, 24)}`,
      });
    }
  }

  if (variables.length === 0) {
    variables.push(
      { name: 'name / learner', type: 'String', purpose: 'Identifies the student entity' },
      { name: 'streak', type: 'Integer', purpose: 'Tracks consecutive active learning days' }
    );
  }

  return {
    overview: `This ${language.toUpperCase()} script demonstrates structured programming fundamentals including data modeling, state assignment, control flow logic, and formatted standard output.`,
    lineByLine,
    concepts: [
      `${language.toUpperCase()} syntax conventions and block scoping`,
      'Data type representation and memory allocation',
      'Standard I/O stream formatting and string interpolation',
      'Defensive error boundaries and execution flow',
    ],
    variables,
    functions: [
      `Main execution scope in ${language.toUpperCase()}`,
      'Formatted output helper procedures (printf / print / log)',
    ],
    loops: code.includes('for') || code.includes('while')
      ? ['Iterates through collection items or ranges with deterministic stopping conditions.']
      : ['No explicit loops detected; executes in linear deterministic order.'],
    conditions: code.includes('if')
      ? ['Branching logic evaluates boolean predicates to handle multiple execution states.']
      : ['Single unconditional flow from entry point to return statement.'],
    expectedOutput: `Console logs printing student details, learning hours, streak status (12 Days 🔥), and execution diagnostics.`,
    commonMistakes: [
      'Forgetting to initialize pointers or variables before referencing them in expressions.',
      'Off-by-one boundary errors when iterating with loop ranges or arrays.',
      'Unescaped special characters or mismatched quotation delimiters in strings.',
    ],
    suggestedImprovements: [
      'Encapsulate business logic inside parameterized pure functions for testability.',
      'Add type annotations or docstrings to improve maintainability and team collaboration.',
      'Implement boundary validation to handle unexpected or empty inputs gracefully.',
    ],
  };
}

export async function askEduAI(question: string, context?: { courseName?: string; code?: string }): Promise<string> {
  const q = question.toLowerCase();

  // Safeguard: Anti-cheat / direct assignment answers
  if (
    q.includes('give me the complete answer for my assignment') ||
    q.includes('solve my homework for me') ||
    q.includes('write the whole assignment')
  ) {
    return `### 🛡️ EduAI Academic Integrity Guide

I'm here to help you **learn and master** the concepts, rather than simply handing over copy-paste assignment answers!

Here is how we can break down this problem together:
1. **Understand the Goal:** What input does the problem expect, and what output should it produce?
2. **Deconstruct the Logic:** Break the requirement into small pseudo-code steps (e.g., input parsing → validation → core computation → output).
3. **Core Formula/Concept:** Focus on the underlying algorithm (such as recursion, binary search, or pointer arithmetic).

👉 Share the specific line or error you're stuck on, and I'll explain the concept step-by-step so you can write the solution with confidence!`;
  }

  // Pointer in C
  if (q.includes('pointer') && (q.includes('c') || q.includes('c++') || q.includes('memory'))) {
    return `### 🎯 What is a Pointer in C?

A **pointer** is a variable whose value is the **memory address** of another variable. Rather than storing actual data directly, it points to where that data lives in RAM.

#### 1. Visualizing Memory
Imagine a row of lockers, each with a numbered address (\`0x1000\`, \`0x1004\`, etc.).
- Normal variable (\`int x = 25\`): Stores the value \`25\` inside locker \`0x1000\`.
- Pointer variable (\`int *ptr = &x\`): Stores the locker number \`0x1000\`.

#### 2. Key Operators
* **Address-Of Operator (\`&\`):** Gets the memory address of a variable.
* **Dereference Operator (\`*\`):** Accesses or modifies the value located at the address stored in the pointer.

#### 3. Code Example
\`\`\`c
#include <stdio.h>

int main() {
    int score = 95;
    int *ptr = &score; // ptr holds address of score

    printf("Value of score: %d\\n", score);        // Output: 95
    printf("Address of score: %p\\n", &score);     // Output: 0x7ffd...
    printf("Value via pointer: %d\\n", *ptr);      // Output: 95 (dereference)

    // Modifying value via pointer
    *ptr = 100;
    printf("Updated score: %d\\n", score);         // Output: 100
    return 0;
}
\`\`\`

#### 💡 Why are pointers essential in C?
1. **Dynamic Memory Allocation:** Used with \`malloc()\` and \`free()\` on the heap.
2. **Efficient Parameter Passing:** Pass large structs by reference without copying gigabytes of data.
3. **Building Data Structures:** Essential for Linked Lists, Trees, and Graphs.`;
  }

  // Python Function
  if (q.includes('function') && q.includes('python')) {
    return `### 🐍 What is a Python Function?

A **function** in Python is an organized, reusable block of code designed to perform a single, related action. Functions provide higher modularity and code reuse.

#### 1. Anatomy of a Python Function
\`\`\`python
def function_name(parameters):
    """Optional docstring describing what the function does."""
    # Function body
    return result
\`\`\`

#### 2. Practical Example: Streak Calculator
\`\`\`python
def calculate_learning_status(student_name, streak_days):
    """Evaluates student motivation tier based on active streak."""
    if streak_days >= 30:
        badge = "🏆 Legend"
    elif streak_days >= 7:
        badge = "🔥 Consistent Achiever"
    else:
        badge = "🌱 Starter"
    
    return f"{student_name} is currently a {badge} ({streak_days} days active)."

# Calling the function
print(calculate_learning_status("Rahul Sharma", 12))
# Output: Rahul Sharma is currently a 🔥 Consistent Achiever (12 days active).
\`\`\`

#### 💡 Key Concepts:
* **Default Arguments:** \`def greet(name="Student"):\`
* **Multiple Return Values:** Functions can return tuples \`return min_val, max_val\`
* **First-Class Citizens:** In Python, functions can be assigned to variables, passed as arguments, and returned from other functions.`;
  }

  // BFS vs DFS
  if (q.includes('bfs') || q.includes('dfs') || (q.includes('breadth') && q.includes('depth'))) {
    return `### 🌳 Difference Between BFS and DFS

Both **Breadth-First Search (BFS)** and **Depth-First Search (DFS)** are fundamental graph and tree traversal algorithms.

| Feature | BFS (Breadth-First) | DFS (Depth-First) |
| :--- | :--- | :--- |
| **Strategy** | Explores neighbor-by-neighbor (level by level) | Explores as deep as possible along each branch before backtracking |
| **Data Structure** | **Queue** (FIFO) | **Stack** (LIFO) or Call Stack (Recursion) |
| **Shortest Path** | Guarantees shortest path in unweighted graphs | Does not guarantee shortest path |
| **Memory Consumption** | Higher ($O(W)$ where $W$ is width of graph) | Lower ($O(D)$ where $D$ is depth/height) |
| **Best Used For** | Finding closest nodes, GPS routing, peer-to-peer networks | Maze solving, topological sorting, cycle detection, puzzle games |

#### Quick Code Intuition
* **BFS:** Push root to queue $\rightarrow$ while queue not empty, pop node, visit all unvisited neighbors, push them to queue.
* **DFS:** Visit node $\rightarrow$ recursively call DFS on each unvisited neighbor.`;
  }

  // Streak question
  if (q.includes('streak') || q.includes('12-day') || q.includes('momentum')) {
    return `### 🔥 How to Grow & Protect Your 12-Day Streak

Congratulations on your **12-Day Learning Streak**, Rahul! That puts you in the top **5% of consistent learners** on SmartEdu!

#### Smart Streak Rules on SmartEdu:
1. **Meaningful Activity Counts:** Simply logging in doesn't increment your streak! The platform rewards real cognitive effort:
   * Completing a lesson reading
   * Submitting a quiz attempt
   * Executing code in the interactive playground
   * Submitting an assignment
2. **Best Daily Habit:**
   * Spend **15-20 focused minutes** each day rather than cramming 5 hours once a week.
   * Tackle 1 concept explanation + 1 code challenge.
3. **Your Next Milestone:**
   * Reach **14 days (2 weeks)** to unlock the *Bi-Weekly Consistency Badge*!
   * Reach **30 days** to earn the prestigious *30-Day Legend Streak* trophy. 🚀`;
  }

  // Recursion
  if (q.includes('recursion')) {
    return `### 🔄 Understanding Recursion with an Example

**Recursion** is a programming technique where a function solves a problem by calling a smaller instance of itself until it reaches a **Base Case**.

#### The Two Golden Rules of Recursion:
1. **Base Case:** The condition where the function stops calling itself (prevents infinite loop / stack overflow).
2. **Recursive Step:** The logic where the function calls itself with a reduced sub-problem.

#### Classic Example: Factorial ($N!$)
$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$

\`\`\`python
def factorial(n):
    # 1. Base Case
    if n <= 1:
        return 1
    
    # 2. Recursive Step
    return n * factorial(n - 1)

print(factorial(5)) # Output: 120
\`\`\`

#### Call Stack Visualization
\`\`\`text
factorial(5)
  = 5 * factorial(4)
          = 4 * factorial(3)
                  = 3 * factorial(2)
                          = 2 * factorial(1) -> returns 1
\`\`\``;
  }

  // SQL vs NoSQL
  if (q.includes('sql') || q.includes('nosql') || q.includes('database')) {
    return `### 🗄️ SQL vs NoSQL Databases

| Metric | Relational (SQL) | Non-Relational (NoSQL) |
| :--- | :--- | :--- |
| **Data Model** | Tables with predefined schemas, rows & columns | Documents (JSON), Key-Value, Graphs, or Wide-Column |
| **Schema** | Rigid / Strict schema | Dynamic / Flexible schema |
| **Scaling** | Vertical (scale up CPU/RAM) | Horizontal (scale out across clusters) |
| **Transactions** | ACID compliant (Atomicity, Consistency, Isolation, Durability) | BASE model (Eventual consistency) |
| **Examples** | PostgreSQL, MySQL, SQLite | MongoDB, Redis, Cassandra, DynamoDB |

#### When to use what?
* **Use SQL:** When data integrity, complex relational joins, and strict transactions are critical (e.g., Banking, SmartEdu student grades, eCommerce payments).
* **Use NoSQL:** When dealing with rapidly changing unstructured data, real-time caching, or massive global scale (e.g., Social feeds, chat message streams).`;
  }

  // General Fallback
  return `### 🎓 EduAI Guidance for "${question}"

Here is a clear, structured explanation:

1. **Concept Overview:**
   In modern computer science and digital education, this topic represents a foundational building block for problem solving, computational thinking, and software architecture.

2. **Core Principles:**
   * Break the problem into decoupled, modular components.
   * Identify inputs, boundary constraints, and desired outputs.
   * Apply appropriate data structures to optimize time ($O$) and space ($S$) complexity.

3. **Recommended Next Step on SmartEdu:**
   * Check out the **Interactive Code Playground** to test this concept with live syntax.
   * Take the relevant module quiz to validate your understanding!

Feel free to ask a follow-up question or request a code example in Python, C, or Java!`;
}
