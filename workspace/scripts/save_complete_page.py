from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import os
import time

def save_page_command(driver):
    save_me = ActionChains(driver).key_down(Keys.COMMAND).key_down('s').key_up(Keys.COMMAND).key_up('s')
    save_me.perform()

def enter_filename_and_hit_enter(filename):
    hit_enter_cmd = """
    osascript -e 'tell application "System Events" to keystroke return' 
    """
    type_url_cmd = """osascript -e 'tell application "System Events" to keystroke""" + " \"" + filename + ".html\"'"

    os.system(type_url_cmd)
    time.sleep(.5)
    os.system(hit_enter_cmd)
