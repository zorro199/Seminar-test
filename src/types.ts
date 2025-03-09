export interface IPost {
    id: number,
    title: string,
    body: string
}

export interface IPostId extends Pick<IPost, 'id'> {}

export type ResponseIPost = Array<IPost>
