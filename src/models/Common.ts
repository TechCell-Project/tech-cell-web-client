export class Paging {
    page: number;
    pageSize: number;
    keyword?: string;

    constructor() {
        this.page = 0;
        this.pageSize = 8;
    }
}

export class PagingResponse<T = unknown> {
    page: number = 0;
    pageSize: number = 0;
    totalPage: number = 0;
    totalRecord: number = 0;
    data: T[] = [];
}
