#!/usr/bin/env python

from boto.s3.key import Key 
from boto.s3.bucket import Bucket 
from boto.s3.connection import S3Connection 
import os
import sys

def deploy_static(to_what):

	conn = S3Connection()
	bucket = conn.get_bucket(to_what)

	for d in ["assets", "flot"]:
		for f in os.listdir(d):
			name = d+"/"+f
			key = Key(bucket)
			key.key = name 
			key.set_contents_from_filename(name)
			print "%s, %s" % (to_what, name)



def deploy_front():

	conn = S3Connection()
	if "page" not in sys.argv:
		deploy_static("www.sentimentron.co.uk")
	bucket = conn.get_bucket('www.sentimentron.co.uk')

	front_page = Key(bucket)
	front_page.key = "index.html"
	front_page.set_contents_from_filename("index.html")

	info_page  = Key(bucket)
	info_page.key  = "info.html"
	info_page.set_contents_from_filename("info.html")

	paths = Key(bucket)
	paths.key = "paths.js"
	paths.set_contents_from_filename("paths.production.js")

	spinner = Key(bucket)
	paths.key = "spinner.gif"
	paths.set_contents_from_filename("spinner.gif")

def deploy_results():

	conn = S3Connection()
	if "page" not in sys.argv:
		deploy_static("results.sentimentron.co.uk")
	bucket = conn.get_bucket('results.sentimentron.co.uk')


	front_page = Key(bucket)
	front_page.key = "index.html"
	front_page.set_contents_from_filename("results.html")


if __name__ == "__main__":

	print "Deploying..."

	# Decide what we're deploying...
	if "front" in sys.argv:
		deploy_front()

	if "results" in sys.argv:
		deploy_results()