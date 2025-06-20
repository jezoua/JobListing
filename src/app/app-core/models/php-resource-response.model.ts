export interface PHPResourceResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  message: string;
}

export interface PaginationLink {
  url: string;
  label?: string;
  active?: boolean;
  filters?: {
    // Optional filters object
    [key: string]: any; // Key-value pairs for each filter, e.g., { status: 'active', category: 'books' }
  };
}
