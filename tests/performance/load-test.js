import http from 'k6/http';
import { sleep, check } from 'k6';

// Configuración de la carga
export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp-up: subir a 10 usuarios en 10s
    { duration: '40s', target: 10 }, // Altiplano: mantener 10 usuarios por 40s
    { duration: '10s', target: 0 },  // Ramp-down: bajar a 0 usuarios en 10s
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // El error rate debe ser menor al 1%
    http_req_duration: ['p(95)<2000'], // El 95% de las peticiones debe responder en < 2s
  },
};

export default function () {
  // Simular la búsqueda de un producto
  const url = 'https://github.com/mariaquispecc/guia7'; // Reemplazar por tu API / endpoint de búsqueda real
  const res = http.get(url);

  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  sleep(1); // Simular tiempo de lectura del usuario
}