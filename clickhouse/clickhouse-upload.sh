clickhouse-client --host hackaton-clickhouse.betiz.loc -q "INSERT INTO default.x_train_pretty FORMAT Parquet" < /app/data/pipeline/x_train_pretty.parquet
clickhouse-client --host hackaton-clickhouse.betiz.loc -q "INSERT INTO default.x_test_pretty FORMAT Parquet" < /app/data/pipeline/x_test_pretty.parquet
clickhouse-client --host hackaton-clickhouse.betiz.loc -q "INSERT INTO default.y_train_pretty FORMAT Parquet" < /app/data/pipeline/y_train_pretty.parquet
