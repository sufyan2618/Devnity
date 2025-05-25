import { Monaco, MonacoDiffEditor } from "@monaco-editor/react";
import { Theme } from "../../Types/index";

type LanguageConfig = Record<
  string,
  {
    id: string;
    label: string;
    logoPath: string;
    pistonRuntime: { language: string; version: string };
    monacoLanguage: string;
    defaultCode: string;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    pistonRuntime: { language: "javascript", version: "18.15.0" }, // api that we're gonna be using
    monacoLanguage: "javascript",
    defaultCode: `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);`,
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    logoPath: "/typescript.png",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// TypeScript Playground
interface NumberArray {
  numbers: number[];
  sum(): number;
  squares(): number[];
  evenNumbers(): number[];
}

class MathOperations implements NumberArray {
  constructor(public numbers: number[]) {}

  sum(): number {
    return this.numbers.reduce((acc, curr) => acc + curr, 0);
  }

  squares(): number[] {
    return this.numbers.map(n => n * n);
  }

  evenNumbers(): number[] {
    return this.numbers.filter(n => n % 2 === 0);
  }
}

const math = new MathOperations([1, 2, 3, 4, 5]);

console.log('Original numbers:', math.numbers);
console.log('Squared numbers:', math.squares());
console.log('Even numbers:', math.evenNumbers());
console.log('Sum of numbers:', math.sum());`,
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python Playground
numbers = [1, 2, 3, 4, 5]

# Map numbers to their squares
squares = [n ** 2 for n in numbers]
print(f"Original numbers: {numbers}")
print(f"Squared numbers: {squares}")

# Filter for even numbers
even_numbers = [n for n in numbers if n % 2 == 0]
print(f"Even numbers: {even_numbers}")

# Calculate sum
numbers_sum = sum(numbers)
print(f"Sum of numbers: {numbers_sum}")`,
  },
  java: {
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    pistonRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `public class Main {
  public static void main(String[] args) {
      // Create array
      int[] numbers = {1, 2, 3, 4, 5};
      
      // Print original numbers
      System.out.print("Original numbers: ");
      printArray(numbers);
      
      // Calculate and print squares
      int[] squares = new int[numbers.length];
      for (int i = 0; i < numbers.length; i++) {
          squares[i] = numbers[i] * numbers[i];
      }
      System.out.print("Squared numbers: ");
      printArray(squares);
      
      // Print even numbers
      System.out.print("Even numbers: ");
      for (int n : numbers) {
          if (n % 2 == 0) System.out.print(n + " ");
      }
      System.out.println();
      
      // Calculate and print sum
      int sum = 0;
      for (int n : numbers) sum += n;
      System.out.println("Sum of numbers: " + sum);
  }
  
  private static void printArray(int[] arr) {
      for (int n : arr) System.out.print(n + " ");
      System.out.println();
  }
}`,
  },
  go: {
    id: "go",
    label: "Go",
    logoPath: "/go.png",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `package main

import "fmt"

func main() {
  // Create slice
  numbers := []int{1, 2, 3, 4, 5}
  
  // Print original numbers
  fmt.Println("Original numbers:", numbers)
  
  // Calculate squares
  squares := make([]int, len(numbers))
  for i, n := range numbers {
      squares[i] = n * n
  }
  fmt.Println("Squared numbers:", squares)
  
  // Filter even numbers
  var evenNumbers []int
  for _, n := range numbers {
      if n%2 == 0 {
          evenNumbers = append(evenNumbers, n)
      }
  }
  fmt.Println("Even numbers:", evenNumbers)
  
  // Calculate sum
  sum := 0
  for _, n := range numbers {
      sum += n
  }
  fmt.Println("Sum of numbers:", sum)
}`,
  },
  rust: {
    id: "rust",
    label: "Rust",
    logoPath: "/rust.png",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `fn main() {
    // Create vector
    let numbers = vec![1, 2, 3, 4, 5];
    
    // Print original numbers
    println!("Original numbers: {:?}", numbers);
    
    // Calculate squares
    let squares: Vec<i32> = numbers
        .iter()
        .map(|&n| n * n)
        .collect();
    println!("Squared numbers: {:?}", squares);
    
    // Filter even numbers
    let even_numbers: Vec<i32> = numbers
        .iter()
        .filter(|&&n| n % 2 == 0)
        .cloned()
        .collect();
    println!("Even numbers: {:?}", even_numbers);
    
    // Calculate sum
    let sum: i32 = numbers.iter().sum();
    println!("Sum of numbers: {}", sum);
}`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.png",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    // Create vector
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Print original numbers
    std::cout << "Original numbers: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;
    
    // Calculate squares
    std::vector<int> squares;
    std::transform(numbers.begin(), numbers.end(), 
                  std::back_inserter(squares),
                  [](int n) { return n * n; });
    
    std::cout << "Squared numbers: ";
    for (int n : squares) std::cout << n << " ";
    std::cout << std::endl;
    
    // Filter even numbers
    std::cout << "Even numbers: ";
    for (int n : numbers) {
        if (n % 2 == 0) std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // Calculate sum
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum of numbers: " << sum << std::endl;
    
    return 0;
}`,
  },
  csharp: {
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.png",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `using System;
using System.Linq;

class Program {
    static void Main() {
        // Create array
        int[] numbers = { 1, 2, 3, 4, 5 };
        
        // Print original numbers
        Console.WriteLine($"Original numbers: {string.Join(" ", numbers)}");
        
        // Calculate squares
        var squares = numbers.Select(n => n * n);
        Console.WriteLine($"Squared numbers: {string.Join(" ", squares)}");
        
        // Filter even numbers
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine($"Even numbers: {string.Join(" ", evenNumbers)}");
        
        // Calculate sum
        var sum = numbers.Sum();
        Console.WriteLine($"Sum of numbers: {sum}");
    }
}`,
  },
  ruby: {
    id: "ruby",
    label: "Ruby",
    logoPath: "/ruby.png",
    pistonRuntime: { language: "ruby", version: "3.0.1" },
    monacoLanguage: "ruby",
    defaultCode: `# Create array
numbers = [1, 2, 3, 4, 5]

# Print original numbers
puts "Original numbers: #{numbers.join(' ')}"

# Calculate squares
squares = numbers.map { |n| n * n }
puts "Squared numbers: #{squares.join(' ')}"

# Filter even numbers
even_numbers = numbers.select { |n| n.even? }
puts "Even numbers: #{even_numbers.join(' ')}"

# Calculate sum
sum = numbers.sum
puts "Sum of numbers: #{sum}"`,
  },
  swift: {
    id: "swift",
    label: "Swift",
    logoPath: "/swift.png",
    pistonRuntime: { language: "swift", version: "5.3.3" },
    monacoLanguage: "swift",
    defaultCode: `// Create array
let numbers = [1, 2, 3, 4, 5]

// Print original numbers
print("Original numbers: \\(numbers)")

// Calculate squares
let squares = numbers.map { $0 * $0 }
print("Squared numbers: \\(squares)")

// Filter even numbers
let evenNumbers = numbers.filter { $0 % 2 == 0 }
print("Even numbers: \\(evenNumbers)")

// Calculate sum
let sum = numbers.reduce(0, +)
print("Sum of numbers: \\(sum)")`,
  },
};

export const THEMES: Theme[] = [
    { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
    { id: "vs-light", label: "VS Light", color: "#ffffff" },
    { id: "moonlight", label: "Moonlight", color: "#222436" },
    { id: "tokyo-night", label: "Tokyo Night", color: "#1a1b26" },
    { id: "synthwave-84", label: "SynthWave '84", color: "#2a2139" },
    { id: "cyberpunk-2077", label: "Cyberpunk 2077", color: "#0d1421" },
    { id: "night-owl", label: "Night Owl", color: "#011627" },
    { id: "city-lights", label: "City Lights", color: "#1d252c" },
  ];
  
  export const THEME_DEFINITONS = {
    "moonlight": {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "7f85a3" },
        { token: "string", foreground: "c3e88d" },
        { token: "keyword", foreground: "c099ff" },
        { token: "number", foreground: "ff9cac" },
        { token: "type", foreground: "ffc777" },
        { token: "class", foreground: "82aaff" },
        { token: "function", foreground: "82aaff" },
        { token: "variable", foreground: "c8d3f5" },
        { token: "operator", foreground: "89ddff" },
      ],
      colors: {
        "editor.background": "#222436",
        "editor.foreground": "#c8d3f5",
        "editor.lineHighlightBackground": "#2f334d",
        "editorLineNumber.foreground": "#636da6",
        "editorIndentGuide.background": "#3b4261",
        "editor.selectionBackground": "#3654a7",
        "editor.inactiveSelectionBackground": "#3654a755",
      },
    },
    "tokyo-night": {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "565f89" },
        { token: "string", foreground: "9ece6a" },
        { token: "keyword", foreground: "bb9af7" },
        { token: "number", foreground: "ff9e64" },
        { token: "type", foreground: "0db9d7" },
        { token: "class", foreground: "7dcfff" },
        { token: "function", foreground: "7aa2f7" },
        { token: "variable", foreground: "c0caf5" },
        { token: "operator", foreground: "89ddff" },
      ],
      colors: {
        "editor.background": "#1a1b26",
        "editor.foreground": "#c0caf5",
        "editor.lineHighlightBackground": "#24283b",
        "editorLineNumber.foreground": "#3b4261",
        "editorIndentGuide.background": "#292e42",
        "editor.selectionBackground": "#33467c",
        "editor.inactiveSelectionBackground": "#33467c55",
      },
    },
    "synthwave-84": {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "848bbd" },
        { token: "string", foreground: "f97e72" },
        { token: "keyword", foreground: "ff7edb" },
        { token: "number", foreground: "f78c6c" },
        { token: "type", foreground: "fede5d" },
        { token: "class", foreground: "36f9f6" },
        { token: "function", foreground: "36f9f6" },
        { token: "variable", foreground: "ffffff" },
        { token: "operator", foreground: "ff7edb" },
      ],
      colors: {
        "editor.background": "#2a2139",
        "editor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#34294f",
        "editorLineNumber.foreground": "#848bbd",
        "editorIndentGuide.background": "#495495",
        "editor.selectionBackground": "#6a4c93",
        "editor.inactiveSelectionBackground": "#6a4c9355",
      },
    },
    "cyberpunk-2077": {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "5c7e81" },
        { token: "string", foreground: "00d9ff" },
        { token: "keyword", foreground: "ff0055" },
        { token: "number", foreground: "fcee0a" },
        { token: "type", foreground: "fcee0a" },
        { token: "class", foreground: "00d9ff" },
        { token: "function", foreground: "00d9ff" },
        { token: "variable", foreground: "ffffff" },
        { token: "operator", foreground: "ff0055" },
      ],
      colors: {
        "editor.background": "#0d1421",
        "editor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#1a2332",
        "editorLineNumber.foreground": "#5c7e81",
        "editorIndentGuide.background": "#233142",
        "editor.selectionBackground": "#ff005555",
        "editor.inactiveSelectionBackground": "#ff005533",
      },
    },
    "night-owl": {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "637777" },
        { token: "string", foreground: "ecc48d" },
        { token: "keyword", foreground: "c792ea" },
        { token: "number", foreground: "f78c6c" },
        { token: "type", foreground: "ffcb6b" },
        { token: "class", foreground: "82aaff" },
        { token: "function", foreground: "82aaff" },
        { token: "variable", foreground: "d6deeb" },
        { token: "operator", foreground: "7fdbca" },
      ],
      colors: {
        "editor.background": "#011627", 
        "editor.foreground": "#d6deeb",
        "editor.lineHighlightBackground": "#010e1a",
        "editorLineNumber.foreground": "#4b6479",
        "editorIndentGuide.background": "#122d42",
        "editor.selectionBackground": "#1d3b53",
        "editor.inactiveSelectionBackground": "#1d3b5355",
      },
    },
    "city-lights": {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "41505e" },
        { token: "string", foreground: "5dd8ff" },
        { token: "keyword", foreground: "b7c5d3" },
        { token: "number", foreground: "f2777a" },
        { token: "type", foreground: "4fb3d9" },
        { token: "class", foreground: "5dd8ff" },
        { token: "function", foreground: "5dd8ff" },
        { token: "variable", foreground: "b7c5d3" },
        { token: "operator", foreground: "718ca1" },
      ],
      colors: {
        "editor.background": "#1d252c",
        "editor.foreground": "#b7c5d3",
        "editor.lineHighlightBackground": "#2d3748",
        "editorLineNumber.foreground": "#41505e",
        "editorIndentGuide.background": "#2a3441",
        "editor.selectionBackground": "#41505e",
        "editor.inactiveSelectionBackground": "#41505e55",
      },
    },
  };
  
  // Helper function to define themes in Monaco
  export const defineMonacoThemes = (monaco: Monaco) => {
    Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
      monaco.editor.defineTheme(themeName, {
        base: themeData.base as 'vs' | 'vs-dark' | 'hc-black', 
        inherit: themeData.inherit,
        rules: themeData.rules.map((rule) => ({
          ...rule,
          foreground: rule.foreground,  
        })),
        colors: themeData.colors,
      });
    });
  };