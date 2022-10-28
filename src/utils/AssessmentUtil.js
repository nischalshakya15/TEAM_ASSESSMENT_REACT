/**
 * It takes a file and returns a FormData object with the file appended to it
 * @param file - The file to be uploaded.
 * @returns A new FormData object with the file appended to it.
 */
export function getFormData(file) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}
