Результаты:
- [dist/submission_1.csv](dist/submission_1.csv)
- [dist/submission_2.parquet](dist/submission_2.parquet)
- [dist/submission_3.parquet](dist/submission_3.parquet)

Зависимости:
- pandas 2.x
- pyarrow
- tensorflow + keras
- plotly
- openpyxl

Процесс:
- Кладем исходный датасет и сопровождающие файлы в data/source
- Подготовка данных для обучения: ml/preprocess.ipynb
- Обучение, валидация, предсказание, метрика: ml/model.ipynb
  - Можно запускать распределенно, каждый Y это отдельная модель
- Склеивание результатов: ml/submission.ipynb
- Подготовка данных для БД веб-приложения: ml/web-app.ipynb
