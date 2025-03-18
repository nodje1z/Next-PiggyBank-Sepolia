import { FormData } from '@/components/contact';

export function sendEmail(data: FormData): Promise<{ message: string }> {
  const apiEndpoint = '/api/email';

  return fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

