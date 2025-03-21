import { BASEURL } from "../constants";

export const getTotalCourses = async (getHeaders: () => Promise<HeadersInit>) => {
    const _headers = await getHeaders()
    const response = await fetch(
        `${BASEURL}courses?count=true`,
        {
            method: 'GET',
            headers: _headers
        }
    );
    const data = await response.json();
    return data;
}

export const getTotalLearners = async (getHeaders: () => Promise<HeadersInit>) => {
    const _headers = await getHeaders()
    const response = await fetch(
        `${BASEURL}learners?count=true`,
        {
            method: 'GET',
            headers: _headers
        }
    );
    const data = await response.json();
    return data;
}