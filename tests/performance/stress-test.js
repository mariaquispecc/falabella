import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 20 },  // Carga ligera
    { duration: '30s', target: 50 },  // Carga pesada
    { duration: '30s', target: 100 }, // Al límite del estrés
    { duration: '15s', target: 0 },   // Recuperación
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'], // Permitir hasta 5% de errores bajo estrés extremo
  },
};

export default function () {
  const res = http.get('https://github.com/mariaquispecc/guia7'); // Reemplazar por tu endpoint real
  
  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  sleep(1);
}