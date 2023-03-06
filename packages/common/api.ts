export type ApiResponse<TData = {}> = TData | ({ status?: number } & {});
