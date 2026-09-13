export type ActionSuccess<T = void> = T extends void
  ? { success: true }
  : { success: true; response: T };

export type ActionFailure = { success: false; error: string };

export type ActionResult<T = void> = ActionSuccess<T> | ActionFailure;

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Erreur inconnue";
}
