import urllib2, sys
from BeautifulSoup import BeautifulSoup

url = "http://api.glassdoor.com/api/api.htm?t.p=25738&t.k=iRCtcWJQamE&format=json&v=1&action=employers&q="
hdr = {'User-Agent': 'Mozilla/5.0'}
req = urllib2.Request(url,headers=hdr)
response = urllib2.urlopen(req)
soup = BeautifulSoup(response)



