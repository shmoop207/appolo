export interface IEnv{
    version?:string,
    type?:string
    rootDir?:string
    [index:string]:any
}