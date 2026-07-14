# REPORTE DE AUTOMATIZACIÓN DE PRUEBAS CI/CD - LABORATORIO 08

## 1. OBJETIVO
El objetivo de este laboratorio fue diseñar e implementar una arquitectura de Integración Continua (CI) mediante **GitHub Actions** para automatizar el ciclo de vida de las pruebas. Con esto se asegura que cualquier cambio en el repositorio pase por una verificación de pruebas de software aisladas antes de ser integrado a la rama principal (`main`/`master`).

## 2. HERRAMIENTAS UTILIZADAS
* **GitHub Actions**: Orquestador de Integración Continua (CI).
* **Jest & Supertest**: Frameworks para pruebas unitarias y de API REST de nivel de integración.
* **Playwright**: Suite de automatización para pruebas funcionales extremo a extremo (E2E).
* **Node.js (v18)**: Entorno de ejecución para las dependencias y la compilación.

---

## 3. PROCEDIMIENTO Y CONFIGURACIÓN

### 3.1. Inicialización e Instalación Local
Para asegurar el funcionamiento local antes de subir los flujos a la nube, se ejecutaron los siguientes comandos:
```bash
# Inicialización de Node y dependencias de testing unitario y API
npm init -y
npm install --save-dev jest supertest

# Inicialización y configuración de Playwright (E2E)
npm init playwright@latest