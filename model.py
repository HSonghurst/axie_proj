import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import pickle
from sklearn.model_selection import train_test_split

EPOCHS = 40
BATCH_SIZE = 512
LEARNING_RATE = 0.001




## train data
class trainData(Dataset):
    
    def __init__(self, X_data, y_data):
        self.X_data = X_data
        self.y_data = y_data
        
    def __getitem__(self, index):
        return self.X_data[index], self.y_data[index]
        
    def __len__ (self):
        return len(self.X_data)

## test data    
class testData(Dataset):
    
    def __init__(self, X_data, y_data):
        self.X_data = X_data
        self.y_data = y_data
        
    def __getitem__(self, index):
        return self.X_data[index], self.y_data[index]
        
    def __len__ (self):
        return len(self.X_data)

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        # Number of input features is 12.
        self.layer_1 = nn.Linear(166, 256)
        self.layer_2 = nn.Linear(256, 512)
        self.layer_3 = nn.Linear(512, 256)
        self.layer_out = nn.Linear(256, 1) 
        
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(p=0.1)
        self.batchnorm1 = nn.BatchNorm1d(256)
        self.batchnorm2 = nn.BatchNorm1d(512)
        self.batchnorm3 = nn.BatchNorm1d(256)
        
    def forward(self, inputs):
        x = self.relu(self.layer_1(inputs))
        x = self.batchnorm1(x)
        x = self.relu(self.layer_2(x))
        x = self.batchnorm2(x)
        x = self.relu(self.layer_3(x))
        x = self.batchnorm3(x)
        x = self.dropout(x)
        x = self.layer_out(x)
        
        return x
    
def binary_acc(y_pred, y_test):

    acc = (torch.abs(1 -(torch.abs(y_pred-y_test + 25) / y_test)))*100
    acc = torch.mean(acc)

    return acc

def close_acc(y_pred, y_test, diff):

    acc = torch.where(torch.abs(y_pred-y_test) < diff, 1, 0)

    acc = torch.Tensor.float(acc)
    
    acc = torch.mean(acc)

    return acc

with open("X_Data.pkl", 'rb') as f:
   x_data = pickle.load(f)

with open("Y_Data.pkl", 'rb') as f:
   y_data = pickle.load(f)

x_train, x_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.1, random_state=69)
   
train_data = trainData(torch.FloatTensor(x_train), 
                       torch.FloatTensor(y_train))

test_data = testData(torch.FloatTensor(x_test), 
                       torch.FloatTensor(y_test))

train_loader = DataLoader(dataset=train_data, batch_size=BATCH_SIZE, shuffle=False)
test_loader = DataLoader(dataset=test_data, batch_size=1)


model = Net()

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model.to(device)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

model.train()
for e in range(1, EPOCHS+1):
    epoch_loss = 0
    epoch_acc = 0
    epoch_acc1 = 0
    epoch_acc2 = 0

    for X_batch, y_batch in train_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)
        optimizer.zero_grad()
        
        y_pred = model(X_batch)
        
        loss = criterion(y_pred, y_batch.unsqueeze(1))
        acc = binary_acc(y_pred, y_batch.unsqueeze(1))
        acc1 = close_acc(y_pred, y_batch.unsqueeze(1), 25)
        acc2 = close_acc(y_pred, y_batch.unsqueeze(1), 50)
        
        loss.backward()
        optimizer.step()
        
        epoch_loss += loss.item()
        epoch_acc += acc.item()
        epoch_acc1 += acc1.item()
        epoch_acc2 += acc2.item()
        

    print(f'Epoch {e+0:03}: | Loss: {epoch_loss/len(train_loader):.5f} | Acc: {epoch_acc/len(train_loader):.3f} | Acc: {epoch_acc1/len(train_loader):.3f} | Acc: {epoch_acc2/len(train_loader):.3f}')

y_pred_list = []
X_test_list = []
y_test_list = []
model.eval()
with torch.no_grad():
    acc_total = 0
    epoch_acc1 = 0
    epoch_acc2 = 0
    for X_batch, y_batch in test_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)
        y_test_pred = model(X_batch)
        y_pred_list.append(y_test_pred.cpu().numpy())
        y_test_list.append(y_batch.cpu().numpy())
        X_test_list.append(X_batch.cpu().numpy())

        acc = binary_acc(y_pred, y_batch.unsqueeze(1))
        acc1 = close_acc(y_pred, y_batch.unsqueeze(1), 25)
        acc2 = close_acc(y_pred, y_batch.unsqueeze(1), 50)
        acc_total += acc.item()
        epoch_acc1 += acc1.item()
        epoch_acc2 += acc2.item()
    print("acc", acc_total/len(test_loader))
    print("acc1", epoch_acc1/len(test_loader))
    print("acc2", epoch_acc2/len(test_loader))

        
        


