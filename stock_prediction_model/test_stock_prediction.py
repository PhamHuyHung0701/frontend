"""
Unit tests for the stock prediction model
"""

import os
import sys
import unittest
import numpy as np
import pandas as pd

# Add the parent directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from stock_prediction import StockPredictor


class TestStockPredictor(unittest.TestCase):
    """
    Test cases for StockPredictor class
    """
    
    def setUp(self):
        """Set up test fixtures"""
        self.sample_data_dir = os.path.join(current_dir, 'sample_data')
        self.predictor = StockPredictor(data_dir=self.sample_data_dir)
    
    def test_initialization(self):
        """Test that predictor initializes correctly"""
        self.assertIsNotNone(self.predictor)
        self.assertEqual(self.predictor.data_dir, self.sample_data_dir)
        self.assertEqual(self.predictor.feature_columns, 
                        ['Open', 'High', 'Low', 'Close', 'Volume'])
    
    def test_load_and_process_data(self):
        """Test data loading and processing"""
        df = self.predictor.load_and_process_data()
        
        # Check that data was loaded
        self.assertIsNotNone(df)
        self.assertGreater(len(df), 0)
        
        # Check that required columns exist
        required_cols = ['Ticker', 'Open', 'High', 'Low', 'Close', 'Volume']
        for col in required_cols:
            self.assertIn(col, df.columns)
        
        # Check that all three tickers are present
        tickers = df['Ticker'].unique()
        self.assertEqual(len(tickers), 3)
    
    def test_prepare_features(self):
        """Test feature preparation"""
        df = self.predictor.load_and_process_data()
        X, y = self.predictor.prepare_features(df)
        
        # Check shapes
        self.assertEqual(X.shape[1], 5)  # 5 features
        self.assertEqual(y.shape[1], 1)  # 1 target
        self.assertEqual(len(X), len(y))  # Same number of samples
        
        # Check that there are no NaN values
        self.assertFalse(np.isnan(X).any())
        self.assertFalse(np.isnan(y).any())
    
    def test_normalize_data(self):
        """Test data normalization"""
        df = self.predictor.load_and_process_data()
        X, y = self.predictor.prepare_features(df)
        
        X_scaled, y_scaled = self.predictor.normalize_data(X, y, fit=True)
        
        # Check that normalized data exists and has correct shape
        self.assertEqual(X_scaled.shape, X.shape)
        self.assertEqual(y_scaled.shape, y.shape)
        
        # Check that data was actually transformed (not the same as input)
        self.assertFalse(np.array_equal(X_scaled, X))
        self.assertFalse(np.array_equal(y_scaled, y))
    
    def test_build_model(self):
        """Test model building"""
        model = self.predictor.build_model(input_dim=5)
        
        # Check that model was created
        self.assertIsNotNone(model)
        
        # Check number of layers (should be at least 5 hidden layers + output)
        # Counting Dense layers by type
        from tensorflow.keras.layers import Dense
        dense_layers = [layer for layer in model.layers 
                       if isinstance(layer, Dense)]
        self.assertGreaterEqual(len(dense_layers), 6)  # 5 hidden + 1 output
        
        # Check input shape
        self.assertEqual(model.input_shape[1], 5)
        
        # Check output shape
        self.assertEqual(model.output_shape[1], 1)
    
    def test_model_architecture(self):
        """Test that model has correct architecture"""
        model = self.predictor.build_model(input_dim=5)
        
        # Check layer names to ensure we have 5+ named layers
        layer_names = [layer.name for layer in model.layers]
        
        # Check for required layers
        required_layer_names = ['layer_1', 'layer_2', 'layer_3', 'layer_4', 'layer_5', 'output_layer']
        for layer_name in required_layer_names:
            self.assertTrue(any(layer_name in name for name in layer_names),
                          f"Layer {layer_name} not found in model")
    
    def test_data_file_exists(self):
        """Test that sample data files exist"""
        files = ['fpt.csv', 'png.csv', 'vic.csv']
        for file in files:
            file_path = os.path.join(self.sample_data_dir, file)
            self.assertTrue(os.path.exists(file_path), 
                          f"Sample data file {file} not found")
    
    def test_csv_format(self):
        """Test that CSV files have correct format"""
        files = ['fpt.csv', 'png.csv', 'vic.csv']
        required_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
        
        for file in files:
            file_path = os.path.join(self.sample_data_dir, file)
            df = pd.read_csv(file_path)
            
            # Check that required columns exist
            for col in required_columns:
                self.assertIn(col, df.columns, 
                            f"Column {col} not found in {file}")
            
            # Check that data is numeric
            for col in required_columns:
                self.assertTrue(pd.api.types.is_numeric_dtype(df[col]),
                              f"Column {col} in {file} is not numeric")


class TestModelTraining(unittest.TestCase):
    """
    Integration tests for model training (lighter tests)
    """
    
    def setUp(self):
        """Set up test fixtures"""
        self.sample_data_dir = os.path.join(current_dir, 'sample_data')
        self.predictor = StockPredictor(data_dir=self.sample_data_dir)
    
    def test_small_training(self):
        """Test training with small dataset"""
        # Load and prepare data
        df = self.predictor.load_and_process_data()
        X, y = self.predictor.prepare_features(df)
        X_scaled, y_scaled = self.predictor.normalize_data(X, y, fit=True)
        
        # Build model
        self.predictor.model = self.predictor.build_model(input_dim=X.shape[1])
        
        # Train for just 1 epoch to verify it works
        history = self.predictor.train_model(
            X_scaled[:80], y_scaled[:80],  # Small training set
            X_scaled[80:], y_scaled[80:],  # Small validation set
            epochs=1,
            batch_size=16
        )
        
        # Check that training completed
        self.assertIsNotNone(history)
        self.assertIn('loss', history.history)
        self.assertIn('val_loss', history.history)


def run_tests():
    """Run all tests"""
    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add tests
    suite.addTests(loader.loadTestsFromTestCase(TestStockPredictor))
    suite.addTests(loader.loadTestsFromTestCase(TestModelTraining))
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Return exit code
    return 0 if result.wasSuccessful() else 1


if __name__ == '__main__':
    sys.exit(run_tests())
