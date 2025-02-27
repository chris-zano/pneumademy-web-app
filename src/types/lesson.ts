export enum ContentType {
    Video = "video",
    PowerPoint = "powerpoint",
    PDF = "pdf",
    WordDocument = "word_document",
    Image = "image",
    Audio = "audio"
}

interface Lesson {
    _id: string;
    course_id: string;
    title: string;
    content_type: ContentType;
    content: string;
    completedBy: string[];
}

export default Lesson;