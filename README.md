Зависимости:
- pandas 2.x
- pyarrow
- tensorflow + keras
- plotly
- openpyxl

Процесс:
- Кладем исходный датасет и сопровождающие файлы в data/source
- Подготовка данных для обучения: ml/preprocessing.ipynb
- Обучение, валидация, предсказание: ml/model.ipynb
  - Можно запускать распределенно, каждый Y это отдельная модель
- Склеивание результатов: ml/submission.ipynb
