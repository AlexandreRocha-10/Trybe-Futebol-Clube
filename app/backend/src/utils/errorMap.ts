const errorMap: { [key: string]: number } = {
  teamNotFound: 404,
  invalidValue: 422,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  conflict: 409,
};

const mapError = (type: string): number => errorMap[type] || 500;

export {
  errorMap,
  mapError,
};
