export interface Request {
  offset?: string;
}

export interface Response {
  count: number;
  next: string;
  previous: string;
  results: Results[];
}

export type Results = {
  name: string;
  url: string;
};
