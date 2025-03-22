import { BASEURL } from "../constants";
import Course from "../types/course";
import Lesson from "../types/lesson";

export const getCourses = async (getHeaders: () => Promise<HeadersInit>): Promise<Course[]> => {
    try {
        const _headers = await getHeaders()
        const response = await fetch(
            `${BASEURL}courses`,
            {
                method: 'GET',
                headers: _headers,
            }
        );

        const data: Course[] = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getCourse = async (id: string | undefined, getHeaders: () => Promise<HeadersInit>): Promise<Course> => {

    const _headers = await getHeaders();
    try {
        const response = await fetch(
            `${BASEURL}courses/${id}`,
            {
                method: 'GET',
                headers: _headers
            }
        );
        const data: Course = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return {} as Course;
    }

}

export const getCourseLessons = async (id: string | undefined, getHeaders: () => Promise<HeadersInit>): Promise<Lesson[]> => {

    try {
    const _headers = await getHeaders();
        const response = await fetch(
            `${BASEURL}courses/${id}/lessons`,
            {
                method: 'GET',
                headers: _headers
            }
        );
        const data: Lesson[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [] as Lesson[];
    }

}