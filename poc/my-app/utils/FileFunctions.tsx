export const createLocalFile = (blob: Blob, filename: string) => {
  const file = new File([blob], filename);
  console.log("creating file: " + file.name + " of type: " + file.type);
  return file;
};
