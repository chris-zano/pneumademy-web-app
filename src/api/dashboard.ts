import { BASEURL } from "../constants";

export const getTotalCourses = async () => {
    const response = await fetch(`${BASEURL}courses?count=true`);
    const data = await response.json();
    console.log({data})
    return data;
}

export const getTotalLearners = async () => {
    const response = await fetch(`${BASEURL}learners?count=true`);
    const data = await response.json();
    console.log({data})
    return data;
}