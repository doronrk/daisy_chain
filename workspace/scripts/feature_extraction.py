from selenium import webdriver
from bs4 import BeautifulSoup
import os

def get_attr_dict(element_str):
    soup = BeautifulSoup(element_str)
    element = soup.html.body.find()
    attrs = element.attrs
    attr_dict = dict()
    for attr in attrs:
        value = element[attr]
        attr_dict[attr] = value
    return element, attr_dict

def driver_get(driver, filepath):
    absfilepath = os.path.abspath(filepath)
    uri = 'file://' + absfilepath
    driver.get(uri)

def label_element(element_str):
    element, attr_dict = get_attr_dict(element_str)



html_path = "../product_html/"
html_filenames = set(os.listdir(html_path))
#driver = webdriver.Firefox()

feature_elements_filename = '../data/feature_elements.tsv'
feature_elements = open(feature_elements_filename)

files_did_not_work = set()

for num, feature_element in enumerate(feature_elements):
    filename, price_element_str, image_element_str = feature_element.split('\t')
    if not (filename in html_filenames):
        files_did_not_work.add(filename)
        continue
    filepath = html_path + filename
    #driver_get(driver, filepath)
    html_file = open(filepath)
    soup = BeautifulSoup(html_file)
    element, attr_dict = get_attr_dict(price_element_str)
    print element
    print filename
    print attr_dict
    matches = soup.find_all(attrs=attr_dict)
    print matches
    break
    #def matching_element


print len(files_did_not_work), 'files did not work'

# element = '<span data-id="dynamic-sku-price" class="product_price emphasis ">$287.<sup>99</sup></span>'

# text = '$249.99'

# xpath = '//*[contains(., \'' + text + '\')]'

# price_element = driver.find_element_by_xpath(xpath)

# print 'is_displayed', price_element.is_displayed()