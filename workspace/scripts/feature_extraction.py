from selenium import webdriver
from bs4 import BeautifulSoup
import os
import re
import time
from selenium.common.exceptions import InvalidSelectorException
from selenium.common.exceptions import WebDriverException

# def get_attr_dict(element_str):
#     soup = BeautifulSoup(element_str)
#     element = soup.html.body.find()
#     attrs = element.attrs
#     attr_dict = dict()
#     for attr in attrs:
#         value = element[attr]
#         if not type(value) == list:
#             value = [value]
#         attr_dict[attr] = value
#     return element, attr_dict

def driver_get(driver, filepath):
    absfilepath = os.path.abspath(filepath)
    uri = 'file://' + absfilepath
    driver.get(uri)

# def label_element(element_str):
#     element, attr_dict = get_attr_dict(element_str)

# def get_text_regex_from_element(element):
#     text = element.string
#     if (text == None):
#         return None
#     stripped_element_string = "".join(text.split())
#     escaped_stripped_element_string = re.escape(stripped_element_string)
#     return re.compile(escaped_stripped_element_string)

# def get_match_from_element_str(element_str, soup):
#     element, attr_dict = get_attr_dict(element_str)
#     element_text_regex = get_text_regex_from_element(element)
#     soup_matches = soup.find_all(element.name, text=element_text_regex, attrs=attr_dict)
#     # TODO: add selenium matches
#     if soup_matches == []:
#         return None
#     return soup_matches[0]


def get_search_info(element_str):
    element_soup = BeautifulSoup(element_str)
    if element_soup == None:
        return None, None, None
    element = element_soup.html.body.find()
    tag_name = element.name
    text = element.string
    stripped_text = ''
    if (text != None):
        stripped_text = "".join(text.split())
    #escaped_stripped_text = re.escape(stripped_text)
    escaped_stripped_text = stripped_text

    attrs = element.attrs
    attr_dict = dict()
    for attr in attrs:
        value = element[attr]
        if not type(value) == list:
            value = [value]
        value = " ".join(value)
        attr_dict[attr] = value
    return tag_name, escaped_stripped_text, attr_dict


html_path = "../all_of_the_product_html/"
html_filenames = set(os.listdir(html_path))
driver = webdriver.Firefox()

feature_elements_filename = '../data/feature_elements.tsv'
feature_elements = open(feature_elements_filename)

file_found_both_elements = set()
file_found_only_price = set()
file_found_only_image = set()
file_found_neither = set()


for num, feature_element in enumerate(feature_elements):
    print num
    price_matches = None
    img_matches = None
    try:
        filename, price_element_str, image_element_str = feature_element.split('\t')
        print 'filename', filename
        filepath = html_path + filename
        driver_get(driver, filepath)
        #time.sleep(2)



        # price element stuff
        print 'price_element_str', price_element_str
        tag_name, escaped_stripped_text, attr_dict = get_search_info(price_element_str)
        if tag_name == None or escaped_stripped_text == None or attr_dict == None:
            continue
        text_xpath = '//*[contains(., \'' + escaped_stripped_text + '\')]'

        matching_tags = set(driver.find_elements_by_tag_name(tag_name))
        matching_text = set(driver.find_elements_by_xpath(text_xpath))
        price_matches = matching_tags.intersection(matching_text)
        for k,v in attr_dict.iteritems():
            attr_xpath = "//*[@" + k + "=\'" + v +"\']"
            try:
                attr_matches = set(driver.find_elements_by_xpath(attr_xpath))
                price_matches = price_matches.intersection(attr_matches)
            except InvalidSelectorException as e:
                print 'InvalidSelectorException'


        # image element stuff
        if not (len(image_element_str) < 2):
            tag_name, escaped_stripped_text, attr_dict = get_search_info(image_element_str)
            if not ('src' not in attr_dict):
                src_link = attr_dict['src']
                img_xpath = "//img[contains(@src,\'" + src_link + "\')]"
                img_matches = set(driver.find_elements_by_xpath(img_xpath))
                if (len(img_matches) > 1):
                    for k,v in attr_dict.iteritems():
                        attr_xpath = "//img[@" + k + "=\'" + v +"\']"
                        try:
                            attr_matches = set(driver.find_elements_by_xpath(attr_xpath))
                            img_matches = img_matches.intersection(attr_matches)
                        except InvalidSelectorException as e:
                            print 'InvalidSelectorException'
    except WebDriverException as e:
        print 'WebDriverException'

    if (price_matches != None and img_matches != None):
        file_found_both_elements.add(filename)
        print 'price', len(price_matches)
        print 'image', len(img_matches)
    elif (price_matches != None and img_matches == None):
        print 'price', len(price_matches)
        file_found_only_price.add(filename)
    elif (price_matches == None and img_matches != None):
        print 'image', len(img_matches)
        file_found_only_image.add(filename)
    elif (price_matches == None and img_matches == None):
        print 'found neither'
        file_found_neither.add(filename)
    print ''

print 'file_found_both_elements', len(file_found_both_elements)
for f in file_found_both_elements:
    print '\t', f
print 'file_found_only_price', len(file_found_only_price)
for f in file_found_only_price:
    print '\t', f
print 'file_found_only_image', len(file_found_only_image)
for f in file_found_only_image:
    print '\t', f
print 'file_found_neither', len(file_found_neither)
for f in file_found_neither:
    print '\t', f
