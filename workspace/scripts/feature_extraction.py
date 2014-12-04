from selenium import webdriver
from bs4 import BeautifulSoup
import os
import re

def get_attr_dict(element_str):
    print 'element_str', element_str
    soup = BeautifulSoup(element_str)
    print 'soup', soup
    print ''
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

def get_text_regex_from_element(element):
    if (element.string == None):
        return None
    stripped_element_string = "".join(element.string.split())
    escaped_stripped_element_string = re.escape(stripped_element_string)
    return re.compile(escaped_stripped_element_string)

def get_matches_from_element_str(element_str, soup):
    element, attr_dict = get_attr_dict(element_str)
    element_text_regex = get_text_regex_from_element(element)
    soup_matches = soup.find_all(text=element_text_regex, attrs=attr_dict)
    # TODO: add selenium matches
    return soup_matches


html_path = "../all_of_the_product_html/"
html_filenames = set(os.listdir(html_path))
#driver = webdriver.Firefox()

feature_elements_filename = '../data/feature_elements.tsv'
feature_elements = open(feature_elements_filename)

files_not_in_directory = set()
file_found_both_elements = set()
file_found_only_price = set()
file_found_only_image = set()
file_found_neither = set()
file_found_multiple_matches = set()

for num, feature_element in enumerate(feature_elements):
    print 'feature_element', feature_element
    filename, price_element_str, image_element_str = feature_element.split('\t')
    if not (filename in html_filenames):
        files_not_in_directory.add(filename)
        continue
    filepath = html_path + filename
    #driver_get(driver, filepath)
    html_file = open(filepath)
    soup = BeautifulSoup(html_file)

    price_soup_matches = get_matches_from_element_str(price_element_str)
    image_soup_matches = get_matches_from_element_str(image_element_str)

    if (len(price_soup_matches) == 1 and len(image_soup_matches) == 1):
        file_found_both_elements.add(filename)
    if (len(price_soup_matches) == 1 and len(image_soup_matches) == 0):
        file_found_only_price.add(filename)
    if (len(price_soup_matches) == 0 and len(image_soup_matches) == 1):
        file_found_only_image.add(filename)
    if (len(price_soup_matches) == 0 and len(image_soup_matches) == 0):
        file_found_neither.add(filename)
    if (len(price_soup_matches) > 1 or len(image_soup_matches) > 1):
        file_found_multiple_matches.add(filename)

print 'files_not_in_directory'
for f in files_not_in_directory:
    print '\t', f
print 'file_found_both_elements'
for f in file_found_both_elements:
    print '\t', f
print 'file_found_only_price'
for f in file_found_only_price:
    print '\t', f
print 'file_found_only_image'
for f in file_found_only_image:
    print '\t', f
print 'file_found_neither'
for f in file_found_neither:
    print '\t', f
print 'file_found_multiple_matches'
for f in file_found_multiple_matches:
    print '\t', f


# element = '<span data-id="dynamic-sku-price" class="product_price emphasis ">$287.<sup>99</sup></span>'

# text = '$249.99'

# xpath = '//*[contains(., \'' + text + '\')]'

# price_element = driver.find_element_by_xpath(xpath)

# print 'is_displayed', price_element.is_displayed()