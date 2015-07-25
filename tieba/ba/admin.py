#-*- coding:utf-8 -*-
from django.contrib import admin
from tieba.ba.models import Ba

class BaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'votes')
    ordering = ('id',) #降序

admin.site.register(Ba, BaAdmin)
