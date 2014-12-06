from selenium import webdriver
import numpy as np
import re
import math

def distance_helper(element, objects):
	'''
	element is the same element passed into row_creator
	objects is a list of either objects containing a dollar sign or objects containing an img tag
	returns a list of the three smallest distances between the element and a particular object from the objects list
	'''
	distances = []
	x = element.rect['x'] + (0.5 * element.rect['width'])
	y = element.rect['y'] + (0.5 * element.rect['height'])
	for obj in objects:
		if obj.id != element.id:
			obj_x = obj.rect['x'] + (0.5 * obj.rect['width'])
			obj_y = obj.rect['y'] + (0.5 * obj.rect['height'])
			distances.append(math.sqrt((obj_x - x)**2 + (obj_y - y)**2))
	distances.sort()
	return distances[:3]


def relative_size_helper(element, objects):
	'''
	element and objects are the same as above
	returns the difference in sizes between the element and the average of sizes of everything in objects list
	'''
	sum_areas = 0
	for obj in objects:
		if obj.id != element.id:
			sum_areas += (obj.rect['height'] * obj.rect['width'])

	denom = len(objects)
	if denom == 0: denom = 1
	return (element.rect.get['height'] * element.rect.get['width']) - (sum_areas/float(denom))

def create(element, relevant_ids, page_info):
	'''
	1) element is a singular web element from a HTML page
	2) relevant_ids is a list where the 0th index is a list of element IDs 
	   for price nodes and the 1st index is a list of element IDs for image nodes
	3) page_info is page level information that we don't want to be using our web driver for for each element

	returns a 1-by-(K+1) numpy array where K is the number of features in the dataset (+1 for the label)
	'''
	returned_row = []

	#for loop through each of these for the element
	HTML_attribute_values = ['price', 'orig', 'sale', 'retail', 'reg', 'img','image', 'main', 'prim', 'prod', '.jpg', '.jpeg', '.png', '.gif']
	HTML_plain_text = ['price', 'your', 'orig', 'discount', 'off', 'reg', 'sale', '$', 'USD', 'retail', 'U.S.D.']
	HTML_tags['s', 'del', 'strike', 'span', 'h1', 'h2', 'h3', 'img', 'a', 'div', 'head', 'script', 'header', 'html', 'title', 'meta']
	
	#text features here
	text = (str(element.text)).lower()

	for item in HTML_plain_text:
		if item in text: returned_row.append('1')
		else: returned_row.append('0')

	returned_row.append(len(text.replace(' ', ''))) #adding the length of the text as a feature

	#regex features with the text here
	expressions = ['\$\d+\.\d\d', '\$\d+', '\d+\.\d\d']
	for expression in expressions:
		if re.match(expression, text) == None: returned_row.append('0')
		else: returned_row.append('1')

	#tag features here
	tag = str(element.tag_name).lower()
	for item in HTML_tags:
		if item == tag: returned_row.append('1')
		else: returned_row.append('0')

	#can't do anything with parent/cousin nodes, since we have no knowledge of them, i.e. element.parent.text isn't a thing
	#do attribute values here
	#no ability to get all the attribute values
	id_attr = str(element.get_attribute('id'))
	class_attr = str(element.get_attribute('class'))
	src_attr = str(element.get_attribute('src'))
	for item in HTML_attribute_values:
		if item in id_attr or item in class_attr or item in src_attr: returned_row.append('1')
		else: returned_row.append('0')

	returned_row.append(element.is_displayed()) #whether the element is visible on the page

	#finding the absolute location on the page
	returned_row.append(element.rect['x'] + (0.5 * element.rect['width']))
	returned_row.append(element.rect['y'] + (0.5 * element.rect['height'])) 


	returned_row.append(float(element.rect.get('height'))/element.rect.get('width')) #squareness
	
	distances = self.distance_helper(element, page_info.get('dollar_objects'))
	for d in distances:
		returned_row.append(d) #cast to string? probably  doesn't matter
	for i in xrange(3 - len(distances)):
		returned_row.append(500) # <- don't know how I feel about hard-coding this. A more elegant solution?
	distances = self.distance_helper(element, page_info.get('img_objects'))
	for d in distances:
		returned_row.append(d) #same string cast question here
	for i in xrange(3 - len(distances)):
		returned_row.append(500) #same thing

	returned_row.append(self.relative_size_helper(element, page_info.get('dollar_objects')))
	returned_row.append(self.relative_size_helper(element, page_info.get('img_objects')))


	#add in code to loop through ids and determine what the label for this node is
	label = 0 #0 is irrelevant, 1 is price, 2 is image
	for i, l in enumerate(relevant_ids):
		for rel in l:
			if rel == element.id: label = i + 1
	returned_row.append(label)

	#finally return the row
	return np.array(returned_row).reshape(1, len(returned_row))





