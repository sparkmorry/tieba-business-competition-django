#-*- coding:utf-8 -*-

from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render_to_response
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.csrf import csrf_exempt

from tieba.ba.models import Ba, VoteRecord

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
		print string
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
TICKET = 'sM4AOVdWfPE4DxkXGEs8VMUjRWEWssdOOv6VmRHDOmwom0JGOi7mZWcwM-XjMc8uBFbk3beD4tSLOQWxyL_2Kw'
LASTTIME = 0;
EXPIRETIME = 1435285854+6500

def home(request):
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


@xframe_options_exempt
def tab1(request):
	return render_to_response('tab1.html')

@xframe_options_exempt
def tab2(request):
	return render_to_response('tab2.html')

def get_client_ip(request):
	x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
	if x_forwarded_for:
		print x_forwarded_for
		ip = x_forwarded_for.split(',')[-1].strip()
		print "ip:" +str(ip)
	else:
		print request.META		
		ip = request.META.get('REMOTE_ADDR')
		socket = request.META.get('wsgi.input')
		print socket
		print "meta:" +str(ip)
	return ip

@csrf_exempt
def vote_ip(request):
	MAX_VOTE = 10
	tieba_id = request.POST['tiebaId']
	ip = get_client_ip(request)

	response_data = {}
	try:
		ba = Ba.objects.get(id=tieba_id)
		# print ba
		try:
			record = VoteRecord.objects.get(ip=ip)
			if(record.last_vote_day == datetime.date.today()):
				# 如果上一次投票时今天
				print "today"
				if(record.last_day_votes < MAX_VOTE):
					# 如果当天投票没有超过上限
					record.last_day_votes = record.last_day_votes + 1
					record.total_votes = record.total_votes + 1
					record.save()
					# 更新贴吧票数
					ba.votes = ba.votes + 1
					# ba.total_votes = ba.total_votes + 1
					ba.save()			
					response_data['code'] = 0  
					response_data['msg'] = '投票成功' 
					response_data['votes'] = ba.votes * 10
					# response_data['totalVotes'] = ba.total_votes*10					
				else:
					# 如果当天投票超过上限
					response_data['code'] = 1  
					response_data['msg'] = '您今日的投资金额已用完，请明天再来！' 	
			else:
				# 如果上一次投票不是今天，清空今天
				print "new day"
				record.last_vote_day = datetime.date.today()
				record.last_day_votes = 1
				record.total_votes = record.total_votes + 1 
				record.save()
				# 更新贴吧票数
				ba.votes = ba.votes + 1
				# ba.total_votes = ba.total_votes + 1
				ba.save()
				response_data['code'] = 0  
				response_data['msg'] = '投票成功' 
				response_data['votes'] = ba.votes*10	
				# response_data['totalVotes'] = ba.total_votes*10					
		except ObjectDoesNotExist:
			# 如果数据库中不存在该ip投票记录
			record = VoteRecord(ip=ip, total_votes=1, last_day_votes=1)
			record.save()
			# 更新贴吧票数
			ba.votes = ba.votes + 1
			# ba.total_votes = ba.total_votes + 1
			ba.save()
			response_data['code'] = 0  
			response_data['msg'] = '投票成功' 
			response_data['votes'] = ba.votes*10
				
	except ObjectDoesNotExist:
		response_data['code'] = 1 
		response_data['msg'] = '该贴吧不存在'	

	return HttpResponse(json.dumps(response_data), content_type="application/json")  

@csrf_exempt
def vote(request):
	votes_per_day = 10
	tieba_id = request.POST['tiebaId']
	COST = 10
	step1 = [297, 73, 24, 16, 249, 209, 64, 49, 130, 61, 822, 25, 55, 6, 76, 80]

	response_data = {}
	try:
		ba = Ba.objects.get(id=tieba_id)
		vote_count = request.session.get('vvct', 0)
		# print vote_count
		if vote_count < votes_per_day:
			ba.votes = ba.votes + 1
			ba.total_votes = ba.total_votes + 1
			ba.save()
			# print ba.votes
			# session
			request.session['vvct'] = vote_count + 1
			tomorrow = datetime.date.today() + datetime.timedelta(days=1)
			tm_stme = datetime.time(0, 0, 0)
			tm_stdate = datetime.datetime.combine(tomorrow, tm_stme)
			now = datetime.datetime.now()	
			# delta = (tm_stdate - datetime.datetime.now()).total_seconds()
			delta = (tm_stdate - datetime.datetime.now()).seconds		
			# print delta
			# delta = (tm_stdate - datetime.datetime.now()).total_seconds()
			request.session.set_expiry(delta)
			# ex = request.session.get_expiry_date()
			# print ex
			# ret
			ba_index = ba.id - 1
			vote_f = step1[ba_index]*1000 + (ba.votes-step1[ba_index])*10
			response_data['code'] = 0  
			response_data['msg'] = '投票成功' 
			response_data['votes'] = vote_f	
			response_data['totalVotes'] = ba.total_votes*COST
			response_data['remain'] = (votes_per_day - vote_count - 1)*10

		else:
			# todo 保存ip？
			response_data['code'] = 1 
			response_data['msg'] = '您今日的投资金额已用完，请明天再来！' 	
	except ObjectDoesNotExist:
		response_data['code'] = 1 
		response_data['msg'] = '该贴吧不存在'	

	return HttpResponse(json.dumps(response_data), content_type="application/json")  


@xframe_options_exempt
def tab3(request):
	all_tieba = Ba.objects.all()
	ba_total_votes = []
	COST = 1000
	# step1 = [297, 73, 24, 16, 249, 209, 64, 49, 130, 61, 822, 25, 55, 6, 76, 80]
	step1 = [297, 73, 24, 16, 549, 509, 264, 249, 130, 61, 822, 25, 55, 6, 76, 80]
	my_tieba_votes_list = []
	for ba in all_tieba:
		ba_index = ba.id - 1
		temp_vote = step1[ba_index]*1000 + (ba.votes-step1[ba_index])*10
		my_tieba_votes_list.append(temp_vote)

	v1 = (my_tieba_votes_list[0] + my_tieba_votes_list[1] + my_tieba_votes_list[2]+ my_tieba_votes_list[3])
	v2 = (my_tieba_votes_list[4] + my_tieba_votes_list[5] + my_tieba_votes_list[6]+ my_tieba_votes_list[7])
	v3 = (my_tieba_votes_list[8] + my_tieba_votes_list[9] + my_tieba_votes_list[10]+ my_tieba_votes_list[11])
	v4 = (my_tieba_votes_list[12] + my_tieba_votes_list[13] + my_tieba_votes_list[14]+ my_tieba_votes_list[15])
	ba_total_votes.append(v1)
	ba_total_votes.append(v2)
	ba_total_votes.append(v3)
	ba_total_votes.append(v4)

	# print all_tieba
	return render_to_response('tab3.html', {'tieba_list': all_tieba, 'ba_total_votes': ba_total_votes, 'cost': COST, 'my_tieba_votes_list': my_tieba_votes_list})

@xframe_options_exempt
def tab4(request):
	all_tieba = Ba.objects.all()
	ba_total_votes = []
	COST = 1000
	# step1 = [297, 73, 24, 16, 249, 209, 64, 49, 130, 61, 822, 25, 55, 6, 76, 80]
	step1 = [297, 73, 24, 16, 549, 509, 264, 249, 130, 61, 822, 25, 55, 6, 76, 80]
	my_tieba_votes_list = []
	for ba in all_tieba:
		ba_index = ba.id - 1
		temp_vote = step1[ba_index]*1000 + (ba.votes-step1[ba_index])*10
		my_tieba_votes_list.append(temp_vote)

	v1 = (my_tieba_votes_list[0] + my_tieba_votes_list[1] + my_tieba_votes_list[2]+ my_tieba_votes_list[3])
	v2 = (my_tieba_votes_list[4] + my_tieba_votes_list[5] + my_tieba_votes_list[6]+ my_tieba_votes_list[7])
	v3 = (my_tieba_votes_list[8] + my_tieba_votes_list[9] + my_tieba_votes_list[10]+ my_tieba_votes_list[11])
	v4 = (my_tieba_votes_list[12] + my_tieba_votes_list[13] + my_tieba_votes_list[14]+ my_tieba_votes_list[15])
	ba_total_votes.append(v1)
	ba_total_votes.append(v2)
	ba_total_votes.append(v3)
	ba_total_votes.append(v4)

	# print all_tieba
	return render_to_response('tab4.html', {'tieba_list': all_tieba, 'ba_total_votes': ba_total_votes, 'cost': COST, 'my_tieba_votes_list': my_tieba_votes_list})

@xframe_options_exempt
def weekly(request):
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

	url = 'http://ssld-vi.com/tieba/weekly'
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
	return render_to_response('weekly/week3.html', {'jsticket' : tick, 'sig': sig})

def weekly4(request):
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

	url = 'http://ssld-vi.com/tieba/weekly/4'
	if len(request.GET) > 0:
		url = url + "?" + urllib.urlencode(request.GET)
	sign = Sign(TICKET, url)
	tick = sign.sign()
	tick['appId'] = APPID
	sig = tick['signature']

	print sig	
	return render_to_response('weekly/week4.html', {'jsticket' : tick, 'sig': sig})

def invitation(request):
	return render_to_response('invitation.html')

def invitation2(request):
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

	url = 'http://ssld-vi.com/tieba/invitation2'
	if len(request.GET) > 0:
		url = url + "?" + urllib.urlencode(request.GET)
	sign = Sign(TICKET, url)
	tick = sign.sign()
	tick['appId'] = APPID
	sig = tick['signature']

	return render_to_response('invitation2.html', {'jsticket' : tick, 'sig': sig})

def anniversary(request):
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

	url = 'http://ssld-vi.com/tieba/anniversary'
	if len(request.GET) > 0:
		url = url + "?" + urllib.urlencode(request.GET)
	sign = Sign(TICKET, url)
	tick = sign.sign()
	tick['appId'] = APPID
	sig = tick['signature']

	# return render_to_response('anniversary.html', {})

	return render_to_response('anniversary.html', {'jsticket' : tick, 'sig': sig})

def anniversary2(request):
	return render_to_response('anniversary2.html')

def anni(request):
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

	url = 'http://ssld-vi.com/tieba/anni3'
	if len(request.GET) > 0:
		url = url + "?" + urllib.urlencode(request.GET)
	sign = Sign(TICKET, url)
	tick = sign.sign()
	tick['appId'] = APPID
	sig = tick['signature']

	return render_to_response('annimin.html', {'jsticket' : tick, 'sig': sig})
