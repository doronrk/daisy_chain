import numpy as np
import matplotlib.pyplot as plt

from sklearn import tree
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn import cross_validation
from sklearn.metrics import confusion_matrix

columns = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58)
filename = '/Users/loman/Development/CIS419/daisy_chain/workspace/data/data_matrix_150.txt'
data = np.loadtxt(filename, delimiter=',', usecols=columns)
X = data[:, 1:-1]
y = np.array([data[:, -1]]).T
n,d = X.shape
print X.shape
print y.shape
mean = X.mean(axis=0)
std = X.std(axis=0)
for i, s in enumerate(std):
	if s == 0: std[i] = 0.000001
X = (X - mean) / std

precision = 0
recall = 0
accuracy = 0

'''for i in xrange(10):

	X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.1, random_state=0)
	clf = GaussianNB()
	clf.fit(X_train, y_train)
	y_predict = clf.predict(X_test)
	n, = y_predict.shape
	y_predict = np.zeros((n,1))

	precision+= metrics.precision_score(y_test, y_predict)
	accuracy+= metrics.accuracy_score(y_test, y_predict)
	recall+= metrics.recall_score(y_test, y_predict)

print 'Precision: ' + str((float(precision)/10))
print 'Accuracy: ' + str((float(accuracy)/10))
print 'Recall: ' + str((float(recall)/10))'''
cm = np.zeros((3,3))

for i in xrange(10):
	# Split the data into a training set and a test set
	X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, np.ravel(y), random_state=0, test_size = 0.1)

	# Run classifier
	classifier = GaussianNB()
	y_predict = classifier.fit(X_train, y_train).predict(X_test)

	precision+= metrics.precision_score(y_test, y_predict)
	accuracy+= metrics.accuracy_score(y_test, y_predict)
	recall+= metrics.recall_score(y_test, y_predict)
	cm = np.add(cm, confusion_matrix(y_test, y_predict))

# Compute confusion matrix
print 'Precision: ' + str((float(precision)/10))
print 'Accuracy: ' + str((float(accuracy)/10))
print 'Recall: ' + str((float(recall)/10))
print cm
#cm[0,0] = cm[0,0] / 5

# Show confusion matrix in a separate window
plt.matshow(cm)
plt.title('Confusion matrix')
plt.colorbar()
plt.ylabel('True label')
plt.xlabel('Predicted label')
plt.show()

