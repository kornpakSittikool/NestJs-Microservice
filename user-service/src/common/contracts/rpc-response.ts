export type RpcError = {
  code: string;
  message: string;
  detail?: unknown;
};

export type RpcResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: RpcError };

export const ok = <T>(data: T): RpcResponse<T> => ({ ok: true, data });

export const fail = (
  code: string,
  message: string,
  detail?: unknown,
): RpcResponse<never> => ({
  ok: false,
  error: { code, message, detail },
});
