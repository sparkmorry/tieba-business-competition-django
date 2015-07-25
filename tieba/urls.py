from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'tieba.views.home', name='home'),
    # url(r'^share/$', 'tieba.views.share', name='share'),
    # url(r'^send/$', 'tieba.views.send', name='send'),
    url(r'^tab1/$', 'tieba.views.tab1', name='tab1'),
    url(r'^tieba/vote$', 'tieba.views.vote', name='vote'),
    url(r'^tieba/tab2/$', 'tieba.views.tab2', name='tab2'),
    url(r'^tieba/tab3/$', 'tieba.views.tab3', name='tab3'),
    url(r'^tieba/weekly$', 'tieba.views.weekly', name='weekly'),
    url(r'^tieba/invitation$', 'tieba.views.invitation', name='invitation'),


    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
