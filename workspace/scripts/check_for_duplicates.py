import os

dir1 = '../product_html'
dir2 = '../product_html_maya'

dir1files = set(os.listdir(dir1))
dir2files = set(os.listdir(dir2))

duplicates = dir1files.intersection(dir2files)

print duplicates