exports.id=724,exports.ids=[724],exports.modules={2135:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,8700,23)),Promise.resolve().then(s.t.bind(s,2695,23)),Promise.resolve().then(s.t.bind(s,4460,23)),Promise.resolve().then(s.t.bind(s,9770,23)),Promise.resolve().then(s.t.bind(s,8569,23)),Promise.resolve().then(s.t.bind(s,8777,23))},455:(e,t,s)=>{Promise.resolve().then(s.bind(s,327))},327:(e,t,s)=>{"use strict";s.d(t,{EduAIAssistant:()=>p});var n=s(6561),a=s(7756),i=s(4357),r=s(6779),o=s(2130),l=s(6788),c=s(7218),d=s(6855),u=s(6768),m=s(1138),h=s(9392);let p=({currentCourseContext:e,defaultOpen:t=!1})=>{let[s,p]=(0,a.useState)(t),[g,x]=(0,a.useState)(!1),[f,b]=(0,a.useState)(""),[y,w]=(0,a.useState)(!1),[v,S]=(0,a.useState)([{id:"welcome-init",sender:"assistant",text:`Hello Rahul! 👋 I'm **EduAI**, your smart educational mentor.

I can explain complex coding concepts, debug your code snippets, walk you through math/CS algorithms step-by-step, or quiz you before an exam.

**Suggested topics to explore right now:**`,timestamp:"Just now",suggestions:["What is a pointer in C?","What is a Python function?","Difference between BFS and DFS","How to protect my 12-day streak?"]}]),j=(0,a.useRef)(null),k=()=>{j.current?.scrollIntoView({behavior:"smooth"})};(0,a.useEffect)(()=>{s&&!g&&k()},[v,s,g]);let N=async t=>{let s=(t||f).trim();if(!s||y)return;let n={id:`user-${Date.now()}`,sender:"user",text:s,timestamp:"Just now"};S(e=>[...e,n]),b(""),w(!0);try{let t=await (0,h.G)(s,{courseName:e}),n={id:`ai-${Date.now()}`,sender:"assistant",text:t,timestamp:"Just now"};S(e=>[...e,n])}catch(e){console.error(e),S(e=>[...e,{id:`ai-err-${Date.now()}`,sender:"assistant",text:"I encountered a minor network glitch, but I'm ready to help. Please rephrase or try again!",timestamp:"Just now"}])}finally{w(!1)}};return(0,n.jsxs)(n.Fragment,{children:[!s&&(0,n.jsxs)("button",{onClick:()=>p(!0),className:"fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 bg-gradient-to-r from-ai-600 via-indigo-600 to-blue-600 hover:from-ai-500 hover:to-indigo-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-1 group",children:[(0,n.jsxs)("div",{className:"relative",children:[n.jsx(i.Z,{className:"w-5 h-5 animate-pulse"}),n.jsx("span",{className:"absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-ai-600"})]}),n.jsx("span",{className:"font-semibold text-sm tracking-wide",children:"Ask EduAI"})]}),s&&(0,n.jsxs)("div",{className:`fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 animate-slideUp ${g?"h-16":"h-[620px] max-h-[85vh]"}`,children:[(0,n.jsxs)("div",{className:"bg-gradient-to-r from-ai-600 via-indigo-600 to-blue-600 p-4 text-white flex items-center justify-between shadow-sm",children:[(0,n.jsxs)("div",{className:"flex items-center space-x-2.5",children:[n.jsx("div",{className:"w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center",children:n.jsx(r.Z,{className:"w-5 h-5 text-white"})}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"flex items-center space-x-2",children:[n.jsx("h3",{className:"font-bold text-sm",children:"EduAI Mentor"}),n.jsx("span",{className:"text-[10px] bg-emerald-400/25 text-emerald-100 font-semibold px-1.5 py-0.2 rounded border border-emerald-300/30",children:"Online 24/7"})]}),n.jsx("p",{className:"text-[11px] text-indigo-100 truncate max-w-[200px]",children:e?`Context: ${e}`:"Intelligent Tutor & Doubt Solver"})]})]}),(0,n.jsxs)("div",{className:"flex items-center space-x-1 text-white/80",children:[n.jsx("button",{onClick:()=>x(!g),className:"p-1.5 hover:bg-white/10 rounded-lg transition",title:g?"Expand":"Minimize",children:g?n.jsx(o.Z,{className:"w-4 h-4"}):n.jsx(l.Z,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>p(!1),className:"p-1.5 hover:bg-white/10 rounded-lg transition",title:"Close",children:n.jsx(c.Z,{className:"w-4 h-4"})})]})]}),!g&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 text-xs sm:text-sm",children:[v.map(e=>(0,n.jsxs)("div",{className:`flex items-start space-x-2.5 ${"user"===e.sender?"justify-end":"justify-start"}`,children:["assistant"===e.sender&&n.jsx("div",{className:"w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5",children:n.jsx(i.Z,{className:"w-4 h-4"})}),(0,n.jsxs)("div",{className:`max-w-[85%] rounded-2xl p-3.5 shadow-xs ${"user"===e.sender?"bg-blue-600 text-white rounded-tr-xs":"bg-white text-slate-800 border border-slate-200 rounded-tl-xs"}`,children:[n.jsx("div",{className:"whitespace-pre-wrap leading-relaxed space-y-2",children:e.text.split("\n\n").map((e,t)=>n.jsx("div",{children:e.startsWith("```")?n.jsx("pre",{className:"bg-slate-900 text-emerald-400 p-2.5 rounded-lg overflow-x-auto font-mono text-xs my-1.5",children:e.replace(/```[a-z]*/g,"")}):n.jsx("p",{children:e})},t))}),e.suggestions&&e.suggestions.length>0&&n.jsx("div",{className:"mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5",children:e.suggestions.map((e,t)=>(0,n.jsxs)("button",{onClick:()=>N(e),className:"text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium px-2.5 py-1 rounded-full border border-indigo-200 transition text-left",children:["\uD83D\uDCA1 ",e]},t))}),n.jsx("span",{className:`text-[10px] mt-1.5 block ${"user"===e.sender?"text-blue-200 text-right":"text-slate-400"}`,children:e.timestamp})]}),"user"===e.sender&&n.jsx("div",{className:"w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5",children:n.jsx(d.Z,{className:"w-4 h-4"})})]},e.id)),y&&(0,n.jsxs)("div",{className:"flex items-center space-x-2 text-slate-400 text-xs p-2",children:[n.jsx("div",{className:"w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center",children:n.jsx(i.Z,{className:"w-3.5 h-3.5 animate-spin"})}),n.jsx("span",{className:"italic",children:"EduAI is formulating step-by-step guidance..."})]}),n.jsx("div",{ref:j})]}),(0,n.jsxs)("div",{className:"p-3 bg-white border-t border-slate-200 flex flex-col space-y-2",children:[(0,n.jsxs)("form",{onSubmit:e=>{e.preventDefault(),N()},className:"flex items-center space-x-2",children:[n.jsx("input",{type:"text",value:f,onChange:e=>b(e.target.value),placeholder:"Ask about pointers, algorithms, syntax...",className:"flex-1 bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"}),n.jsx("button",{type:"submit",disabled:!f.trim()||y,className:"p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition disabled:opacity-40 flex-shrink-0",children:n.jsx(u.Z,{className:"w-4 h-4"})})]}),(0,n.jsxs)("div",{className:"flex items-center justify-between text-[10px] text-slate-400 px-1",children:[(0,n.jsxs)("span",{className:"flex items-center space-x-1",children:[n.jsx(m.Z,{className:"w-3 h-3 text-emerald-500"}),n.jsx("span",{children:"Academic Integrity Safeguard Active"})]}),n.jsx("span",{children:"EduAI 2.0"})]})]})]})]})]})}},9392:(e,t,s)=>{"use strict";function n(e,t){let s=t.split("\n").map((e,t)=>({line:t+1,code:e.trim()})).filter(e=>e.code.length>0).map(e=>{let t="Executes statement.";return e.code.includes("import")||e.code.includes("#include")?t="Imports required system headers or standard libraries.":e.code.includes("def ")||e.code.includes("function ")||e.code.includes("main()")?t="Defines a modular function / entry point block with scoped parameters.":e.code.includes("for ")||e.code.includes("while ")?t="Initializes an iterative loop construct over a sequence or boundary condition.":e.code.includes("if ")||e.code.includes("elif ")||e.code.includes("else:")?t="Evaluates a boolean conditional branch to control program execution flow.":e.code.includes("print(")||e.code.includes("console.log(")||e.code.includes("printf(")||e.code.includes("std::cout")?t="Sends formatted character stream to the standard output terminal.":e.code.includes("=")?t="Allocates or binds an identifier to an evaluated expression or object value.":e.code.includes("return")&&(t="Terminates function execution and yields a result back to the caller."),{line:e.line,code:e.code,explanation:t}}),n=[];for(let e of Array.from(t.matchAll(/(?:let|const|var|int|float|double|char|string|\b)([a-zA-Z_]\w*)\s*=\s*([^;\n]+)/g)))!["if","for","while","def","class"].includes(e[1])&&n.length<5&&n.push({name:e[1],type:isNaN(Number(e[2]))?"String / Reference":"Numeric (Integer / Float)",purpose:`Holds runtime value: ${e[2].trim().slice(0,24)}`});return 0===n.length&&n.push({name:"name / learner",type:"String",purpose:"Identifies the student entity"},{name:"streak",type:"Integer",purpose:"Tracks consecutive active learning days"}),{overview:`This ${e.toUpperCase()} script demonstrates structured programming fundamentals including data modeling, state assignment, control flow logic, and formatted standard output.`,lineByLine:s,concepts:[`${e.toUpperCase()} syntax conventions and block scoping`,"Data type representation and memory allocation","Standard I/O stream formatting and string interpolation","Defensive error boundaries and execution flow"],variables:n,functions:[`Main execution scope in ${e.toUpperCase()}`,"Formatted output helper procedures (printf / print / log)"],loops:t.includes("for")||t.includes("while")?["Iterates through collection items or ranges with deterministic stopping conditions."]:["No explicit loops detected; executes in linear deterministic order."],conditions:t.includes("if")?["Branching logic evaluates boolean predicates to handle multiple execution states."]:["Single unconditional flow from entry point to return statement."],expectedOutput:`Console logs printing student details, learning hours, streak status (12 Days 🔥), and execution diagnostics.`,commonMistakes:["Forgetting to initialize pointers or variables before referencing them in expressions.","Off-by-one boundary errors when iterating with loop ranges or arrays.","Unescaped special characters or mismatched quotation delimiters in strings."],suggestedImprovements:["Encapsulate business logic inside parameterized pure functions for testability.","Add type annotations or docstrings to improve maintainability and team collaboration.","Implement boundary validation to handle unexpected or empty inputs gracefully."]}}async function a(e,t){let s=e.toLowerCase();return s.includes("give me the complete answer for my assignment")||s.includes("solve my homework for me")||s.includes("write the whole assignment")?`### 🛡️ EduAI Academic Integrity Guide

I'm here to help you **learn and master** the concepts, rather than simply handing over copy-paste assignment answers!

Here is how we can break down this problem together:
1. **Understand the Goal:** What input does the problem expect, and what output should it produce?
2. **Deconstruct the Logic:** Break the requirement into small pseudo-code steps (e.g., input parsing → validation → core computation → output).
3. **Core Formula/Concept:** Focus on the underlying algorithm (such as recursion, binary search, or pointer arithmetic).

👉 Share the specific line or error you're stuck on, and I'll explain the concept step-by-step so you can write the solution with confidence!`:s.includes("pointer")&&(s.includes("c")||s.includes("c++")||s.includes("memory"))?`### 🎯 What is a Pointer in C?

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
3. **Building Data Structures:** Essential for Linked Lists, Trees, and Graphs.`:s.includes("function")&&s.includes("python")?`### 🐍 What is a Python Function?

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
* **First-Class Citizens:** In Python, functions can be assigned to variables, passed as arguments, and returned from other functions.`:s.includes("bfs")||s.includes("dfs")||s.includes("breadth")&&s.includes("depth")?`### 🌳 Difference Between BFS and DFS

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
* **DFS:** Visit node $\rightarrow$ recursively call DFS on each unvisited neighbor.`:s.includes("streak")||s.includes("12-day")||s.includes("momentum")?`### 🔥 How to Grow & Protect Your 12-Day Streak

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
   * Reach **30 days** to earn the prestigious *30-Day Legend Streak* trophy. 🚀`:s.includes("recursion")?`### 🔄 Understanding Recursion with an Example

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
\`\`\``:s.includes("sql")||s.includes("nosql")||s.includes("database")?`### 🗄️ SQL vs NoSQL Databases

| Metric | Relational (SQL) | Non-Relational (NoSQL) |
| :--- | :--- | :--- |
| **Data Model** | Tables with predefined schemas, rows & columns | Documents (JSON), Key-Value, Graphs, or Wide-Column |
| **Schema** | Rigid / Strict schema | Dynamic / Flexible schema |
| **Scaling** | Vertical (scale up CPU/RAM) | Horizontal (scale out across clusters) |
| **Transactions** | ACID compliant (Atomicity, Consistency, Isolation, Durability) | BASE model (Eventual consistency) |
| **Examples** | PostgreSQL, MySQL, SQLite | MongoDB, Redis, Cassandra, DynamoDB |

#### When to use what?
* **Use SQL:** When data integrity, complex relational joins, and strict transactions are critical (e.g., Banking, SmartEdu student grades, eCommerce payments).
* **Use NoSQL:** When dealing with rapidly changing unstructured data, real-time caching, or massive global scale (e.g., Social feeds, chat message streams).`:`### 🎓 EduAI Guidance for "${e}"

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

Feel free to ask a follow-up question or request a code example in Python, C, or Java!`}s.d(t,{G:()=>a,Y:()=>n})},1608:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r,metadata:()=>i});var n=s(4065);s(2437);let a=(0,s(5013).createProxy)(String.raw`/Users/kishore/.gemini/antigravity/scratch/smart-education-system/src/components/ai/EduAIAssistant.tsx#EduAIAssistant`),i={title:"SmartEdu — Intelligent Learning Ecosystem",description:"An intelligent digital education platform connecting Students, Parents, and Administrators with personalized learning, multi-language coding, AI assistance, and progress tracking."};function r({children:e}){return n.jsx("html",{lang:"en",children:(0,n.jsxs)("body",{className:"bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased",children:[e,n.jsx(a,{})]})})}},2437:()=>{}};