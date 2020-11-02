export type done = () => void
export type fail = (msg: string) => void
export type callback = (succeed: boolean, message?: string) => void
export type PageData<T> = { pageIndex?: number; pageSize: number; data?: T[] }
export type PageDataD<T> = PageData<T> & {
    totalCount?: number
    currentPage: number
    result?: T[]
}

export function invoke(func: Function, ...param: any[]) {
    if (func) {
        func.call(null, ...param)
    }
    return param
}

export type PageDataE<T> = {
    loading?: boolean;
    current?: number;
    total?: number;
    pageSize?: number;
    dataSource?: T[];
    onChange?: (page: number) => {}
}

