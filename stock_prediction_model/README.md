# Stock Prediction Model - Neural Network

Mô hình dự đoán giá chứng khoán sử dụng mạng neural network với 5+ lớp (layers).

## Tính năng

1. **Xử lý dữ liệu từ CSV**: Đọc và xử lý dữ liệu từ 3 file CSV (fpt.csv, png.csv, vic.csv)
2. **Chuẩn hóa dữ liệu**: Sử dụng MinMaxScaler cho các cột: Open, High, Low, Close, Volume
3. **Mô hình Neural Network**: 
   - Layer 1: Dense (128 neurons) + Dropout (0.2)
   - Layer 2: Dense (64 neurons) + Dropout (0.2)
   - Layer 3: Dense (32 neurons) + Dropout (0.1)
   - Layer 4: Dense (16 neurons) + Dropout (0.1)
   - Layer 5: Dense (8 neurons)
   - Output Layer: Dense (1 neuron) - Linear activation
4. **Chia dữ liệu**: 80% training, 20% testing
5. **Đánh giá hiệu suất**: RMSE, MAE, R² Score
6. **Visualization**: Biểu đồ so sánh giá thực tế vs dự đoán
7. **Lưu mô hình**: Model được lưu dưới định dạng .h5

## Cấu trúc thư mục

```
stock_prediction_model/
├── stock_prediction.py       # Script chính
├── requirements.txt           # Dependencies
├── sample_data/              # Dữ liệu mẫu để test
│   ├── fpt.csv
│   ├── png.csv
│   └── vic.csv
└── README.md                 # Tài liệu này
```

## Cài đặt

1. Cài đặt Python dependencies:
```bash
pip install -r requirements.txt
```

2. Chuẩn bị dữ liệu:
   - Đặt các file CSV (fpt.csv, png.csv, vic.csv) vào thư mục `D:\IntSys`
   - Hoặc sử dụng dữ liệu mẫu trong thư mục `sample_data/`

## Sử dụng

### Chạy với dữ liệu từ D:\IntSys (Windows)

```python
from stock_prediction import StockPredictor

# Initialize predictor với đường dẫn dữ liệu
predictor = StockPredictor(data_dir='D:\\IntSys')

# Chạy pipeline hoàn chỉnh
metrics = predictor.run_pipeline()
```

### Chạy với dữ liệu mẫu

```python
import os
from stock_prediction import StockPredictor

# Lấy đường dẫn tới sample_data
current_dir = os.path.dirname(os.path.abspath(__file__))
sample_data_dir = os.path.join(current_dir, 'sample_data')

# Initialize predictor với dữ liệu mẫu
predictor = StockPredictor(data_dir=sample_data_dir)

# Chạy pipeline
metrics = predictor.run_pipeline()
```

### Chạy từ command line

```bash
# Với dữ liệu từ D:\IntSys
python stock_prediction.py

# Với dữ liệu mẫu (cần chỉnh sửa data_dir trong main())
python stock_prediction.py
```

## Output

Sau khi chạy, script sẽ tạo ra:

1. **best_model.h5**: Model tốt nhất trong quá trình training
2. **stock_prediction_model.h5**: Model cuối cùng đã được huấn luyện
3. **stock_prediction_results.png**: Biểu đồ visualization với 4 subplot:
   - Actual vs Predicted prices
   - Distribution of prediction errors
   - Time series comparison
   - Training and validation loss

## Xử lý vấn đề dữ liệu

Script tự động xử lý các vấn đề sau:

- **Cột Date/Time bị lỗi (####)**: Được bỏ qua, không sử dụng trong training
- **Missing values**: Các dòng có giá trị thiếu được loại bỏ tự động
- **Multiple files**: Tự động kết hợp dữ liệu từ nhiều file CSV

## Các tham số có thể điều chỉnh

Trong file `stock_prediction.py`, bạn có thể điều chỉnh:

- `epochs`: Số epoch training (mặc định: 100)
- `batch_size`: Batch size (mặc định: 32)
- `test_size`: Tỷ lệ test set (mặc định: 0.2 = 20%)
- Learning rate trong Adam optimizer (mặc định: 0.001)
- Số neurons trong các layer
- Dropout rate

## Yêu cầu hệ thống

- Python 3.7+
- RAM: Ít nhất 4GB (khuyến nghị 8GB)
- Disk: Ít nhất 500MB cho dependencies và model

## Dependencies

- numpy >= 1.21.0
- pandas >= 1.3.0
- matplotlib >= 3.4.0
- scikit-learn >= 1.0.0
- tensorflow >= 2.10.0

## Đánh giá mô hình

Mô hình được đánh giá bằng 3 metrics:

1. **RMSE (Root Mean Squared Error)**: Đo lường sai số trung bình
2. **MAE (Mean Absolute Error)**: Đo lường sai số tuyệt đối trung bình
3. **R² Score**: Hệ số xác định, cho biết mô hình giải thích được bao nhiêu % variance

## Lưu ý

- Model sử dụng activation function ReLU cho các hidden layers
- Output layer sử dụng linear activation cho regression
- Early stopping được áp dụng để tránh overfitting
- Dropout layers giúp cải thiện generalization

## Tác giả

Stock Prediction Model - Neural Network Implementation
