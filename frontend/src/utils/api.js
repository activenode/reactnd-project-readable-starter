const port = process.env.PORT || 3001;
const origin = process.env.ORIGIN || `http://localhost:${port}`;

const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'something-123');

export function request(endpoint, body, method='GET') {
  return fetch(`${origin}${endpoint}`, {
    headers: headers,
    method,
    mode: 'cors',
    body: body ? JSON.stringify(body) : undefined
  });
}
