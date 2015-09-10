from django.conf.urls import patterns, include, url
from django.conf import settings


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
    url(r'^tieba/tab4/$', 'tieba.views.tab4', name='tab4'),
    url(r'^tieba/weekly$', 'tieba.views.weekly', name='weekly'),
    url(r'^tieba/weekly/4$', 'tieba.views.weekly4', name='weekly4'),
    url(r'^tieba/invitation$', 'tieba.views.invitation', name='invitation'),
    url(r'^tieba/invitation2$', 'tieba.views.invitation2', name='invitation2'),
    url(r'^tieba/anniversary$', 'tieba.views.anniversary', name='anniversary'),
    url(r'^tieba/anniversary2$', 'tieba.views.anniversary2', name='anniversary2'),
    url(r'^tieba/anni$', 'tieba.views.anni', name='anni'),

    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
)