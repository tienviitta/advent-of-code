from typing import List


class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        stack = []
        nextg = {}
        for num in reversed(nums2):
            while stack and stack[-1] <= num:
                stack.pop()
            if stack:
                nextg[num] = stack[-1]
            else:
                nextg[num] = -1
            stack.append(num)
        return [nextg[num] for num in nums1]


if __name__ == "__main__":
    msol = Solution()
    nums1 = [4, 1, 2]
    nums2 = [1, 3, 4, 2]
    sol = msol.nextGreaterElement(nums1, nums2)
    print(sol)
