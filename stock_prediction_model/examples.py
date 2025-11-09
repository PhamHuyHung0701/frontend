"""
Example usage script for the stock prediction model
Shows different ways to use the model
"""

import os
import sys

# Add the parent directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from stock_prediction import StockPredictor


def example_1_basic_usage():
    """
    Example 1: Basic usage with sample data
    """
    print("="*70)
    print("EXAMPLE 1: Basic Usage with Sample Data")
    print("="*70)
    
    sample_data_dir = os.path.join(current_dir, 'sample_data')
    predictor = StockPredictor(data_dir=sample_data_dir)
    metrics = predictor.run_pipeline()
    
    print("\nExample 1 completed!")
    return metrics


def example_2_step_by_step():
    """
    Example 2: Step-by-step usage for more control
    """
    print("\n" + "="*70)
    print("EXAMPLE 2: Step-by-Step Usage")
    print("="*70)
    
    sample_data_dir = os.path.join(current_dir, 'sample_data')
    predictor = StockPredictor(data_dir=sample_data_dir)
    
    # Step 1: Load data
    print("\nStep 1: Loading data...")
    df = predictor.load_and_process_data()
    print(f"Loaded {len(df)} records")
    
    # Step 2: Prepare features
    print("\nStep 2: Preparing features...")
    X, y = predictor.prepare_features(df)
    print(f"Features shape: {X.shape}, Target shape: {y.shape}")
    
    # Step 3: Normalize
    print("\nStep 3: Normalizing data...")
    X_scaled, y_scaled = predictor.normalize_data(X, y, fit=True)
    
    # Step 4: Split data
    print("\nStep 4: Splitting data...")
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y_scaled, test_size=0.2, random_state=42
    )
    print(f"Train: {len(X_train)}, Test: {len(X_test)}")
    
    # Step 5: Build model
    print("\nStep 5: Building model...")
    predictor.model = predictor.build_model(input_dim=X.shape[1])
    
    # Step 6: Train (with fewer epochs for demo)
    print("\nStep 6: Training model (10 epochs for demo)...")
    predictor.train_model(X_train, y_train, X_test, y_test, epochs=10, batch_size=32)
    
    # Step 7: Evaluate
    print("\nStep 7: Evaluating model...")
    metrics, y_actual, y_pred = predictor.evaluate_model(X_test, y_test)
    
    print("\nExample 2 completed!")
    return metrics


def example_3_custom_model():
    """
    Example 3: Using custom model architecture
    """
    print("\n" + "="*70)
    print("EXAMPLE 3: Custom Model Architecture")
    print("="*70)
    
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Dense, Dropout
    from tensorflow.keras.optimizers import Adam
    
    sample_data_dir = os.path.join(current_dir, 'sample_data')
    predictor = StockPredictor(data_dir=sample_data_dir)
    
    # Load and prepare data
    df = predictor.load_and_process_data()
    X, y = predictor.prepare_features(df)
    X_scaled, y_scaled = predictor.normalize_data(X, y, fit=True)
    
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y_scaled, test_size=0.2, random_state=42
    )
    
    # Build custom model with different architecture
    print("\nBuilding custom model with 7 layers...")
    custom_model = Sequential([
        Dense(256, activation='relu', input_dim=X.shape[1]),
        Dropout(0.3),
        Dense(128, activation='relu'),
        Dropout(0.3),
        Dense(64, activation='relu'),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dropout(0.2),
        Dense(16, activation='relu'),
        Dense(8, activation='relu'),
        Dense(1, activation='linear')
    ])
    
    custom_model.compile(
        optimizer=Adam(learning_rate=0.0005),
        loss='mean_squared_error',
        metrics=['mae']
    )
    
    print("\nCustom Model Architecture:")
    custom_model.summary()
    
    # Assign to predictor
    predictor.model = custom_model
    
    print("\nTraining custom model (5 epochs for demo)...")
    predictor.train_model(X_train, y_train, X_test, y_test, epochs=5, batch_size=16)
    
    # Evaluate
    metrics, y_actual, y_pred = predictor.evaluate_model(X_test, y_test)
    
    print("\nExample 3 completed!")
    return metrics


def main():
    """
    Run all examples
    """
    print("\n" + "="*70)
    print("STOCK PREDICTION MODEL - USAGE EXAMPLES")
    print("="*70)
    
    # Run Example 1: Basic usage
    # metrics1 = example_1_basic_usage()
    
    # Run Example 2: Step-by-step
    metrics2 = example_2_step_by_step()
    
    # Run Example 3: Custom model
    # metrics3 = example_3_custom_model()
    
    print("\n" + "="*70)
    print("ALL EXAMPLES COMPLETED!")
    print("="*70)
    print("\nYou can now:")
    print("1. Use predictor.run_pipeline() for complete automated training")
    print("2. Use step-by-step approach for more control")
    print("3. Build custom model architectures")
    print("4. Modify hyperparameters as needed")


if __name__ == "__main__":
    main()
