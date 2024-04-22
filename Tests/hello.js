import http from 'k6/http';
import { sleep, check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

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