import urllib2
from urlparse import urlparse
import sys

url_filename = '../product_urls.txt'
url_dir = '../product_html'

if len(sys.argv) == 3:
    url_filename = '../' + sys.argv[1]
    url_dir = '../' + sys.argv[2]

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
        response = urllib2.urlopen(url.geturl())
        html_string = response.read()
        html_file= open(url_dir + '/' + domain + '.html',"w")
        html_file.write(html_string)
        html_file.close()
        print '\t', 'successful fetch'
    except urllib2.HTTPError as e:
        print '\t', e.code, 'error'
