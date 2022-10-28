import axios from "axios";
import {getFormData} from "../utils/AssessmentUtil";
import {GROUP_AVERAGE_OF_AVERAGE_URL, GROUP_AVERAGE_URL,} from "../constant/APIConstant";


/**
 * It returns the average of each group in the file, without sorting and grouping
 * @param file - The file to be uploaded
 * @param groupByAssessment - If true, the results will be grouped by assessment. If false, the results will be grouped by
 * student.
 * @param sorted - true/false
 * @returns The average of the group.
 */
export async function getGroupAverageWithoutSortedAndGroup(file, groupByAssessment, sorted) {
    return await axios.post(GROUP_AVERAGE_URL, getFormData(file), {
        params: {
            'group-by-assessment': groupByAssessment,
            'sorted': sorted
        }
    });
}

/**
 * It takes a file, and returns the average of the group of numbers in the file
 * @param file - The file to be uploaded.
 * @returns The average of the group.
 */
export async function getGroupAverage(file) {
    return await axios.post(GROUP_AVERAGE_URL, getFormData(file));
}

/**
 * It takes a file, sends it to the server, and returns the server's response
 * @param file - The file to be uploaded.
 * @returns The average of the averages of the groups.
 */
export async function getGroupAverageOfAverage(file) {
    return await axios.post(GROUP_AVERAGE_OF_AVERAGE_URL, getFormData(file));
}
