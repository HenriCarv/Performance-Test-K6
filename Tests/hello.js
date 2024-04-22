import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  const res = http.get('https://reqres.in');

  check(res, {
    'satus should be 200': (r) => r.status === 200
  })

  sleep(1);
}