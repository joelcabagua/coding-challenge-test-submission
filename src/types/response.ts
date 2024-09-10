interface SuccessResult<T> {
  status: 'success';
  details: T;
}

interface ErrorResult {
  status: 'error';
  errormessage: string;
}

type Result<T> = SuccessResult<T> | ErrorResult;
