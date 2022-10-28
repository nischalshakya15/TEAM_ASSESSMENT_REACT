import axios from "axios";
import {getFormData} from "../utils/AssessmentUtil";
import {INDIVIDUAL_AVERAGE_OF_AVERAGE_URL, INDIVIDUAL_AVERAGE_URL,} from "../constant/APIConstant";


/**
 * It takes a file, a boolean value, a boolean value, and an email address, and returns a promise that resolves to an
 * object containing the data from the server
 * @param file - The file to be uploaded.
 * @param groupByAssessment - If true, the results will be grouped by assessment.
 * @param sorted - true/false
 * @param email - The email of the user to get the average for.
 * @returns The average of assessment scores.
 */
export async function getIndividualAverage(file, groupByAssessment, sorted, email) {
    return await axios.post(INDIVIDUAL_AVERAGE_URL, getFormData(file), {
        params: {
            'group-by-assessment': groupByAssessment,
            'sorted': sorted,
            'email': email
        }
    });
}

/**
 * It takes a file and an email address, and returns the average of the grades for that email address
 * @param file - The file to be uploaded
 * @param email - The email of the user you want to get the average for.
 * @returns The average of the individual's scores.
 */
export async function getIndividualAverageByEmail(file, email) {
    return await axios.post(INDIVIDUAL_AVERAGE_URL, getFormData(file), {
        params: {
            'email': email
        }
    });
}


/**
 * It takes a file and an email address, and returns the average of the averages of the grades of the student with that
 * email address
 * @param file - The file that you want to upload.
 * @param email - The email of the user you want to get the average of averages for.
 * @returns The average of the averages of the individual's grades.
 */
export async function getIndividualAverageOfAverage(file, email) {
    return await axios.post(INDIVIDUAL_AVERAGE_OF_AVERAGE_URL, getFormData(file), {
        params: {
            'email': email
        }
    });
}
