export async function handleResponse(response) {
  if (!response.ok) {
    throw Error(`Resposne status code: ${response.status}`);
  }
  return await response.json();
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
