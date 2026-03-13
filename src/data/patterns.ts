export interface PatternExample {
  title: string;
  description: string;
  cpp: string;
  python: string;
}

export interface DSAPattern {
  id: string;
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  useCases: string[];
  timeComplexity: string;
  spaceComplexity: string;
  examples: PatternExample[];
  visualizationType: "array" | "tree" | "graph" | "linkedlist" | "matrix" | "stack" | "twopointer" | "slidingwindow" | "heap" | "intervals";
  keyInsight: string;
}

export const dsaPatterns: DSAPattern[] = [
  {
    id: "sliding-window",
    name: "Sliding Window",
    category: "Array",
    difficulty: "Medium",
    description: "A technique that uses a window that slides over data to solve subarray/substring problems. The window can be fixed-size or variable-size.",
    keyInsight: "Instead of recomputing sums/results from scratch, slide the window by adding one element and removing another.",
    useCases: ["Maximum sum subarray of size k", "Longest substring without repeating characters", "Minimum window substring"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) to O(k)",
    visualizationType: "slidingwindow",
    examples: [
      {
        title: "Maximum Sum Subarray of Size K",
        description: "Find the maximum sum of any contiguous subarray of size k.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) return -1;
    
    // Calculate sum of first window
    int windowSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += arr[i];
    
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k]; // add new, remove old
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    int k = 3;
    cout << "Max sum: " << maxSumSubarray(arr, k); // 9
    return 0;
}`,
        python: `def max_sum_subarray(arr, k):
    n = len(arr)
    if n < k:
        return -1
    
    # Calculate sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, n):
        window_sum += arr[i] - arr[i - k]  # add new, remove old
        max_sum = max(max_sum, window_sum)
    
    return max_sum

arr = [2, 1, 5, 1, 3, 2]
k = 3
print(f"Max sum: {max_sum_subarray(arr, k)}")  # 9`
      }
    ]
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    category: "Array",
    difficulty: "Easy",
    description: "Uses two pointers that move through the array/string to solve problems efficiently. Pointers can move toward each other, away from each other, or in the same direction.",
    keyInsight: "Two pointers eliminate the need for nested loops by intelligently moving pointers based on conditions.",
    useCases: ["Pair with target sum in sorted array", "Remove duplicates", "Container with most water"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    visualizationType: "twopointer",
    examples: [
      {
        title: "Pair with Target Sum",
        description: "Find two numbers in a sorted array that sum to a target.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

pair<int,int> pairWithTargetSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target)
            return {left, right};
        else if (sum < target)
            left++;  // need larger sum
        else
            right--; // need smaller sum
    }
    return {-1, -1}; // not found
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 6};
    int target = 6;
    auto [l, r] = pairWithTargetSum(arr, target);
    cout << "Indices: " << l << ", " << r; // 1, 3
    return 0;
}`,
        python: `def pair_with_target_sum(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1   # need larger sum
        else:
            right -= 1  # need smaller sum
    
    return [-1, -1]  # not found

arr = [1, 2, 3, 4, 6]
target = 6
print(pair_with_target_sum(arr, target))  # [1, 3]`
      }
    ]
  },
  {
    id: "fast-slow-pointers",
    name: "Fast & Slow Pointers",
    category: "Linked List",
    difficulty: "Medium",
    description: "Uses two pointers moving at different speeds through a linked list or array. The fast pointer moves twice as fast as the slow pointer.",
    keyInsight: "If there's a cycle, the fast pointer will eventually lap the slow pointer. The meeting point reveals cycle properties.",
    useCases: ["Detect cycle in linked list", "Find middle of linked list", "Happy number detection"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    visualizationType: "linkedlist",
    examples: [
      {
        title: "Detect Cycle in Linked List",
        description: "Determine if a linked list has a cycle using Floyd's algorithm.",
        cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;        // move 1 step
        fast = fast->next->next;  // move 2 steps
        
        if (slow == fast)
            return true; // cycle detected
    }
    return false;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = head->next; // cycle!
    cout << (hasCycle(head) ? "Has cycle" : "No cycle");
    return 0;
}`,
        python: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def has_cycle(head):
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next         # move 1 step
        fast = fast.next.next    # move 2 steps
        
        if slow == fast:
            return True  # cycle detected
    
    return False

# Create list with cycle: 1 -> 2 -> 3 -> (back to 2)
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = head.next  # cycle!
print(has_cycle(head))  # True`
      }
    ]
  },
  {
    id: "merge-intervals",
    name: "Merge Intervals",
    category: "Array",
    difficulty: "Medium",
    description: "Deals with overlapping intervals. After sorting by start time, merge intervals that overlap with each other.",
    keyInsight: "Sort intervals by start time. Two intervals overlap if the start of one is ≤ end of the other.",
    useCases: ["Merge overlapping meetings", "Insert new interval", "Employee free time"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    visualizationType: "intervals",
    examples: [
      {
        title: "Merge Overlapping Intervals",
        description: "Given a list of intervals, merge all overlapping intervals.",
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    
    // Sort by start time
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for (int i = 1; i < intervals.size(); i++) {
        auto& last = merged.back();
        if (intervals[i][0] <= last[1]) {
            // Overlap: extend the end
            last[1] = max(last[1], intervals[i][1]);
        } else {
            // No overlap: add new interval
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}

int main() {
    vector<vector<int>> intervals = {{1,3},{2,6},{8,10},{15,18}};
    auto result = merge(intervals);
    for (auto& iv : result)
        cout << "[" << iv[0] << "," << iv[1] << "] ";
    // [1,6] [8,10] [15,18]
    return 0;
}`,
        python: `def merge_intervals(intervals):
    if not intervals:
        return []
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    
    merged = [intervals[0]]
    
    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        if start <= last_end:
            # Overlap: extend the end
            merged[-1][1] = max(last_end, end)
        else:
            # No overlap: add new interval
            merged.append([start, end])
    
    return merged

intervals = [[1,3],[2,6],[8,10],[15,18]]
print(merge_intervals(intervals))
# [[1, 6], [8, 10], [15, 18]]`
      }
    ]
  },
  {
    id: "cyclic-sort",
    name: "Cyclic Sort",
    category: "Array",
    difficulty: "Easy",
    description: "An in-place sorting algorithm for arrays containing numbers in a given range. Place each number at its correct index by swapping.",
    keyInsight: "If numbers are in range [1, n], each number i should be at index i-1. Keep swapping until each is at the right place.",
    useCases: ["Find missing number", "Find all duplicates", "First K missing positives"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    visualizationType: "array",
    examples: [
      {
        title: "Find Missing Number",
        description: "Given array containing n-1 numbers in range [1,n], find the missing number.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMissing(vector<int>& nums) {
    int i = 0;
    while (i < nums.size()) {
        int j = nums[i] - 1; // correct index for nums[i]
        if (nums[i] < nums.size() && nums[i] != nums[j]) {
            swap(nums[i], nums[j]); // place at correct index
        } else {
            i++;
        }
    }
    
    // Find position where number doesn't match
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != i + 1)
            return i + 1;
    }
    return nums.size(); // last number missing
}

int main() {
    vector<int> nums = {3, 0, 1};
    cout << "Missing: " << findMissing(nums); // 2
    return 0;
}`,
        python: `def find_missing(nums):
    i = 0
    n = len(nums)
    
    while i < n:
        j = nums[i] - 1  # correct index for nums[i]
        if 0 < nums[i] <= n and nums[i] != nums[j]:
            nums[i], nums[j] = nums[j], nums[i]  # swap
        else:
            i += 1
    
    # Find position where number doesn't match
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    
    return n  # last number missing

nums = [3, 0, 1]
print(f"Missing: {find_missing(nums)}")  # 2`
      }
    ]
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Array",
    difficulty: "Easy",
    description: "Efficiently searches a sorted array by repeatedly dividing the search space in half. Works on any monotonic function.",
    keyInsight: "Each comparison eliminates half the remaining search space. Key is identifying what to search and how to move boundaries.",
    useCases: ["Search in sorted array", "Find first/last position", "Search in rotated array", "Find peak element"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    visualizationType: "array",
    examples: [
      {
        title: "Binary Search",
        description: "Find the index of a target in a sorted array, or return -1.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // avoid overflow
        
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            left = mid + 1;  // target in right half
        else
            right = mid - 1; // target in left half
    }
    return -1; // not found
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    cout << binarySearch(arr, 7);  // 3
    cout << binarySearch(arr, 6);  // -1
    return 0;
}`,
        python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1   # target in right half
        else:
            right = mid - 1  # target in left half
    
    return -1  # not found

arr = [1, 3, 5, 7, 9, 11]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1`
      }
    ]
  },
  {
    id: "tree-bfs",
    name: "Tree BFS",
    category: "Tree",
    difficulty: "Medium",
    description: "Level-order traversal of a tree using a queue. Processes all nodes at one level before moving to the next level.",
    keyInsight: "Use a queue (FIFO). Process all nodes at current level, adding their children to explore next level.",
    useCases: ["Level order traversal", "Minimum depth of tree", "Connect level-order siblings", "Zigzag traversal"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    visualizationType: "tree",
    examples: [
      {
        title: "Level Order Traversal",
        description: "Traverse a binary tree level by level from left to right.",
        cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}`,
        python: `from collections import deque

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def level_order(root):
    result = []
    if not root:
        return result
    
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result`
      }
    ]
  },
  {
    id: "tree-dfs",
    name: "Tree DFS",
    category: "Tree",
    difficulty: "Medium",
    description: "Depth-first traversal of a tree using recursion or a stack. Explores as far as possible along each branch before backtracking.",
    keyInsight: "Three variants: pre-order (root, left, right), in-order (left, root, right), post-order (left, right, root).",
    useCases: ["Path sum problems", "In-order traversal", "Tree serialization", "Lowest common ancestor"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h is height",
    visualizationType: "tree",
    examples: [
      {
        title: "Path Sum",
        description: "Check if there's a root-to-leaf path with a given sum.",
        cpp: `#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool hasPathSum(TreeNode* root, int targetSum) {
    if (!root) return false;
    
    // Leaf node check
    if (!root->left && !root->right)
        return root->val == targetSum;
    
    // Recursively check left and right subtrees
    int remaining = targetSum - root->val;
    return hasPathSum(root->left, remaining) || 
           hasPathSum(root->right, remaining);
}

int main() {
    //       5
    //      / \\
    //     4   8
    //    /   / \\
    //   11  13  4
    //  /  \\     \\
    // 7    2     1
    // Path sum = 22: 5->4->11->2
    return 0;
}`,
        python: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def has_path_sum(root, target_sum):
    if not root:
        return False
    
    # Leaf node check
    if not root.left and not root.right:
        return root.val == target_sum
    
    # Recursively check left and right subtrees
    remaining = target_sum - root.val
    return (has_path_sum(root.left, remaining) or 
            has_path_sum(root.right, remaining))

# Tree:      5
#           / \\
#          4   8
#         /   / \\
#        11  13  4
#       /  \\     \\
#      7    2     1
# has_path_sum(root, 22) -> True (5->4->11->2)`
      }
    ]
  },
  {
    id: "two-heaps",
    name: "Two Heaps",
    category: "Heap",
    difficulty: "Hard",
    description: "Uses a max-heap and min-heap to efficiently maintain a running median or partition elements into two groups.",
    keyInsight: "Max-heap holds the smaller half, min-heap holds the larger half. Balance them to find median in O(log n).",
    useCases: ["Find median from data stream", "Sliding window median", "Maximize capital"],
    timeComplexity: "O(log n) per insertion",
    spaceComplexity: "O(n)",
    visualizationType: "heap",
    examples: [
      {
        title: "Find Median from Data Stream",
        description: "Continuously insert numbers and find median after each insertion.",
        cpp: `#include <iostream>
#include <queue>
using namespace std;

class MedianFinder {
    priority_queue<int> maxHeap;          // lower half
    priority_queue<int, vector<int>, greater<int>> minHeap; // upper half
    
public:
    void addNum(int num) {
        maxHeap.push(num); // always push to max heap first
        
        // Balance: ensure all maxHeap elements <= all minHeap elements
        if (!minHeap.empty() && maxHeap.top() > minHeap.top()) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        }
        
        // Keep sizes balanced (differ by at most 1)
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() == minHeap.size())
            return (maxHeap.top() + minHeap.top()) / 2.0;
        return maxHeap.top(); // odd count: max heap has one more
    }
};`,
        python: `import heapq

class MedianFinder:
    def __init__(self):
        self.max_heap = []  # lower half (negate for max-heap)
        self.min_heap = []  # upper half
    
    def add_num(self, num):
        heapq.heappush(self.max_heap, -num)  # push to max heap
        
        # Balance: ensure max_heap top <= min_heap top
        if (self.min_heap and 
            -self.max_heap[0] > self.min_heap[0]):
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        
        # Keep sizes balanced
        if len(self.max_heap) > len(self.min_heap) + 1:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        elif len(self.min_heap) > len(self.max_heap):
            val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -val)
    
    def find_median(self):
        if len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0
        return float(-self.max_heap[0])`
      }
    ]
  },
  {
    id: "subsets",
    name: "Subsets / Backtracking",
    category: "Backtracking",
    difficulty: "Medium",
    description: "Generate all possible subsets, permutations, or combinations by building candidates incrementally and abandoning paths that can't lead to solutions.",
    keyInsight: "At each step, decide to include or exclude an element. This creates a decision tree. Pruning eliminates invalid branches early.",
    useCases: ["Generate all subsets", "Permutations", "Combinations", "N-Queens problem"],
    timeComplexity: "O(2^n) for subsets, O(n!) for permutations",
    spaceComplexity: "O(n)",
    visualizationType: "tree",
    examples: [
      {
        title: "Generate All Subsets",
        description: "Given a set with distinct elements, find all possible subsets.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result = {{}};
    
    for (int num : nums) {
        int size = result.size();
        // Add current number to all existing subsets
        for (int i = 0; i < size; i++) {
            vector<int> newSubset = result[i];
            newSubset.push_back(num);
            result.push_back(newSubset);
        }
    }
    return result;
}

// Backtracking approach
void backtrack(vector<int>& nums, int start, 
               vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back(); // backtrack
    }
}

int main() {
    vector<int> nums = {1, 2, 3};
    auto result = subsets(nums);
    // [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]
    return 0;
}`,
        python: `def subsets(nums):
    result = [[]]
    
    for num in nums:
        # Add current number to all existing subsets
        result += [subset + [num] for subset in result]
    
    return result

# Backtracking approach
def subsets_backtrack(nums):
    result = []
    
    def backtrack(start, current):
        result.append(current[:])  # add copy
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # backtrack
    
    backtrack(0, [])
    return result

nums = [1, 2, 3]
print(subsets(nums))
# [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]`
      }
    ]
  },
  {
    id: "modified-binary-search",
    name: "Modified Binary Search",
    category: "Array",
    difficulty: "Medium",
    description: "Variations of binary search for problems beyond basic search: rotated arrays, finding boundaries, bitonic arrays, etc.",
    keyInsight: "Even if the array isn't fully sorted, you can always determine which half is sorted and where the target might be.",
    useCases: ["Search in rotated sorted array", "Find smallest letter greater than target", "Find peak in bitonic array"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    visualizationType: "array",
    examples: [
      {
        title: "Search in Rotated Sorted Array",
        description: "Search for a target in a rotated sorted array.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid])
                right = mid - 1; // target in left half
            else
                left = mid + 1;  // target in right half
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right])
                left = mid + 1;  // target in right half
            else
                right = mid - 1; // target in left half
        }
    }
    return -1;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << search(nums, 0); // 4
    cout << search(nums, 3); // -1
    return 0;
}`,
        python: `def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1  # target in left half
            else:
                left = mid + 1   # target in right half
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1   # target in right half
            else:
                right = mid - 1  # target in left half
    
    return -1

nums = [4, 5, 6, 7, 0, 1, 2]
print(search_rotated(nums, 0))  # 4
print(search_rotated(nums, 3))  # -1`
      }
    ]
  },
  {
    id: "top-k-elements",
    name: "Top K Elements",
    category: "Heap",
    difficulty: "Medium",
    description: "Find the top K largest/smallest elements using a heap. A min-heap of size K keeps the K largest elements seen so far.",
    keyInsight: "Maintain a heap of size K. For K largest: use min-heap (pop when size > K). The root is always the Kth largest.",
    useCases: ["K largest elements", "K closest points to origin", "Top K frequent elements", "K-th smallest in BST"],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    visualizationType: "heap",
    examples: [
      {
        title: "K Largest Elements",
        description: "Find the K largest elements in an unsorted array.",
        cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> kLargest(vector<int>& nums, int k) {
    // Min-heap of size k
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k)
            minHeap.pop(); // remove smallest
    }
    
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }
    return result;
}

// Kth Largest Element
int kthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top(); // Kth largest
}

int main() {
    vector<int> nums = {3, 1, 5, 12, 2, 11};
    cout << "3rd largest: " << kthLargest(nums, 3); // 5
    return 0;
}`,
        python: `import heapq

def k_largest(nums, k):
    # Min-heap of size k
    min_heap = []
    
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # remove smallest
    
    return min_heap  # contains k largest

def kth_largest(nums, k):
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]  # kth largest

nums = [3, 1, 5, 12, 2, 11]
print(f"3rd largest: {kth_largest(nums, 3)}")  # 5
print(f"3 largest: {sorted(k_largest(nums, 3))}")  # [5, 11, 12]`
      }
    ]
  },
  {
    id: "k-way-merge",
    name: "K-way Merge",
    category: "Heap",
    difficulty: "Hard",
    description: "Merge K sorted arrays/lists efficiently using a min-heap. Always extract the smallest element across all arrays.",
    keyInsight: "Use a min-heap storing (value, array_index, element_index). Always extract minimum and add next element from same array.",
    useCases: ["Merge K sorted lists", "K smallest pairs", "Smallest range covering K lists"],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    visualizationType: "heap",
    examples: [
      {
        title: "Merge K Sorted Lists",
        description: "Merge K sorted linked lists into one sorted list.",
        cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val; // min-heap
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap;
    
    // Add first node of each list
    for (ListNode* list : lists)
        if (list) minHeap.push(list);
    
    ListNode dummy(0);
    ListNode* curr = &dummy;
    
    while (!minHeap.empty()) {
        ListNode* node = minHeap.top();
        minHeap.pop();
        curr->next = node;
        curr = curr->next;
        if (node->next) minHeap.push(node->next);
    }
    return dummy.next;
}`,
        python: `import heapq

class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None
    
    def __lt__(self, other):
        return self.val < other.val

def merge_k_lists(lists):
    min_heap = []
    
    # Add first node of each list
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(min_heap, (node.val, i, node))
    
    dummy = ListNode(0)
    curr = dummy
    
    while min_heap:
        val, i, node = heapq.heappop(min_heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(min_heap, (node.next.val, i, node.next))
    
    return dummy.next`
      }
    ]
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    category: "DP",
    difficulty: "Hard",
    description: "Breaks complex problems into overlapping subproblems and stores solutions to avoid redundant computation. Two approaches: top-down (memoization) and bottom-up (tabulation).",
    keyInsight: "If a problem has optimal substructure and overlapping subproblems, DP applies. Define state, transition, and base cases.",
    useCases: ["0/1 Knapsack", "Longest Common Subsequence", "Fibonacci variants", "Coin change"],
    timeComplexity: "Varies, typically O(n²) or O(n·W)",
    spaceComplexity: "O(n) to O(n·m)",
    visualizationType: "matrix",
    examples: [
      {
        title: "0/1 Knapsack Problem",
        description: "Maximize value of items that fit in a knapsack of capacity W.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int knapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    // dp[i][w] = max value using first i items with capacity w
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            // Don't include item i
            dp[i][w] = dp[i-1][w];
            // Include item i (if it fits)
            if (weights[i-1] <= w) {
                dp[i][w] = max(dp[i][w], 
                    dp[i-1][w - weights[i-1]] + values[i-1]);
            }
        }
    }
    return dp[n][W];
}

int main() {
    vector<int> weights = {1, 3, 4, 5};
    vector<int> values  = {1, 4, 5, 7};
    int W = 7;
    cout << "Max value: " << knapsack(weights, values, W); // 9
    return 0;
}`,
        python: `def knapsack(weights, values, W):
    n = len(weights)
    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(W + 1):
            # Don't include item i
            dp[i][w] = dp[i-1][w]
            # Include item i (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1])
    
    return dp[n][W]

weights = [1, 3, 4, 5]
values  = [1, 4, 5, 7]
W = 7
print(f"Max value: {knapsack(weights, values, W)}")  # 9`
      }
    ]
  },
  {
    id: "graph-traversal",
    name: "Graph BFS/DFS",
    category: "Graph",
    difficulty: "Medium",
    description: "Traverse a graph using Breadth-First Search (BFS) or Depth-First Search (DFS). BFS finds shortest paths; DFS explores all paths.",
    keyInsight: "BFS uses queue for level-by-level traversal (shortest path). DFS uses stack/recursion for deep exploration.",
    useCases: ["Number of islands", "Shortest path", "Course schedule (cycle detection)", "Clone graph"],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    visualizationType: "graph",
    examples: [
      {
        title: "Number of Islands",
        description: "Count connected components of 1s in a 2D grid.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1')
        return;
    
    grid[r][c] = '0'; // mark visited
    dfs(grid, r + 1, c); // down
    dfs(grid, r - 1, c); // up
    dfs(grid, r, c + 1); // right
    dfs(grid, r, c - 1); // left
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                dfs(grid, r, c); // sink the island
                count++;
            }
        }
    }
    return count;
}

int main() {
    vector<vector<char>> grid = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };
    cout << numIslands(grid); // 3
    return 0;
}`,
        python: `def num_islands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != '1':
            return
        
        grid[r][c] = '0'  # mark visited
        dfs(r + 1, c)  # down
        dfs(r - 1, c)  # up
        dfs(r, c + 1)  # right
        dfs(r, c - 1)  # left
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)  # sink the island
                count += 1
    
    return count

grid = [
    ['1','1','0','0','0'],
    ['1','1','0','0','0'],
    ['0','0','1','0','0'],
    ['0','0','0','1','1']
]
print(num_islands(grid))  # 3`
      }
    ]
  },
  {
    id: "monotonic-stack",
    name: "Monotonic Stack",
    category: "Stack",
    difficulty: "Medium",
    description: "A stack that maintains elements in monotonically increasing or decreasing order. Used to find next greater/smaller elements efficiently.",
    keyInsight: "When we push an element, pop all elements that violate the monotonic property. Those popped elements found their answer.",
    useCases: ["Next greater element", "Daily temperatures", "Largest rectangle in histogram", "Trapping rain water"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    visualizationType: "stack",
    examples: [
      {
        title: "Next Greater Element",
        description: "For each element, find the next greater element to its right. Return -1 if none exists.",
        cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> stk; // monotonic decreasing stack (stores indices)
    
    for (int i = 0; i < n; i++) {
        // Pop elements smaller than current
        while (!stk.empty() && nums[stk.top()] < nums[i]) {
            result[stk.top()] = nums[i]; // found next greater!
            stk.pop();
        }
        stk.push(i);
    }
    return result;
}

int main() {
    vector<int> nums = {2, 1, 2, 4, 3};
    auto result = nextGreaterElement(nums);
    for (int x : result) cout << x << " ";
    // 4 2 4 -1 -1
    return 0;
}`,
        python: `def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # monotonic decreasing stack (stores indices)
    
    for i in range(n):
        # Pop elements smaller than current
        while stack and nums[stack[-1]] < nums[i]:
            result[stack.pop()] = nums[i]  # found next greater!
        stack.append(i)
    
    return result

nums = [2, 1, 2, 4, 3]
print(next_greater_element(nums))
# [4, 2, 4, -1, -1]`
      }
    ]
  }
];

export const categories = [...new Set(dsaPatterns.map(p => p.category))];
export const difficulties = ["Easy", "Medium", "Hard"] as const;
