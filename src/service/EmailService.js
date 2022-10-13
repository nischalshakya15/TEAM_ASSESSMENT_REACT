import axios from "axios";
import { getFormData } from "../utils/AssessmentUtil";
import { EMAILS_URL } from "../constant/APIConstant";

/**
 * It takes a file, creates a form data object with the file, and sends it to the server
 * @param file - The file to be uploaded.
 * @returns An array of emails
 */
export async function getEmails(file) {
  return await axios.post(EMAILS_URL, getFormData(file));
}
