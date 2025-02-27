import { BASEURL } from "../constants";
import Course from "../types/course";
import Lesson from "../types/lesson";

export const getCourses = async (): Promise<Course[]> => {
    try {
        const response = await fetch(
            `${BASEURL}courses`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data: Course[] = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getCourse = async (id: string | undefined): Promise<Course> => {

    try {
        const response = await fetch(
            `${BASEURL}courses/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data: Course = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return {} as Course;
    }

}

export const getCourseLessons = async (id: string | undefined): Promise<Lesson[]> => {

    try {
        const response = await fetch(
            `${BASEURL}courses/${id}/lessons`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data: Lesson[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [] as Lesson[];
    }

}