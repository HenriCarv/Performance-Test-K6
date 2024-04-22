import http from 'k6/http';
import { sleep, check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das req tem que responder em até 2 seg
    http_req_failed: ['rate<0.01'] // 1% das req pode ocorrer erro
  }
};

export default function () {
  const url = 'https://reqres.in/api/users'

  const payload = JSON.stringify(
    {name: 'morpheus', job: 'leader'}
  )

  const headers = {
    'headers': {
      'Content-Type' : 'application/json'
    }
  }

  const res = http.post(url, payload, headers);

  check(res, {
    'satus should be 201': (r) => r.status === 201
  })

  sleep(1);
}