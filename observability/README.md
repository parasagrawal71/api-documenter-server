## Create Dashboards for Tracing and Monitoring Metrics

You’ll learn how to:

- Visualize traces, metrics, and logs
- Build dashboards using Grafana
- Plug in Prometheus (for metrics) and Tempo (for traces)

<br />

##### Tool Stack Overview

| Tool              | Role                           |
| ----------------- | ------------------------------ |
| **Prometheus**    | Scrapes & stores metrics       |
| **Tempo**         | Stores distributed traces      |
| **OpenTelemetry** | Sends data to Prometheus/Tempo |
| **Grafana**       | Visualizes metrics & traces    |

<br />
<br />

##### Step 1: Docker Compose File (docker-compose.yml)

##### Step 2: Config Files (prometheus.yml and tempo.yml)

##### Step 3: Run Everything

> docker-compose up -d

##### Step 4: Access Dashboards

##### Step 5: Setup Grafana Panels

1. Login to Grafana (user: admin, pass: admin)
2. Add data sources:

   - Prometheus → http://prometheus:9090
   - Tempo → http://tempo:3200

3. Import dashboards or build panels:
   - Panel types: Line chart, Table, Flamegraph (for traces)
   - Metrics to graph: request latency, span duration, memory, CPU

##### Sample Dashboard Panels (for React + Node.js Stack)

| Panel Name           | Query / Source                        |
| -------------------- | ------------------------------------- |
| API Request Latency  | `http_server_duration_seconds` (Prom) |
| Error Rate           | `http_requests_total{status="500"}`   |
| LCP / INP (frontend) | From `web-vitals` logs → custom push  |
| Trace View           | Linked via Tempo trace ID             |
