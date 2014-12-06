from selenium import webdriver
from bs4 import BeautifulSoup
import os
import re
import time
from selenium.common.exceptions import InvalidSelectorException
from selenium.common.exceptions import WebDriverException
from row_creator import create

def driver_get(driver, filepath):
    absfilepath = os.path.abspath(filepath)
    uri = 'file://' + absfilepath
    driver.get(uri)

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
    price_matches = []
    img_matches = []
    try:
        filename, price_element_str, image_element_str = feature_element.split('\t')
        print 'filename', filename
        if not (filename in html_filenames):
            print 'filename not found'
            continue
        filepath = html_path + filename
        driver_get(driver, filepath)

        # price element stuff
        if not (len(price_element_str) < 2):
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

        if (price_matches == [] or img_matches == []):
            print 'couldnt find both elements'
            continue

        all_elements = driver.find_elements_by_xpath('//*')
        dollar_sign_elements = driver.find_elements_by_xpath('//*[contains(text(), \'$\')]')
        img_tag_elements = driver.find_elements_by_tag_name('img')

        page_info = dict()
        page_info['dollar_objects'] = dollar_sign_elements
        page_info['img_objects'] = img_tag_elements

        for element in all_elements:
            labeled_instance = create(element, [price_matches, img_matches], page_info)
            print 'len(labeled_instance)', len(labeled_instance)


    except WebDriverException as e:
        print 'WebDriverException'

#     if (price_matches != None and len(price_matches) > 0):
#         if (img_matches != None and len(img_matches) > 0):
#             file_found_both_elements.add(filename)
#         else:
#             file_found_only_price.add(filename)
#     else:
#         if (img_matches != None and len(img_matches) > 0):
#             file_found_only_image.add(filename)
#         else:
#             file_found_neither.add(filename)

# print 'file_found_both_elements', len(file_found_both_elements)
# for f in file_found_both_elements:
#     print '\t', f
# print 'file_found_only_price', len(file_found_only_price)
# for f in file_found_only_price:
#     print '\t', f
# print 'file_found_only_image', len(file_found_only_image)
# for f in file_found_only_image:
#     print '\t', f
# print 'file_found_neither', len(file_found_neither)
# for f in file_found_neither:
#     print '\t', f
