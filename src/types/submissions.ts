interface IUserIdData {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface IUserSubmission {
    user_id: IUserIdData;
    submissionUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ISubmission {
    course_id: string;
    lesson_id?: string | null;
    title: string;
    description?: string;
    start_date: any;
    due_date: any;
    submissions?: IUserSubmission[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default ISubmission;