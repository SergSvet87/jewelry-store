import { ZodSchema } from 'zod';
import { request } from './requestService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SubmitFormOptions<TData, _> {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
  data: TData;
  schema: ZodSchema<TData>;
}

export const submitForm = async <TData, TResponse>(
  options: SubmitFormOptions<TData, TResponse>
): Promise<TResponse> => {
  const parseResult = options.schema.safeParse(options.data);

  if (!parseResult.success) {
    const errors = parseResult.error.format();
    throw new Error(JSON.stringify(errors));
  }

  return await request<TResponse, TData>({
    url: options.url,
    method: options.method,
    data: options.data,
  });
};
