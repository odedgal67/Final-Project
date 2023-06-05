export function truncate_with_dots(str: string, len: number): string {
  if (str.length > len) {
    return str.substring(0, len - 3) + "...";
  }
  return str;
}

//thank you chatgpt for the following:
export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export function extractFileNameFromUri(uri: string): string {
  // Split the URI by slashes
  const parts = uri.split("/");

  // Get the last part of the split URI, which should be the file name
  const fileName = parts[parts.length - 1];

  // Return the file name
  return fileName;
}

export function extractFileTypeFromUri(uri: string): string {
  // Extract the file name from the URI
  const fileName = extractFileNameFromUri(uri);

  // Split the file name by dots
  const nameParts = fileName.split(".");

  // Get the last part of the split file name, which should be the file type (extension)
  const fileType = nameParts[nameParts.length - 1];

  // Return the file type
  return fileType;
}
