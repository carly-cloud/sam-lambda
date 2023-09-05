// to make the file a module and avoid the TypeScript error
export { }

declare global {
  namespace Express {
    interface Request {
      Authorization: AuthorizationInterface
    }

    interface Response {
      success: <T = Record<string, unknown>>(data?: T | T[]) => void
      fail: (errorMessage?: string) => void
    }
  }
}
