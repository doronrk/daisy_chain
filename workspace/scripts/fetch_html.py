import urllib2
from urlparse import urlparse
import sys
from selenium import webdriver
import os
import time

url_filename = '../product_urls.txt'
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
    url = urlparse(url_string)
    print 'fetching url:', url.geturl()
    domain = url.hostname
    if (domain in already_pinged_domains):
        print '\t','WARNING! multiple URLS from the same host in url file'
        continue
    try:
        driver.get(url_string)
        time.sleep(5)
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

print 'number of succesful_fetches', num_succesful_fetches

driver.close()


if errors == dict():
    print 'no errors'
else:
    print 'errors'

    for error_code, urls in errors.iteritems():
        print 'code: ', error_code
        for url in urls:
            print '\t', url


