#-*- coding:utf-8 -*-

from datetime import datetime
from django.db import models

class Ba(models.Model):
	name = models.CharField('贴吧名称', max_length=20)
	votes = models.IntegerField('当前票数', default=0)
	total_votes = models.IntegerField('所属战队总票数', default=0)

	def __unicode__(self):
		return self.name

class VoteRecord(models.Model):
	ip = models.CharField('投票IP', max_length=20)
	total_votes = models.IntegerField('已经投的所有票数', default=0)
	last_day_votes = models.IntegerField('最后投票当天票数', default=0) #如果纪录的天和当天不一致，代表今天第一次投票，归0
	last_vote_day = models.DateField('最后一次投票日期', default=datetime.now())

	def __unicode__(self):
		return self.ip