export type ApiResponse<TData = {}> = {
  data?: TData & {
    message?: string;
  };
  status?: number;
};
