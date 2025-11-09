"""
Stock Prediction Model using Neural Network
This script reads stock data from CSV files, processes it, trains a neural network
with at least 5 layers, and generates predictions with visualizations.
"""

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
import warnings
warnings.filterwarnings('ignore')


class StockPredictor:
    """
    Stock prediction model using neural network with 5+ layers
    """
    
    def __init__(self, data_dir='D:\\IntSys'):
        """
        Initialize the stock predictor
        
        Args:
            data_dir (str): Directory containing CSV files
        """
        self.data_dir = data_dir
        self.model = None
        self.scaler_X = MinMaxScaler()
        self.scaler_y = MinMaxScaler()
        self.feature_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
        self.history = None
        
    def load_and_process_data(self, file_names=['fpt.csv', 'png.csv', 'vic.csv']):
        """
        Load and process data from CSV files
        
        Args:
            file_names (list): List of CSV file names
            
        Returns:
            pd.DataFrame: Combined and processed dataframe
        """
        all_data = []
        
        for file_name in file_names:
            file_path = os.path.join(self.data_dir, file_name)
            
            try:
                # Read CSV file, skip Date/Time column if it has issues
                df = pd.read_csv(file_path)
                
                # Extract ticker name from filename
                ticker = file_name.split('.')[0].upper()
                df['Ticker'] = ticker
                
                # Select relevant columns
                required_cols = ['Ticker'] + self.feature_columns
                
                # Check if all required columns exist
                available_cols = [col for col in required_cols if col in df.columns]
                df = df[available_cols]
                
                # Remove rows with missing values
                df = df.dropna()
                
                all_data.append(df)
                print(f"Loaded {len(df)} records from {file_name}")
                
            except Exception as e:
                print(f"Error loading {file_name}: {e}")
                continue
        
        # Combine all dataframes
        if all_data:
            combined_df = pd.concat(all_data, ignore_index=True)
            print(f"\nTotal records loaded: {len(combined_df)}")
            return combined_df
        else:
            raise ValueError("No data loaded successfully")
    
    def prepare_features(self, df):
        """
        Prepare features and target variables
        
        Args:
            df (pd.DataFrame): Input dataframe
            
        Returns:
            tuple: X (features), y (target - Close price)
        """
        # Use all feature columns as input
        X = df[self.feature_columns].values
        
        # Predict Close price (can be modified to predict next day's close)
        y = df['Close'].values.reshape(-1, 1)
        
        return X, y
    
    def normalize_data(self, X, y, fit=True):
        """
        Normalize features and target using MinMaxScaler
        
        Args:
            X (np.array): Feature array
            y (np.array): Target array
            fit (bool): Whether to fit the scaler or just transform
            
        Returns:
            tuple: Normalized X and y
        """
        if fit:
            X_scaled = self.scaler_X.fit_transform(X)
            y_scaled = self.scaler_y.fit_transform(y)
        else:
            X_scaled = self.scaler_X.transform(X)
            y_scaled = self.scaler_y.transform(y)
        
        return X_scaled, y_scaled
    
    def build_model(self, input_dim):
        """
        Build neural network model with at least 5 layers
        
        Args:
            input_dim (int): Number of input features
            
        Returns:
            keras.Model: Compiled neural network model
        """
        model = Sequential([
            # Layer 1: Input layer with 128 neurons
            Dense(128, activation='relu', input_dim=input_dim, name='layer_1'),
            Dropout(0.2),
            
            # Layer 2: Hidden layer with 64 neurons
            Dense(64, activation='relu', name='layer_2'),
            Dropout(0.2),
            
            # Layer 3: Hidden layer with 32 neurons
            Dense(32, activation='relu', name='layer_3'),
            Dropout(0.1),
            
            # Layer 4: Hidden layer with 16 neurons
            Dense(16, activation='relu', name='layer_4'),
            Dropout(0.1),
            
            # Layer 5: Hidden layer with 8 neurons
            Dense(8, activation='relu', name='layer_5'),
            
            # Output layer: Single neuron for regression
            Dense(1, activation='linear', name='output_layer')
        ])
        
        # Compile the model
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='mean_squared_error',
            metrics=['mae']
        )
        
        print("\nModel Architecture:")
        model.summary()
        
        return model
    
    def train_model(self, X_train, y_train, X_val, y_val, epochs=100, batch_size=32):
        """
        Train the neural network model
        
        Args:
            X_train: Training features
            y_train: Training targets
            X_val: Validation features
            y_val: Validation targets
            epochs (int): Number of training epochs
            batch_size (int): Batch size for training
            
        Returns:
            History: Training history
        """
        # Early stopping callback
        early_stopping = keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=15,
            restore_best_weights=True
        )
        
        # Model checkpoint callback
        checkpoint = keras.callbacks.ModelCheckpoint(
            'best_model.h5',
            monitor='val_loss',
            save_best_only=True,
            verbose=0
        )
        
        # Train the model
        self.history = self.model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val),
            epochs=epochs,
            batch_size=batch_size,
            callbacks=[early_stopping, checkpoint],
            verbose=1
        )
        
        return self.history
    
    def evaluate_model(self, X_test, y_test):
        """
        Evaluate model performance
        
        Args:
            X_test: Test features
            y_test: Test targets
            
        Returns:
            dict: Dictionary containing evaluation metrics
        """
        # Make predictions
        y_pred_scaled = self.model.predict(X_test)
        
        # Inverse transform to get actual values
        y_pred = self.scaler_y.inverse_transform(y_pred_scaled)
        y_actual = self.scaler_y.inverse_transform(y_test)
        
        # Calculate metrics
        rmse = np.sqrt(mean_squared_error(y_actual, y_pred))
        mae = mean_absolute_error(y_actual, y_pred)
        r2 = r2_score(y_actual, y_pred)
        
        metrics = {
            'RMSE': rmse,
            'MAE': mae,
            'R2': r2
        }
        
        print("\n" + "="*50)
        print("Model Evaluation Metrics:")
        print("="*50)
        print(f"Root Mean Squared Error (RMSE): {rmse:.4f}")
        print(f"Mean Absolute Error (MAE): {mae:.4f}")
        print(f"R² Score: {r2:.4f}")
        print("="*50)
        
        return metrics, y_actual, y_pred
    
    def create_visualizations(self, y_actual, y_pred):
        """
        Create visualizations for prediction results
        
        Args:
            y_actual: Actual values
            y_pred: Predicted values
        """
        # Create figure with subplots
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        fig.suptitle('Stock Price Prediction Results', fontsize=16, fontweight='bold')
        
        # Plot 1: Actual vs Predicted
        axes[0, 0].scatter(y_actual, y_pred, alpha=0.5)
        axes[0, 0].plot([y_actual.min(), y_actual.max()], 
                        [y_actual.min(), y_actual.max()], 
                        'r--', lw=2, label='Perfect Prediction')
        axes[0, 0].set_xlabel('Actual Close Price')
        axes[0, 0].set_ylabel('Predicted Close Price')
        axes[0, 0].set_title('Actual vs Predicted Prices')
        axes[0, 0].legend()
        axes[0, 0].grid(True, alpha=0.3)
        
        # Plot 2: Prediction Error
        error = y_actual - y_pred
        axes[0, 1].hist(error, bins=50, edgecolor='black', alpha=0.7)
        axes[0, 1].set_xlabel('Prediction Error')
        axes[0, 1].set_ylabel('Frequency')
        axes[0, 1].set_title('Distribution of Prediction Errors')
        axes[0, 1].axvline(x=0, color='r', linestyle='--', label='Zero Error')
        axes[0, 1].legend()
        axes[0, 1].grid(True, alpha=0.3)
        
        # Plot 3: Time series comparison (sample)
        sample_size = min(200, len(y_actual))
        indices = range(sample_size)
        axes[1, 0].plot(indices, y_actual[:sample_size], label='Actual', linewidth=2)
        axes[1, 0].plot(indices, y_pred[:sample_size], label='Predicted', linewidth=2, alpha=0.7)
        axes[1, 0].set_xlabel('Sample Index')
        axes[1, 0].set_ylabel('Close Price')
        axes[1, 0].set_title(f'Actual vs Predicted (First {sample_size} samples)')
        axes[1, 0].legend()
        axes[1, 0].grid(True, alpha=0.3)
        
        # Plot 4: Training history
        if self.history:
            axes[1, 1].plot(self.history.history['loss'], label='Training Loss')
            axes[1, 1].plot(self.history.history['val_loss'], label='Validation Loss')
            axes[1, 1].set_xlabel('Epoch')
            axes[1, 1].set_ylabel('Loss (MSE)')
            axes[1, 1].set_title('Training and Validation Loss')
            axes[1, 1].legend()
            axes[1, 1].grid(True, alpha=0.3)
        
        plt.tight_layout()
        
        # Save the figure
        output_path = 'stock_prediction_results.png'
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        print(f"\nVisualization saved to: {output_path}")
        
        plt.close()
    
    def save_model(self, model_path='stock_prediction_model.h5'):
        """
        Save the trained model
        
        Args:
            model_path (str): Path to save the model
        """
        if self.model:
            self.model.save(model_path)
            print(f"\nModel saved to: {model_path}")
        else:
            print("No model to save")
    
    def run_pipeline(self):
        """
        Run the complete pipeline: load data, train model, evaluate, visualize
        """
        print("="*70)
        print("STOCK PREDICTION MODEL - NEURAL NETWORK WITH 5+ LAYERS")
        print("="*70)
        
        # Step 1: Load and process data
        print("\n[Step 1] Loading and processing data...")
        df = self.load_and_process_data()
        
        # Step 2: Prepare features
        print("\n[Step 2] Preparing features...")
        X, y = self.prepare_features(df)
        print(f"Feature shape: {X.shape}")
        print(f"Target shape: {y.shape}")
        
        # Step 3: Normalize data
        print("\n[Step 3] Normalizing data...")
        X_scaled, y_scaled = self.normalize_data(X, y, fit=True)
        
        # Step 4: Split data (80/20)
        print("\n[Step 4] Splitting data (80% train, 20% test)...")
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y_scaled, test_size=0.2, random_state=42
        )
        print(f"Training samples: {len(X_train)}")
        print(f"Test samples: {len(X_test)}")
        
        # Step 5: Build model
        print("\n[Step 5] Building neural network model...")
        self.model = self.build_model(input_dim=X.shape[1])
        
        # Step 6: Train model
        print("\n[Step 6] Training model...")
        self.train_model(X_train, y_train, X_test, y_test, epochs=100, batch_size=32)
        
        # Step 7: Evaluate model
        print("\n[Step 7] Evaluating model...")
        metrics, y_actual, y_pred = self.evaluate_model(X_test, y_test)
        
        # Step 8: Create visualizations
        print("\n[Step 8] Creating visualizations...")
        self.create_visualizations(y_actual, y_pred)
        
        # Step 9: Save model
        print("\n[Step 9] Saving model...")
        self.save_model()
        
        print("\n" + "="*70)
        print("PIPELINE COMPLETED SUCCESSFULLY!")
        print("="*70)
        
        return metrics


def main():
    """
    Main function to run the stock prediction model
    """
    # Initialize predictor
    predictor = StockPredictor(data_dir='D:\\IntSys')
    
    # Run the complete pipeline
    try:
        metrics = predictor.run_pipeline()
        return metrics
    except Exception as e:
        print(f"\nError in pipeline: {e}")
        import traceback
        traceback.print_exc()
        return None


if __name__ == "__main__":
    main()
