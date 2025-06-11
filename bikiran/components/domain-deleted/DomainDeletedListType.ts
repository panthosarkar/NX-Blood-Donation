type Currency ={
    currency: string;
    rate: number;
}

type Pagination ={
    currentPage: number;
    contentPerPage: number;
    totalContent: number;
    numberOfPages: number;
    showingFrom: number;
    showingTo: number;
    pages: any[];
}

export type DomainDeletedListType ={
    domains: any[];
    currencies: Currency[];
    pagination: Pagination;
}
