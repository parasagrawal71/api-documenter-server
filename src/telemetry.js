/**
    -- Step 1: Install Required Packages 

    npm install @opentelemetry/api @opentelemetry/sdk-node \
    @opentelemetry/auto-instrumentations-node \
    @opentelemetry/exporter-trace-otlp-http \
    @opentelemetry/exporter-metrics-otlp-http

    You can switch OTLP exporter to Jaeger or Zipkin if you prefer.
 */

// -- Step 2: Setup Telemetry (telemetry.js)
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-http");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces", // default OTLP HTTP port
  }),
  metricExporter: new OTLPMetricExporter({
    url: "http://localhost:4318/v1/metrics",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: "api-documenter-server", // Provide a service name
});

module.exports = { sdk };

// -- Step 3: Initialize Tracing Before Server Boot (In server.js file)

/**
    -- Step 4: Run an OTLP Collector (e.g., Jaeger) 
 
    OTLP: The acronym OTLP stands for OpenTelemetry Protocol. It is a protocol
    used for transmitting telemetry data, specifically traces, metrics, and logs,
    within the OpenTelemetry framework. This protocol is designed to standardize
    how this data is exchanged between various components, including applications,
    collectors, and backends.

    docker run -d --name jaeger \
    -e COLLECTOR_OTLP_ENABLED=true \
    -p 16686:16686 \
    -p 4318:4318 \
    jaegertracing/all-in-one:latest

    Access Jaeger UI at: http://localhost:16686
 */

/**
    You’ll See:
    - Traces for each request (like /route)
    - Duration, span tree, and attributes (e.g., HTTP status)
    - Auto-instrumentation for Express, HTTP, and file system
*/

// -- Bonus: Add Custom Spans
// With this, others API endpoints are not getting tracked automatically
// export async function observeThisApiCall(req, res, next) {
//   const { trace } = require("@opentelemetry/api");

//   const span = trace.getTracer("custom").startSpan("api-call");
//   span.setAttribute("query.type", "select");
//   span.addEvent("Query started");
//   // do work...
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   span.addEvent("Query completed");
//   //   res.status(200).send("Query completed!!");
//   res.status(400).send("Bad Request!!");
//   span.end();
// }
