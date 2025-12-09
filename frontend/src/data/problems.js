export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "Each input has exactly one solution.",
        "You cannot use the same element twice.",
        "Return indices in any order."
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your solution here\n}\n`,
      python: `def twoSum(nums, target):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}`
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  // ------------------------------- EASY ----------------------------------

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Reverse the input array of characters in-place.",
      notes: ["You must modify the array in-place with O(1) extra memory."],
    },
    examples: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵"],
    starterCode: {
      javascript: `function reverseString(s) {\n  // Write your solution here\n}\n`,
      python: `def reverseString(s):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        // Write your solution here\n    }\n}`
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o','l','l','e','h']\n['h','a','n','n','a','H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Return true if after cleaning a string it reads the same forwards and backwards.",
      notes: ["Ignore non-alphanumeric characters.", "Case-insensitive."],
    },
    examples: [
      {
        input: '"A man, a plan, a canal: Panama"',
        output: "true",
      },
      {
        input: '"race a car"',
        output: "false",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵"],
    starterCode: {
      javascript: `function isPalindrome(s) {\n  // Write your solution here\n}\n`,
      python: `def isPalindrome(s):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}`
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "fibonacci-number": {
    id: "fibonacci-number",
    title: "Fibonacci Number",
    difficulty: "Easy",
    category: "DP • Recursion",
    description: { text: "Return the nth Fibonacci number." },
    examples: [
      { input: "n = 2", output: "1" },
      { input: "n = 3", output: "2" },
      { input: "n = 10", output: "55" },
    ],
    constraints: ["0 ≤ n ≤ 30"],
    starterCode: {
      javascript: `function fib(n) {\n  // Write your solution here\n}\n`,
      python: `def fib(n):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int fib(int n) {\n        // Write your solution here\n        return 0;\n    }\n}`,
    },
    expectedOutput: {
      javascript: "1\n2\n55",
      python: "1\n2\n55",
      java: "1\n2\n55",
    },
  },

  // ------------------------------- MEDIUM ----------------------------------

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "DP • Kadane’s Algorithm",
    description: { text: "Find the contiguous subarray with the largest sum." },
    examples: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
      { input: "[1]", output: "1" },
      { input: "[5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // Write your solution here\n}\n`,
      python: `def maxSubArray(nums):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    description: {
      text: "Find two lines that together contain the most water.",
    },
    examples: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "[1,1]", output: "1" },
    ],
    constraints: ["2 ≤ n ≤ 10⁵"],
    starterCode: {
      javascript: `function maxArea(height) {\n  // Write your solution here\n}\n`,
      python: `def maxArea(height):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
    },
  },

  "3sum": {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers • Sorting",
    description: {
      text: "Return all unique triplets in the array which give the sum of zero.",
    },
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
    ],
    constraints: ["3 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      javascript: `function threeSum(nums) {\n  // Write your solution here\n}\n`,
      python: `def threeSum(nums):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}`
    },
    expectedOutput: {
      javascript: "[[-1,-1,2],[-1,0,1]]",
      python: "[[-1,-1,2],[-1,0,1]]",
      java: "[[-1, -1, 2], [-1, 0, 1]]",
    },
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description: { text: "Return index of target if found, else -1." },
    examples: [
      { input: "nums=[-1,0,3,5,9,12], target=9", output: "4" },
      { input: "nums=[-1,0,3,5,9,12], target=2", output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      javascript: `function search(nums, target) {\n  // Write your solution here\n}\n`,
      python: `def search(nums, target):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n}`
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
    },
  },

  // ------------------------------- HARD ----------------------------------

  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers • Stack",
    description: {
      text: "Given n bars, compute how much water is trapped after raining.",
    },
    examples: [
      { input: "[4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["1 ≤ n ≤ 2 * 10⁵"],
    starterCode: {
      javascript: `function trap(height) {\n  // Write your solution here\n}\n`,
      python: `def trap(height):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int trap(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}`,
    },
    expectedOutput: {
      javascript: "9",
      python: "9",
      java: "9",
    },
  },

  "median-of-two-sorted-arrays": {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search • Divide & Conquer",
    description: {
      text: "Return the median of two sorted arrays with O(log(m+n)) complexity.",
    },
    examples: [
      { input: "nums1=[1,3], nums2=[2]", output: "2.0" },
      { input: "nums1=[1,2], nums2=[3,4]", output: "2.5" },
    ],
    constraints: ["0 ≤ m,n ≤ 10⁵"],
    starterCode: {
      javascript: `function findMedianSortedArrays(a, b) {\n  // Write your solution here\n}\n`,
      python: `def findMedianSortedArrays(a, b):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] a, int[] b) {\n        // Write your solution here\n        return 0;\n    }\n}`
    },
    expectedOutput: {
      javascript: "2.0\n2.5",
      python: "2.0\n2.5",
      java: "2.0\n2.5",
    },
  },

  "word-ladder": {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph • BFS",
    description: {
      text: "Find the shortest transformation sequence from beginWord to endWord.",
    },
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
      },
    ],
    constraints: ["1 ≤ wordList.length ≤ 5000"],
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {\n  // Write your solution here\n}\n`,
      python: `def ladderLength(beginWord, endWord, wordList):\n    # Write your solution here\n    pass\n`,
      java: `class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        // Write your solution here\n        return 0;\n    }\n}`
    },
    expectedOutput: {
      javascript: "5",
      python: "5",
      java: "5",
    },
  },
};
export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};

