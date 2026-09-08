import {
  User,
  Course,
  Lesson,
  Quiz,
  Assignment,
  StreakDay,
  Achievement,
  Certificate,
  NotificationItem,
  SubjectAnalytics,
} from './types';

export const DEMO_USERS: User[] = [
  {
    id: 'student-1',
    name: 'Rahul Sharma',
    email: 'rahul@smartedu.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'parent-1',
    name: 'Anita Sharma',
    email: 'anita@smartedu.edu',
    role: 'parent',
    childId: 'student-1',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'admin-1',
    name: 'Dr. Vikram Rao',
    email: 'admin@smartedu.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
];

export const DEMO_COURSES: Course[] = [
  {
    id: 'course-python',
    title: 'Python for Intelligent Systems',
    category: 'Python',
    difficulty: 'Beginner',
    duration: '14 hours',
    lessonsCount: 16,
    quizzesCount: 4,
    exercisesCount: 12,
    description: 'Master Python fundamentals, object-oriented concepts, and functional programming geared towards data science and automation.',
    learningObjectives: [
      'Understand variables, types, and control structures',
      'Master functions, recursion, and lambda expressions',
      'Work with collections, list comprehensions, and dictionaries',
      'Implement file I/O and object-oriented architectures',
    ],
    instructor: 'Dr. Priya Sundaram',
    thumbnailColor: 'from-amber-500/20 to-blue-600/20',
    iconName: 'Code2',
    enrolled: true,
    progress: 78,
  },
  {
    id: 'course-c',
    title: 'C Programming & Memory Systems',
    category: 'C Programming',
    difficulty: 'Intermediate',
    duration: '18 hours',
    lessonsCount: 20,
    quizzesCount: 5,
    exercisesCount: 15,
    description: 'Deep dive into low-level systems programming, pointers, memory allocation, structs, and efficient algorithmic implementations.',
    learningObjectives: [
      'Master raw memory layout and pointer arithmetic',
      'Dynamic allocation with malloc, calloc, realloc, free',
      'Build custom data structures using C structs and unions',
      'Learn systems-level file operations and bit manipulation',
    ],
    instructor: 'Prof. Ramesh Gupta',
    thumbnailColor: 'from-blue-600/20 to-cyan-500/20',
    iconName: 'Cpu',
    enrolled: true,
    progress: 65,
  },
  {
    id: 'course-dsa',
    title: 'Data Structures & Algorithms in Practice',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    duration: '22 hours',
    lessonsCount: 24,
    quizzesCount: 6,
    exercisesCount: 20,
    description: 'Master arrays, linked lists, binary trees, heaps, graph traversals, and dynamic programming for technical excellence.',
    learningObjectives: [
      'Analyze asymptotic time and space complexity with Big-O',
      'Build balanced search trees and priority queues',
      'Implement BFS, DFS, Dijkstra, and Topological Sort',
      'Formulate Dynamic Programming recurrence relations',
    ],
    instructor: 'Alex Chen, M.S. CS',
    thumbnailColor: 'from-indigo-600/20 to-purple-600/20',
    iconName: 'GitMerge',
    enrolled: true,
    progress: 84,
  },
  {
    id: 'course-ai',
    title: 'Artificial Intelligence Fundamentals',
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    duration: '16 hours',
    lessonsCount: 14,
    quizzesCount: 4,
    exercisesCount: 8,
    description: 'Explore neural networks, computer vision heuristics, transformers, and automated reasoning techniques in the modern AI era.',
    learningObjectives: [
      'Understand search algorithms (A*, minimax, alpha-beta)',
      'Learn fundamental neural network architectures and backpropagation',
      'Grasp NLP tokenization, embeddings, and attention mechanisms',
      'Evaluate model metrics: precision, recall, F1, and ROC curves',
    ],
    instructor: 'Dr. Elena Rostova',
    thumbnailColor: 'from-purple-600/20 to-pink-600/20',
    iconName: 'BrainCircuit',
    enrolled: true,
    progress: 56,
  },
  {
    id: 'course-cpp',
    title: 'C++ Modern OOP & Design Patterns',
    category: 'C++',
    difficulty: 'Intermediate',
    duration: '15 hours',
    lessonsCount: 18,
    quizzesCount: 4,
    exercisesCount: 10,
    description: 'Modern C++20 features, smart pointers, templates, RAII idioms, and high-performance game/engine architecture.',
    learningObjectives: ['Smart pointers & RAII', 'Template metaprogramming', 'STL containers', 'Move semantics'],
    instructor: 'Markus Vance',
    thumbnailColor: 'from-blue-500/20 to-indigo-500/20',
    iconName: 'Boxes',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-java',
    title: 'Java Enterprise Architectures',
    category: 'Java',
    difficulty: 'Intermediate',
    duration: '20 hours',
    lessonsCount: 22,
    quizzesCount: 5,
    exercisesCount: 14,
    description: 'Enterprise backend development using Spring Boot, JPA, Hibernate, multi-threading, and microservices.',
    learningObjectives: ['Spring Boot REST APIs', 'JPA / Hibernate ORM', 'Multithreading & ExecutorService', 'JUnit Testing'],
    instructor: 'Sarah Jenkins',
    thumbnailColor: 'from-red-500/20 to-orange-500/20',
    iconName: 'Coffee',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-js',
    title: 'JavaScript & TypeScript Mastery',
    category: 'JavaScript',
    difficulty: 'Beginner',
    duration: '16 hours',
    lessonsCount: 18,
    quizzesCount: 4,
    exercisesCount: 12,
    description: 'Deep dive into asynchronous JavaScript, Event Loop, Closures, TypeScript generics, and modern web APIs.',
    learningObjectives: ['Event Loop & Promises', 'Type systems & Generics', 'DOM & Fetch API', 'Modular JS architecture'],
    instructor: 'Devon Miller',
    thumbnailColor: 'from-yellow-500/20 to-amber-500/20',
    iconName: 'Zap',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-html-css',
    title: 'Modern Responsive Web & CSS Grid',
    category: 'HTML & CSS',
    difficulty: 'Beginner',
    duration: '10 hours',
    lessonsCount: 12,
    quizzesCount: 3,
    exercisesCount: 8,
    description: 'Semantic HTML5, CSS Grid, Flexbox, transitions, keyframe animations, and accessible web standards.',
    learningObjectives: ['Semantic HTML structure', 'Flexbox & CSS Grid layouts', 'Responsive design & Media Queries', 'Web accessibility (WCAG)'],
    instructor: 'Clara Oswald',
    thumbnailColor: 'from-orange-500/20 to-pink-500/20',
    iconName: 'Layout',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-ml',
    title: 'Machine Learning from Scratch',
    category: 'Machine Learning',
    difficulty: 'Advanced',
    duration: '24 hours',
    lessonsCount: 26,
    quizzesCount: 6,
    exercisesCount: 16,
    description: 'Implement regression, classification, clustering, support vector machines, and random forests using Python.',
    learningObjectives: ['Linear & Logistic Regression', 'SVM and Decision Trees', 'K-Means Clustering', 'Hyperparameter tuning with Cross-Validation'],
    instructor: 'Dr. Priya Sundaram',
    thumbnailColor: 'from-emerald-500/20 to-teal-500/20',
    iconName: 'LineChart',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-dbms',
    title: 'Database Systems & SQL Optimization',
    category: 'Database Management',
    difficulty: 'Intermediate',
    duration: '14 hours',
    lessonsCount: 16,
    quizzesCount: 4,
    exercisesCount: 11,
    description: 'Relational data modeling, ACID transactions, complex joins, B-Tree indexes, and query execution plans.',
    learningObjectives: ['3NF Database Normalization', 'Complex SQL Joins & Subqueries', 'Index optimization & EXPLAIN ANALYZE', 'Transactions & Isolation Levels'],
    instructor: 'Prof. Ramesh Gupta',
    thumbnailColor: 'from-cyan-500/20 to-blue-500/20',
    iconName: 'Database',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-webdev',
    title: 'Full-Stack Modern Web Engineering',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '28 hours',
    lessonsCount: 30,
    quizzesCount: 7,
    exercisesCount: 20,
    description: 'Build production-ready applications with Next.js, Node.js REST APIs, PostgreSQL, and token authentication.',
    learningObjectives: ['SSR and Client components', 'RESTful API design', 'Database integration & migrations', 'Deployment & CI/CD pipelines'],
    instructor: 'Alex Chen, M.S. CS',
    thumbnailColor: 'from-violet-500/20 to-fuchsia-500/20',
    iconName: 'Globe',
    enrolled: false,
    progress: 0,
  },
  {
    id: 'course-networks',
    title: 'Computer Networks & Cloud Architecture',
    category: 'Computer Networks',
    difficulty: 'Intermediate',
    duration: '16 hours',
    lessonsCount: 18,
    quizzesCount: 4,
    exercisesCount: 9,
    description: 'TCP/IP protocol suite, DNS resolution, HTTP/3, TLS handshakes, socket programming, and cloud routing topology.',
    learningObjectives: ['OSI & TCP/IP stack layers', 'Socket programming in C/Python', 'DNS, DHCP & routing protocols', 'TLS encryption handshakes'],
    instructor: 'Dr. Vikram Rao',
    thumbnailColor: 'from-blue-600/20 to-indigo-700/20',
    iconName: 'Network',
    enrolled: false,
    progress: 0,
  },
];

export const DEMO_LESSONS: Record<string, Lesson[]> = {
  'course-python': [
    {
      id: 'py-1',
      courseId: 'course-python',
      title: 'Python Variables & Dynamic Typing',
      order: 1,
      readTime: '8 min',
      summary: 'Understand variables, memory pointers, and dynamic typing in Python with clean examples.',
      content: `### 1. What is a Variable?

In Python, a variable is a symbolic name that refers to an object stored in memory. Unlike languages like C or Java where variables are strongly typed memory containers, Python variables are dynamic references.

\`\`\`python
# Creating variables
name = "Rahul"
score = 95
is_active = True
learning_hours = 46.5
\`\`\`

### 2. Memory Model & Reference Assignment
When you write \`x = 10\`, Python allocates an integer object \`10\` in memory and binds the name \`x\` to that object reference.

* Integers, strings, and tuples are **immutable**.
* Lists, dictionaries, and sets are **mutable**.`,
      codeSnippet: `# Variables Demonstration
name = "Rahul Sharma"
current_streak = 12
active_courses = 4
completion_rate = 78.5

print("Student Name:", name)
print("Current Streak:", current_streak, "Days")
print("Completion Rate:", completion_rate, "%")

# Dynamic reassignment
current_streak += 1
print("Updated Streak:", current_streak, "Days 🔥")`,
      language: 'python',
      keyPoints: [
        'Variables in Python do not require explicit type declarations.',
        'Names are references to objects stored in the Python heap.',
        'Dynamic typing allows re-binding names to different types.',
        'Use meaningful, snake_case identifiers following PEP 8 standards.',
      ],
      practiceQuestion: {
        question: 'Write a Python snippet that calculates the average of three quiz scores (85, 92, 78) and prints the result formatted to 2 decimal places.',
        hint: 'Use the round() function or f-string formatting e.g. f"{avg:.2f}"',
        starterCode: `# Calculate and display average quiz score
score1 = 85
score2 = 92
score3 = 78

# Your code here:
`,
      },
      isCompleted: true,
    },
    {
      id: 'py-2',
      courseId: 'course-python',
      title: 'Control Flow: Conditionals & Loops',
      order: 2,
      readTime: '12 min',
      summary: 'Master if-elif-else branching and for/while iteration patterns with early exits.',
      content: `### 1. Conditional Branching
Control flow dictates how your program evaluates conditions and executes branches.

\`\`\`python
score = 88
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
else:
    grade = 'C'
\`\`\`

### 2. Iteration with For & While
Loops allow you to process collections and repeat computational tasks efficiently.`,
      codeSnippet: `# Loop and conditionals
courses = ["Python", "C Programming", "Algorithms", "AI"]
scores = [78, 65, 84, 56]

print("=== Course Status Report ===")
for course, score in zip(courses, scores):
    status = "Distinction" if score >= 75 else "Passing"
    print(f"{course:<15} : {score}% [{status}]")`,
      language: 'python',
      keyPoints: [
        'Python uses indentation (4 spaces) rather than braces to define code blocks.',
        'The zip() function pairs elements from multiple iterables cleanly.',
        'Use ternary expressions (x if cond else y) for concise assignments.',
      ],
      practiceQuestion: {
        question: 'Write a loop that prints all even numbers between 1 and 20.',
        hint: 'Use range(2, 21, 2) or check if n % 2 == 0.',
        starterCode: `# Print even numbers
for n in range(1, 21):
    # Add check:
    pass
`,
      },
      isCompleted: true,
    },
    {
      id: 'py-3',
      courseId: 'course-python',
      title: 'Python Functions & Scope',
      order: 3,
      readTime: '15 min',
      summary: 'Define modular, reusable functions with default arguments, *args, **kwargs, and closures.',
      content: `### 1. Defining Functions
Functions encapsulate reusable logic, improve readability, and prevent duplicate code.

\`\`\`python
def calculate_streak_bonus(streak_days):
    if streak_days >= 30:
        return 1.5
    elif streak_days >= 7:
        return 1.2
    return 1.0
\`\`\`

### 2. Return Values & Docstrings
Always document your functions with PEP 257 docstrings.`,
      codeSnippet: `def evaluate_student(name, streak, quiz_avg):
    """
    Evaluates student performance category and rewards.
    """
    is_consistent = streak >= 10
    is_honors = quiz_avg >= 80
    
    tier = "🌟 Platinum Learner" if (is_consistent and is_honors) else "📘 Steady Learner"
    
    return {
        "student": name,
        "tier": tier,
        "streak_bonus": 1.25 if is_consistent else 1.0,
        "status": "Active"
    }

report = evaluate_student("Rahul Sharma", 12, 82.5)
for key, val in report.items():
    print(f"{key.capitalize()}: {val}")`,
      language: 'python',
      keyPoints: [
        'Functions are first-class citizens in Python and can be passed as arguments.',
        'Default arguments are evaluated once at function definition time.',
        'Keyword arguments provide explicit call-site clarity.',
      ],
      practiceQuestion: {
        question: 'Create a function `is_prime(n)` that returns True if n is a prime number and False otherwise.',
        hint: 'Check if n <= 1, then loop from 2 up to int(n**0.5) + 1.',
        starterCode: `def is_prime(n):
    # Your implementation here
    pass

print(is_prime(17)) # Expected: True
print(is_prime(24)) # Expected: False
`,
      },
      isCompleted: false,
    },
  ],
  'course-c': [
    {
      id: 'c-1',
      courseId: 'course-c',
      title: 'C Syntax, Types & Memory Layout',
      order: 1,
      readTime: '10 min',
      summary: 'Learn low-level memory structure, primitive types, and compilation pipeline with GCC.',
      content: `### 1. The C Compilation Pipeline
Source Code (.c) → Preprocessor → Compiler (.s) → Assembler (.o) → Linker → Executable binary.

### 2. Memory Layout of a C Program
* Text Segment: Read-only machine instructions.
* Data & BSS Segments: Global and static variables.
* Stack: Local variables, function stack frames.
* Heap: Dynamic allocations with malloc/calloc.`,
      codeSnippet: `#include <stdio.h>

int main() {
    int student_id = 101;
    char grade = 'A';
    float attendance = 94.5f;

    printf("=== SmartEdu Student Record ===\\n");
    printf("ID: %d\\n", student_id);
    printf("Grade: %c\\n", grade);
    printf("Attendance: %.1f%%\\n", attendance);

    return 0;
}`,
      language: 'c',
      keyPoints: [
        'C is statically typed and compiled directly to machine instructions.',
        'Variables must be explicitly declared with their data type.',
        'Every C program begins execution in the main() function.',
      ],
      practiceQuestion: {
        question: 'Write a C program that computes the sum and average of an array of 5 integers.',
        hint: 'Use a for loop: for(int i=0; i<5; i++) sum += arr[i];',
        starterCode: `#include <stdio.h>

int main() {
    int scores[5] = {85, 90, 78, 92, 88};
    // Your code here:
    
    return 0;
}`,
      },
      isCompleted: true,
    },
  ],
};

export const DEMO_QUIZZES: Quiz[] = [
  {
    id: 'quiz-py-1',
    courseId: 'course-python',
    title: 'Python Comprehensive Proctored Certification Exam',
    durationMinutes: 10,
    passingScore: 75,
    isProctored: true,
    maxViolations: 3,
    questions: [
      {
        id: 'q1',
        question: 'What is the output of the following Python expression: type(3.14)?',
        options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        correctIndex: 1,
        explanation: 'In Python, decimal numbers are represented by the float type. Unlike C, Python does not have a distinct double keyword; all floating point numbers are standard 64-bit IEEE 754 floats.',
      },
      {
        id: 'q2',
        question: 'Which of the following data types in Python is IMMUTABLE?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctIndex: 2,
        explanation: 'Tuples are immutable sequences in Python; once created, their elements cannot be modified, added, or removed.',
      },
      {
        id: 'q3',
        question: 'What does the range(2, 10, 3) call generate in Python 3?',
        options: ['[2, 5, 8]', '[2, 3, 4, 5, 6, 7, 8, 9]', '[2, 5, 8, 11]', '[3, 6, 9]'],
        correctIndex: 0,
        explanation: 'range(start, stop, step) starts at 2, increments by 3, and stops strictly before 10. The values generated are 2, 5, and 8.',
      },
      {
        id: 'q4',
        question: 'What is the maximum number of active courses a student can enroll in concurrently on SmartEdu?',
        options: ['2 Courses', '3 Courses', '4 Courses', 'Unlimited'],
        correctIndex: 2,
        explanation: 'The platform enforces a strict 4-course active limit to prevent cognitive overload and promote high course completion rates.',
      },
      {
        id: 'q5',
        question: 'Which keyword is used to define an anonymous one-line function in Python?',
        options: ['def', 'func', 'lambda', 'inline'],
        correctIndex: 2,
        explanation: 'The lambda keyword defines small anonymous inline functions, for example: square = lambda x: x * x.',
      },
    ],
  },
  {
    id: 'quiz-c-1',
    courseId: 'course-c',
    title: 'C Systems Programming Proctored Assessment',
    durationMinutes: 12,
    passingScore: 75,
    isProctored: true,
    maxViolations: 3,
    questions: [
      {
        id: 'cq1',
        question: 'What operator is used to obtain the memory address of a variable in C?',
        options: ['*', '&', '->', '#'],
        correctIndex: 1,
        explanation: 'The address-of operator & returns the hexadecimal memory location of a variable.',
      },
      {
        id: 'cq2',
        question: 'What does malloc() return if the system runs out of heap memory?',
        options: ['0xFFFFFFFF', 'NULL', 'Throws an Exception', 'Undefined pointer'],
        correctIndex: 1,
        explanation: 'When malloc() fails to allocate the requested bytes, it returns a NULL pointer. Always verify pointers before dereferencing.',
      },
      {
        id: 'cq3',
        question: 'Which header file is required to use printf() and scanf() in standard C?',
        options: ['<stdlib.h>', '<stdio.h>', '<conio.h>', '<string.h>'],
        correctIndex: 1,
        explanation: '<stdio.h> (Standard Input/Output) defines core I/O stream procedures.',
      },
      {
        id: 'cq4',
        question: 'What is the size of a pointer variable on a standard 64-bit architecture?',
        options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
        correctIndex: 2,
        explanation: 'On modern 64-bit systems, memory addresses are 64 bits wide, making all pointers 8 bytes.',
      },
    ],
  },
  {
    id: 'quiz-java-1',
    courseId: 'course-java',
    title: 'Java Enterprise OOP Proctored Assessment',
    durationMinutes: 10,
    passingScore: 75,
    isProctored: true,
    maxViolations: 3,
    questions: [
      {
        id: 'jq1',
        question: 'Which keyword in Java prevents a class from being subclassed / inherited?',
        options: ['static', 'abstract', 'final', 'private'],
        correctIndex: 2,
        explanation: 'The final keyword on a class definition prevents any child class from extending it.',
      },
      {
        id: 'jq2',
        question: 'Where are objects allocated in the Java Virtual Machine (JVM) memory architecture?',
        options: ['Call Stack', 'Heap Memory', 'Native Method Stack', 'Program Counter Register'],
        correctIndex: 1,
        explanation: 'In Java, all objects and instances created with the new keyword are stored in Heap Memory managed by the Garbage Collector.',
      },
      {
        id: 'jq3',
        question: 'What is the root superclass of all classes in Java?',
        options: ['java.lang.System', 'java.lang.Class', 'java.lang.Object', 'java.lang.Root'],
        correctIndex: 2,
        explanation: 'java.lang.Object is the ultimate parent class of every object hierarchy in Java.',
      },
      {
        id: 'jq4',
        question: 'Which interface must be implemented to sort objects by their natural ordering in Java?',
        options: ['Comparator', 'Comparable', 'Serializable', 'Cloneable'],
        correctIndex: 1,
        explanation: 'Comparable defines the compareTo() method used for natural ordering.',
      },
    ],
  },
  {
    id: 'quiz-cpp-1',
    courseId: 'course-cpp',
    title: 'C++ Modern OOP & RAII Proctored Assessment',
    durationMinutes: 10,
    passingScore: 75,
    isProctored: true,
    maxViolations: 3,
    questions: [
      {
        id: 'cppq1',
        question: 'What design idiom couples resource management directly to object lifetime in C++?',
        options: ['MVC', 'RAII (Resource Acquisition Is Initialization)', 'Singleton', 'Observer'],
        correctIndex: 1,
        explanation: 'RAII binds resource allocation to object construction and resource deallocation to object destruction.',
      },
      {
        id: 'cppq2',
        question: 'Which smart pointer in modern C++ enforces exclusive ownership of a dynamic heap object?',
        options: ['std::shared_ptr', 'std::weak_ptr', 'std::unique_ptr', 'std::auto_ptr'],
        correctIndex: 2,
        explanation: 'std::unique_ptr cannot be copied; it can only be moved, guaranteeing single ownership.',
      },
    ],
  },
  {
    id: 'quiz-js-1',
    courseId: 'course-js',
    title: 'JavaScript & Asynchronous Systems Proctored Exam',
    durationMinutes: 10,
    passingScore: 75,
    isProctored: true,
    maxViolations: 3,
    questions: [
      {
        id: 'jsq1',
        question: 'What is the output of typeof NaN in JavaScript?',
        options: ["'undefined'", "'nan'", "'number'", "'object'"],
        correctIndex: 2,
        explanation: 'In the IEEE 754 floating point standard and JavaScript specification, NaN is of numeric type.',
      },
      {
        id: 'jsq2',
        question: 'Which microtask queue mechanism processes before regular setTimeout callbacks in the Event Loop?',
        options: ['Promise.then()', 'setInterval()', 'setImmediate()', 'requestAnimationFrame()'],
        correctIndex: 0,
        explanation: 'Promise fulfillment callbacks are microtasks and drain completely before the next macrotask is dequeued.',
      },
    ],
  },
];

export const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-py-1',
    courseId: 'course-python',
    title: 'Assignment 1: Student Grade Automation System',
    description: 'Construct a Python module that parses grade logs, computes statistics, and flags students eligible for honors.',
    deadline: 'Tomorrow, 11:59 PM',
    maxPoints: 100,
    status: 'Pending',
    instructions: '1. Create a function calculate_gpa(grades_list)\\n2. Filter students with scores >= 85\\n3. Format report table with aligned headers.',
    starterCode: `# Complete the student evaluation engine
def calculate_gpa(grades):
    # Return numerical average
    pass
`,
  },
  {
    id: 'assign-c-1',
    courseId: 'course-c',
    title: 'Assignment 2: Custom Dynamic String Buffer',
    description: 'Implement a memory-safe resizable string struct in C with append, shrink_to_fit, and free operations.',
    deadline: 'Sep 15, 2026',
    maxPoints: 100,
    status: 'Submitted',
    submittedAt: 'Yesterday, 4:30 PM',
    instructions: 'Allocate initial buffer of 16 bytes. Double capacity when buffer fills up. Free properly.',
  },
  {
    id: 'assign-dsa-1',
    courseId: 'course-dsa',
    title: 'Assignment 3: Balanced Binary Search Tree Validation',
    description: 'Implement an algorithm to verify whether an arbitrary binary tree satisfies AVL height-balance conditions.',
    deadline: 'Sep 2, 2026',
    maxPoints: 100,
    status: 'Graded',
    grade: 94,
    feedback: 'Excellent time complexity O(N). Clean recursive helper function with height caching.',
    instructions: 'Compute height recursively. Return -1 early when subtree is unbalanced.',
  },
];

// 60-day realistic GitHub-style streak data ending on current date
export const generateStreakMatrix = (): StreakDay[] => {
  const days: StreakDay[] = [];
  const now = new Date();
  for (let i = 59; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Create realistic pattern: Rahul has an active 12-day streak right now
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (i < 12) {
      // Current 12-day active streak: steady 3-8 activities per day
      count = Math.floor(Math.random() * 6) + 3;
      level = count > 6 ? 4 : count > 4 ? 3 : 2;
    } else if (i === 12 || i === 13) {
      // Inactive break 2 weeks ago
      count = 0;
      level = 0;
    } else if (Math.random() > 0.3) {
      count = Math.floor(Math.random() * 5) + 1;
      level = count >= 4 ? 3 : count >= 2 ? 2 : 1;
    }

    days.push({ date: dateStr, count, level });
  }
  return days;
};

export const DEMO_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Course Completed',
    description: 'Finished all lessons, quizzes, and projects in Web Development Basics.',
    icon: '🏆',
    isUnlocked: true,
    unlockedAt: 'Aug 14, 2026',
    category: 'course',
  },
  {
    id: 'ach-2',
    title: '7-Day Learning Streak',
    description: 'Maintained consistent coding and quiz practice for 7 consecutive days.',
    icon: '🔥',
    isUnlocked: true,
    unlockedAt: 'Aug 28, 2026',
    category: 'streak',
  },
  {
    id: 'ach-3',
    title: '50 Coding Exercises Solved',
    description: 'Successfully executed and passed test cases for 50 interactive problems.',
    icon: '💻',
    isUnlocked: true,
    unlockedAt: 'Sep 1, 2026',
    category: 'coding',
  },
  {
    id: 'ach-4',
    title: '10 Lessons Completed',
    description: 'Completed reading, code walkthroughs, and practice across core curriculums.',
    icon: '📚',
    isUnlocked: true,
    unlockedAt: 'Aug 20, 2026',
    category: 'course',
  },
  {
    id: 'ach-5',
    title: 'Quiz Ace (90%+)',
    description: 'Scored 90% or higher on a timed course assessment on your first attempt.',
    icon: '🎯',
    isUnlocked: true,
    unlockedAt: 'Sep 3, 2026',
    category: 'quiz',
  },
  {
    id: 'ach-6',
    title: 'AI Collaborator',
    description: 'Engaged with EduAI assistant to solve 15 deep technical doubts.',
    icon: '🤖',
    isUnlocked: true,
    unlockedAt: 'Sep 5, 2026',
    category: 'coding',
  },
  {
    id: 'ach-7',
    title: 'Speed Problem Solver',
    description: 'Executed correct code output within 3 minutes of starting a challenge.',
    icon: '⚡',
    isUnlocked: true,
    unlockedAt: 'Sep 7, 2026',
    category: 'coding',
  },
  {
    id: 'ach-8',
    title: '30-Day Legend Streak',
    description: 'Reach a continuous 30-day streak of active platform submissions.',
    icon: '🚀',
    isUnlocked: false,
    category: 'streak',
  },
];

export const DEMO_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-html-css',
    studentName: 'Rahul Sharma',
    courseName: 'Modern Responsive Web & CSS Grid Mastery',
    courseId: 'course-html-css',
    issuedAt: 'August 14, 2026',
    certificateNumber: 'SMARTEDU-2026-HTML-88492',
    instructor: 'Clara Oswald, Lead Web Architect',
    grade: 'Grade A+ (Distinction)',
    isUnlocked: true,
    lessonsCompleted: 12,
    totalLessons: 12,
    quizPassed: true,
    quizScore: 92,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-python',
    studentName: 'Rahul Sharma',
    courseName: 'Python for Intelligent Systems',
    courseId: 'course-python',
    instructor: 'Dr. Priya Sundaram',
    isUnlocked: false,
    lessonsCompleted: 2,
    totalLessons: 3,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-c',
    studentName: 'Rahul Sharma',
    courseName: 'C Programming & Memory Systems',
    courseId: 'course-c',
    instructor: 'Prof. Ramesh Gupta',
    isUnlocked: false,
    lessonsCompleted: 1,
    totalLessons: 2,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-java',
    studentName: 'Rahul Sharma',
    courseName: 'Java Enterprise Architectures',
    courseId: 'course-java',
    instructor: 'Sarah Jenkins',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-cpp',
    studentName: 'Rahul Sharma',
    courseName: 'C++ Modern OOP & Design Patterns',
    courseId: 'course-cpp',
    instructor: 'Markus Vance',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-js',
    studentName: 'Rahul Sharma',
    courseName: 'JavaScript & TypeScript Mastery',
    courseId: 'course-js',
    instructor: 'Devon Miller',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-dsa',
    studentName: 'Rahul Sharma',
    courseName: 'Data Structures & Algorithms in Practice',
    courseId: 'course-dsa',
    instructor: 'Alex Chen, M.S. CS',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-ai',
    studentName: 'Rahul Sharma',
    courseName: 'Artificial Intelligence Fundamentals',
    courseId: 'course-ai',
    instructor: 'Dr. Elena Rostova',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-ml',
    studentName: 'Rahul Sharma',
    courseName: 'Machine Learning from Scratch',
    courseId: 'course-ml',
    instructor: 'Dr. Priya Sundaram',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-dbms',
    studentName: 'Rahul Sharma',
    courseName: 'Database Systems & SQL Optimization',
    courseId: 'course-dbms',
    instructor: 'Prof. Ramesh Gupta',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-webdev',
    studentName: 'Rahul Sharma',
    courseName: 'Full-Stack Modern Web Engineering',
    courseId: 'course-webdev',
    instructor: 'Alex Chen, M.S. CS',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
  {
    id: 'cert-networks',
    studentName: 'Rahul Sharma',
    courseName: 'Computer Networks & Cloud Architecture',
    courseId: 'course-networks',
    instructor: 'Dr. Vikram Rao',
    isUnlocked: false,
    lessonsCompleted: 0,
    totalLessons: 4,
    quizPassed: false,
    requiredPassingScore: 75,
  },
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    recipientRole: 'parent',
    title: 'Weekly Consistency Milestone',
    message: 'Rahul has completed 12 consecutive active learning days! Coding practice accuracy improved to 88%.',
    type: 'success',
    createdAt: '2 hours ago',
    read: false,
  },
  {
    id: 'notif-2',
    recipientRole: 'parent',
    title: 'Assignment Reminder',
    message: 'Rahul has an upcoming Python Assignment due tomorrow at 11:59 PM.',
    type: 'info',
    createdAt: '5 hours ago',
    read: false,
  },
  {
    id: 'notif-3',
    recipientRole: 'parent',
    title: 'Inactivity Alert Preview',
    message: 'Your child has not been active on the learning platform recently. Encourage them to complete a lesson and continue their learning journey.',
    type: 'warning',
    createdAt: '1 day ago',
    read: true,
  },
  {
    id: 'notif-4',
    recipientRole: 'student',
    title: '🔥 12-Day Streak Maintained!',
    message: 'You completed lesson 2 in Python! Keep going today to protect your streak score.',
    type: 'success',
    createdAt: 'Today, 4:15 PM',
    read: false,
  },
  {
    id: 'notif-5',
    recipientRole: 'student',
    title: 'Assignment Graded: BST Validation',
    message: 'Prof. Ramesh scored your submission 94/100: "Excellent time complexity O(N)."',
    type: 'info',
    createdAt: 'Yesterday',
    read: true,
  },
  {
    id: 'notif-6',
    recipientRole: 'admin',
    title: 'System Alert: Student Enrollment Surge',
    message: 'Data Structures course reached 94% enrollment capacity across 12 colleges.',
    type: 'info',
    createdAt: '3 hours ago',
    read: false,
  },
  {
    id: 'notif-7',
    recipientRole: 'admin',
    title: 'Early Warning Detection',
    message: '2 students flagged with >15% drop in weekly study activity. Automated guidance dispatched.',
    type: 'alert',
    createdAt: 'Today, 11:00 AM',
    read: false,
  },
];

export const DEMO_SUBJECT_ANALYTICS: SubjectAnalytics[] = [
  {
    subject: 'Python Programming',
    quizScores: [60, 70, 72, 80, 88],
    assignmentScores: [75, 82, 90],
    codingAccuracy: 88,
    completedLessons: 12,
    totalLessons: 16,
    trend: 'up',
    avgScore: 78,
    highestScore: 92,
    improvementPct: 28,
  },
  {
    subject: 'C Programming',
    quizScores: [55, 62, 70, 75, 82],
    assignmentScores: [68, 74, 85],
    codingAccuracy: 81,
    completedLessons: 13,
    totalLessons: 20,
    trend: 'up',
    avgScore: 71,
    highestScore: 85,
    improvementPct: 27,
  },
  {
    subject: 'Mathematics & Algorithms',
    quizScores: [68, 74, 80, 86, 91],
    assignmentScores: [80, 88, 94],
    codingAccuracy: 92,
    completedLessons: 20,
    totalLessons: 24,
    trend: 'up',
    avgScore: 84,
    highestScore: 95,
    improvementPct: 23,
  },
  {
    subject: 'Artificial Intelligence',
    quizScores: [50, 58, 65, 72, 78],
    assignmentScores: [60, 70, 82],
    codingAccuracy: 76,
    completedLessons: 8,
    totalLessons: 14,
    trend: 'up',
    avgScore: 68,
    highestScore: 82,
    improvementPct: 28,
  },
];
