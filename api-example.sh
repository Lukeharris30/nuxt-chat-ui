curl \
  -u token:$DATABRICKS_TOKEN \
  -X POST \
  -H "Content-Type: application/json" \
  -d@data.json \
  https://dbc-46e171e7-fc89.cloud.databricks.com/serving-endpoints/dev_kmock_compatibility_agent_compat_endpoint/invocations