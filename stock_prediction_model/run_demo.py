"""
Demo script to run stock prediction model with sample data
"""

import os
import sys

# Add the parent directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from stock_prediction import StockPredictor


def main():
    """
    Run stock prediction model with sample data
    """
    print("="*70)
    print("STOCK PREDICTION MODEL - DEMO WITH SAMPLE DATA")
    print("="*70)
    
    # Get path to sample data directory
    sample_data_dir = os.path.join(current_dir, 'sample_data')
    
    # Check if sample data exists
    if not os.path.exists(sample_data_dir):
        print(f"Error: Sample data directory not found at {sample_data_dir}")
        return
    
    # Check for CSV files
    csv_files = ['fpt.csv', 'png.csv', 'vic.csv']
    missing_files = []
    for file in csv_files:
        if not os.path.exists(os.path.join(sample_data_dir, file)):
            missing_files.append(file)
    
    if missing_files:
        print(f"Warning: Missing CSV files: {', '.join(missing_files)}")
        print("The model will work with available files.")
    
    # Initialize predictor with sample data
    print(f"\nUsing sample data from: {sample_data_dir}\n")
    predictor = StockPredictor(data_dir=sample_data_dir)
    
    # Run the complete pipeline
    try:
        metrics = predictor.run_pipeline()
        
        if metrics:
            print("\n" + "="*70)
            print("DEMO COMPLETED SUCCESSFULLY!")
            print("="*70)
            print(f"\nResults Summary:")
            print(f"  - RMSE: {metrics['RMSE']:.4f}")
            print(f"  - MAE: {metrics['MAE']:.4f}")
            print(f"  - R² Score: {metrics['R2']:.4f}")
            print(f"\nOutput files created in current directory:")
            print(f"  - stock_prediction_model.h5 (trained model)")
            print(f"  - stock_prediction_results.png (visualizations)")
            print(f"  - best_model.h5 (best model during training)")
            
    except Exception as e:
        print(f"\nError running pipeline: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
