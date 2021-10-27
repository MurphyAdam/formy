from django.urls import path
from django.conf.urls import url
from .views import DataPointSearchViewSet
from rest_framework.urlpatterns import format_suffix_patterns

dp_search_list = DataPointSearchViewSet.as_view({'get': 'retrieve'})

urlpatterns = [
    path('places', dp_search_list, name='places-search-list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
