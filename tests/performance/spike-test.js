import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },  // Estado normal
    { duration: '10s', target: 150 }, // ¡PICO REPENTINO! (Spike)
    { duration: '30s', target: 150 }, // Mantener el pico
    { duration: '10s', target: 10 },  // Descenso rápido
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://github.com/mariaquispecc/guia7'); // Reemplazar por tu endpoint real
  
  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  sleep(0.5); // Interacciones más rápidas durante el pico
}