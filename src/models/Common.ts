
export class Paging {
    page: number;
    pageSize: number;
    keyword?: string;

    constructor() {
        this.page = 0;
        this.pageSize = 4;
    }
}

export class PagingResponse {
    page: number = 0;
    pageSize: number = 0;
    totalPage: number = 0;
    totalRecord: number = 0;
}
