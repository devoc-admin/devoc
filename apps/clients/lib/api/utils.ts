export function areCustomerAndProjectIdValid(
  customerIdNumber: number,
  projectIdNumber: number
) {
  return (
    Number.isInteger(customerIdNumber) &&
    customerIdNumber > 0 &&
    Number.isInteger(projectIdNumber) &&
    projectIdNumber > 0
  );
}

export function isCustomerIdValid(customerIdNumber: number) {
  return Number.isInteger(customerIdNumber) && customerIdNumber > 0;
}
