#-*- coding:utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response

import urllib2
import urllib
import json

import time
import random
import string
import hashlib

import datetime 

class Sign:
	def __init__(self, jsapi_ticket, url):
		self.ret = {
			'nonceStr': self.__create_nonce_str(),
			'jsapi_ticket': jsapi_ticket,
			'timestamp': self.__create_timestamp(),
			'url': url
		}

	def __create_nonce_str(self):
		return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(15))

	def __create_timestamp(self):
		return int(time.time())

	def sign(self):
		string = '&'.join(['%s=%s' % (key.lower(), self.ret[key]) for key in sorted(self.ret)])
		# print string
		self.ret['signature'] = hashlib.sha1(string).hexdigest()
		return self.ret

global APPID
global APPSECRET
global TICKET
global LASTTIME
global EXPIRETIME

# APPID = 'wx69a1f910a2c01361'
# APPSECRET = '3f2cfb8faf9118d391061560fe4e5314'
APPID = 'wxfb2f5ab1e2f95ee5'
APPSECRET = '2b2ebb9362ac397e3916cf74d9f30f22'
TICKET = 'sM4AOVdWfPE4DxkXGEs8VMUjRWEWssdOOv6VmRHDOmzoLHuCU9CX7gj9Ck50UKvq7MPnP8yyEaBTjjbY-Tlyng'
LASTTIME = 0
VISITTIMES = 0
SHARETIMES = 0
SENDTIMES = 0
EXPIRETIME = 1435567999+6500

def home(request):
	global VISITTIMES
	VISITTIMES = VISITTIMES+1
	print(VISITTIMES)
	f = open('data.txt', 'a+')
	f.write("页面访问量:")	
	f.write(str(VISITTIMES))
	f.close
	now = int(time.time())
	global EXPIRETIME
	global TICKET
	if(now>EXPIRETIME):		
		print APPID
		print APPSECRET
		tokenurl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET
		serialized_data = urllib2.urlopen(tokenurl).read()
		data = json.loads(serialized_data)	
		ACCESS_TOKEN = data['access_token']
		tickeurl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ACCESS_TOKEN+'&type=jsapi'
		ticket_data = urllib2.urlopen(tickeurl).read()
		ticket = json.loads(ticket_data)	
		TICKET = ticket['ticket']
		EXPIRETIME = now + 7000
		print EXPIRETIME
		print TICKET

	# print APPID
	# print APPSECRET
	# tokenurl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET
	# serialized_data = urllib2.urlopen(tokenurl).read()
	# data = json.loads(serialized_data)	
	# ACCESS_TOKEN = data['access_token']
	# tickeurl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ACCESS_TOKEN+'&type=jsapi'
	# ticket_data = urllib2.urlopen(tickeurl).read()
	# ticket = json.loads(ticket_data)	
	# TICKET = ticket['ticket']
	# print TICKET
	# print now

	url = 'http://ssld-vi.com/'
	if len(request.GET) > 0:
		url = url + "?" + urllib.urlencode(request.GET)
	#print request.GET
	#print url
	sign = Sign(TICKET, url)
	tick = sign.sign()
	tick['appId'] = APPID
	sig = tick['signature']

	print sig	
	# return render_to_response('index.html')
	return render_to_response('index.html', {'jsticket' : tick, 'sig': sig})

def share(request):
	if request.method == 'GET':
		global SHARETIMES
		SHARETIMES = SHARETIMES+1
		print SHARETIMES
		f = open('data.txt', 'a+')
		f.write('分享到朋友圈：')
		f.write(str(SHARETIMES))
		f.close
		return HttpResponse()

def send(request):
	if request.method == 'GET':
		global SENDTIMES
		SENDTIMES = SENDTIMES+1
		f = open('data.txt', 'a+')
		f.write('发送给好友')
		f.write(str(SENDTIMES))
		f.close

		return HttpResponse()