let currentFile: File | null = null;

export const setUploadedFile = (file: File) => {
  currentFile = file;
};

export const getUploadedFile = (): File | null => {
  return currentFile;
};

export const clearUploadedFile = () => {
  currentFile = null;
};
