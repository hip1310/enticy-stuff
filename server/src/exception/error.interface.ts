// Define an interface named ErrnoException that extends the built-in Error interface.
export interface ErrnoException extends Error {
  // Optional property representing the error number.
  errno?: number;
  // Optional property representing the error code.
  code?: string;
  // Optional property representing the path associated with the error.
  path?: string;
  // Optional property representing the system call that triggered the error.
  syscall?: string;
  // Optional property representing the stack trace associated with the error.
  stack?: string;
}
