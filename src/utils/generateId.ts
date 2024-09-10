export const generateId = (): string => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
  const randomNum = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
  return `${timestamp}-${randomNum}`;
};
