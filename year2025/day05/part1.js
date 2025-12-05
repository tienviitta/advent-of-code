export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);

  // Parse fresh ingredient ID ranges
  const ranges = [];
  let i = 0;
  while (i < lines.length && lines[i] !== "") {
    const [start, end] = lines[i].split("-").map(Number);
    ranges.push({ start, end });
    i++;
  }

  // Skip blank line
  i++;

  // Parse available ingredient IDs
  const availableIds = [];
  while (i < lines.length) {
    availableIds.push(Number(lines[i]));
    i++;
  }

  // Count how many available IDs are fresh (fall within any range)
  let freshCount = 0;
  for (const id of availableIds) {
    if (isFresh(id, ranges)) {
      freshCount++;
    }
  }

  return freshCount;
}

function isFresh(id, ranges) {
  for (const range of ranges) {
    if (id >= range.start && id <= range.end) {
      return true;
    }
  }
  return false;
}
