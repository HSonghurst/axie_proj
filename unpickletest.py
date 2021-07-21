import pickle



with open("X_Data.pkl", 'rb') as f:
   test = pickle.load(f)

print(len(test), test[-1])