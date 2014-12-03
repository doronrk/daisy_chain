import urllib2
from urlparse import urlparse
import sys
from selenium import webdriver
import os
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import WebDriverException
from selenium.common.exceptions import TimeoutException

def ajax_complete(driver):
    try:
        return 0 == driver.execute_script("return jQuery.active")
    except WebDriverException:
        pass

url_filename = '../product_urls.txt'
error_url_filename = '../error_product_urls.txt'
url_dir = '../product_html'

if len(sys.argv) == 3:
    url_filename = '../' + sys.argv[1]
    url_dir = '../' + sys.argv[2]

driver = webdriver.Firefox()

num_succesful_fetches = 0
errors = dict()
already_pinged_domains = set()
urls = open(url_filename)
for url_string in urls:
    url_string = url_string.split('\n')[0]
    if url_string == '':
        continue
    url = urlparse(url_string)
    print 'fetching url:', url.geturl()
    domain = url.hostname
    if (domain in already_pinged_domains):
        print '\t','WARNING! multiple URLS from the same host in url file'
        continue
    try:
        driver.get(url_string)
        WebDriverWait(driver, 10).until(ajax_complete, "Timeout waiting for page to load")
        html_file = open(url_dir + '/' + domain + '.html',"w")
        html = driver.page_source
        html = html.encode('utf-8')
        html_file.write(html)
        html_file.close()
        num_succesful_fetches = num_succesful_fetches + 1
        driver.save_screenshot(url_dir + '/' + domain + '.jpg')
        print '\t', 'successful fetch'
    except urllib2.HTTPError as e:
        if e.code in errors:
            errors[e.code].append(url_string)
        else:
            errors[e.code] = [url_string]
        print '\t', e.code, 'error'
    except TimeoutException as e:
        if 'timeout_exception' in errors:
            errors['timeout_exception'].append(url_string)
        else:
            errors['timeout_exception'] = [url_string]
        print 'timeout_exception'

print 'number of succesful_fetches', num_succesful_fetches

driver.close()

if errors == dict():
    print 'no errors'
else:
    error_url_file = open(error_url_filename,"w")

    for error_code, urls in errors.iteritems():
        error_url_file.write('\n\n' + error_code + '\n\n')
        for url in urls:
            error_url_file.write(url + '\n')
