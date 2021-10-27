
from django.contrib import admin
from django.urls import path, include, re_path
from frontend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('formx.urls')),
]

# catch any other URL and forward it to front-end (client, react-router-dom)
urlpatterns += [
    re_path(r"^(?P<path>.*)/$", views.FrontendAppView.as_view()),
    re_path("", views.FrontendAppView.as_view()),
]