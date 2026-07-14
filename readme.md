## UNIVERSIDAD NACIONAL DE SAN CRISTÓBAL DE HUAMANGA

### FACULTAD DE INGENIERÍA DE MINAS, GEOLOGÍA Y CIVIL

### ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS

<img width="338" height="453" alt="image" center src="https://github.com/user-attachments/assets/661444c5-8d7d-4d61-956d-85fd64b48749" />

### TRABAJO FINAL

Asignatura : Pruebas y Aseguramiento de la Calidad de Software

Docente : Ing. LIZBETH JAICO QUISPE

Estudiante:

- QUISPE CCAHUANA, María Leonela

URL Informe: https://docs.google.com/document/d/1D3aQYAEUhxlREPM13Ta_x6j-iPz88Ceul7VMftojC3w/edit?usp=sharing


#### 1. INTRODUCCIÓN Y PROPÓSITO
El aseguramiento de la calidad de software (SQA) moderno requiere de un enfoque holístico que trascienda las pruebas funcionales manuales. Este informe consolida la implementación de una estrategia de pruebas e integración sobre el proyecto de software, estructurada bajo cuatro pilares metodológicos:
1. **Integración Continua (CI/CD):** Ejecución automatizada de pruebas unitarias, de API e interfaces mediante GitHub Actions.
2. **Análisis Estático y Cobertura (Quality Gates):** Verificación de la salud del código con SonarCloud e imposición de umbrales estrictos de cobertura con Jest ($70\%$).
3. **Pruebas de Rendimiento (k6):** Simulación de carga, estrés y picos dinámicos utilizando Grafana k6 sobre el sistema.

#### 2. Pipeline de Integración Continua con GitHub Actions

- Se configuraron e instalaron entornos locales estables para testing lógico e interfaz
- Pipeline de Pruebas Unitarias (ci-jest.yml): Ejecuta las pruebas unitarias y de API REST de nivel de integración rápidas en cada push.
- Pipeline de Interfaz Web (ci-playwright.yml): Ejecuta los tests del navegador en los pull_request y exporta los artefactos HTML del reporte de Playwright.
- Fallo Provocado: Se alteró intencionalmente una aserción matemática del carrito en tests/unit/ para simular código inestable.
- Resultado: GitHub Actions interrumpió el proceso de compilación, impidiendo la fusión en main de manera segura (X roja). Tras la corrección de la lógica, se obtuvo la verificación limpia (✔ verde).

<img width="824" height="395" alt="image" src="https://github.com/user-attachments/assets/55c69d92-c241-4ab7-a201-094809ced8b9" />

<img width="833" height="410" alt="image" src="https://github.com/user-attachments/assets/6aacab3a-7d66-4589-ac14-4218cee70d81" />

#### 3. Cobertura de Código y Calidad (Quality Gate)

- Se definió un Quality Gate estricto que obliga a Jest a lanzar un código de salida con error si la cobertura cae por debajo del $70\%$ en cualquier categoría
- Se integró SonarCloud creando el archivo sonar-project.properties para auditar la deuda técnica, vulnerabilidades y code smells mediante el pipeline sonarcloud.yml utilizando el token seguro SONAR_TOKEN.

<img width="746" height="248" alt="image" src="https://github.com/user-attachments/assets/5264592f-e9fc-4cf7-b40b-5b5c564f7dbb" />

#### 4. Rendimiento y Pruebas No Funcionales con k6

- Se diseñaron e implementaron scripts automatizados en JavaScript utilizando Grafana k6 para evaluar el comportamiento elástico del servidor.
- Tabla comparativa:
  
  <img width="717" height="481" alt="image" src="https://github.com/user-attachments/assets/ee904892-3f7f-4250-8348-0f38e813c2c6" />

#### 5.  CONCLUSIONES

- El proyecto ha alcanzado un nivel sobresaliente de madurez técnica en términos de automatización, integración continua (CI/CD) y calidad de código, superando con un $87.50\%$ el estricto umbral de cobertura del $70\%$ (Quality Gate) y obteniendo la aprobación de SonarCloud. No obstante, las pruebas no funcionales revelan que el sistema no está listo para producción: bajo escenarios de alta concurrencia (Stress y Spike con k6) la infraestructura colapsa severamente registrando hasta un $28.40\%$ de pérdida de peticiones por desconexión de red (Connection Reset) y latencias críticas de hasta $32.8$ segundos, lo cual, sumado a la falta de controles de mitigación contra ataques de fuerza bruta (Rate Limiting) en el endpoint de autenticación, exige de manera obligatoria optimizar la capacidad elástica del servidor (implementando balanceadores de carga y autoescalado) y robustecer las de seguridad antes de realizar cualquier despliegue real.
- La relevancia de implementar esta suite tecnológica radica en que consolida un flujo de trabajo bajo la filosofía DevSecOps real y profesional, donde la automatización de GitHub Actions elimina por completo el error humano en los despliegues, la rigurosidad analítica de Jest y SonarCloud garantiza un código fuente limpio, testeado y mantenible a la posteridad, y el análisis proactivo de k6 y OWASP ZAP expone con absoluta precisión métrica las vulnerabilidades de seguridad y los límites de rendimiento de la infraestructura antes de que afecten a usuarios reales; transformando así el aseguramiento de la calidad (QA) de una simple fase de verificación de software en un pilar estratégico para la estabilidad, robustez y protección del sistema en entornos de producción.
