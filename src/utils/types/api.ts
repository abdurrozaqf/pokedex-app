export interface Response<T = any> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export type ResponseResults = {
  name: string;
  url: string;
};
