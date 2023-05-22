function checkAllCharsAreInt(input: string): boolean {
  for (let i = 0; i < input.length; i++) {
    if (isNaN(parseInt(input[i]))) {
      return false;
    }
  }
  return true;
}

export function validate_id(id: string): boolean {
  let trimmed_id = id.trim();
  return true;
  // return trimmed_id.length == 9 && checkAllCharsAreInt(trimmed_id)
}
