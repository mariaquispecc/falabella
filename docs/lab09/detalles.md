# REPORTE DE COBERTURA DE CÓDIGO Y QUALITY GATE - LABORATORIO 09

## I. OBJETIVO
El objetivo de este laboratorio fue establecer un **Quality Gate** (umbral de calidad) automatizado para el proyecto. Esto garantiza que cualquier incremento de código deba cumplir con un mínimo del **70% de cobertura de pruebas** (en ramas, funciones, líneas y sentencias) antes de permitir su integración en la rama principal. Asimismo, se integró la plataforma **SonarCloud** para realizar análisis estático continuo y monitorear la deuda técnica, bugs y vulnerabilidades.

---

## II. HERRAMIENTAS UTILIZADAS
* **Jest Coverage:** Herramienta nativa de Jest para la generación de reportes de cobertura (LCOV, HTML, consola).
* **SonarCloud:** Plataforma SaaS de análisis estático de código integrada con GitHub.
* **GitHub Actions:** Orquestador de CI/CD encargado de ejecutar las pruebas, verificar el Quality Gate local y despachar los resultados a SonarCloud.
* **GitHub Secrets:** Almacenamiento seguro del token de acceso de SonarCloud (`SONAR_TOKEN`).

---

## III. CONFIGURACIÓN DEL ENTORNO Y CONTROL DE CALIDAD

### 1. Configuración de Umbrales en `package.json`
Se añadieron los límites estrictos de control de cobertura en el archivo `package.json` para obligar a Jest a fallar si las pruebas no cubren el espectro lógico definido:

```json
"jest": {
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageReporters": ["lcov", "text", "html"],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  }
}