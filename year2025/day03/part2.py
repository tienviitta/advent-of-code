class Solution:
    def lobby(self) -> int:
        total = 0
        for line in open("year2025/day03/test.txt"):
            bank = list(map(int, line.strip()))
            # print(bank)
            jolts = 0
            for index in range(11):
                digit = max(bank[: index - 11])
                bank = bank[bank.index(digit) + 1 :]
                jolts = (jolts * 10) + digit
            # Last digit
            jolts = (jolts * 10) + max(bank)
            total += jolts
        return total


if __name__ == "__main__":
    msol = Solution()
    sol = msol.lobby()
    print(sol)
