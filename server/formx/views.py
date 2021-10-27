import requests
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response


class DataPointSearchViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        # we get PLACES_MAPS_API_KEY from Django settings (imported from .env for security)
        g_key = settings.PLACES_MAPS_API_KEY
        # we get request params
        params = self.request.query_params
        # we care about the "q" param
        query = params.get('q', None)
        # we setup our url with the query and the key
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={g_key}"
        # make a request to googleapis maps API
        response = requests.get(url)
        # get response_status (we use it to test if the req is a success, and 
        # we also use it to send an status to the client in case of an error)
        response_status = response.status_code
        # our data object, sent regardless of the status
        data = {}
        if response_status == 200:
            results = response.json()['results']
            data = {
                'results': results,
            }
            return Response(data, response_status)
        # the data object will have a message property for the error
        data['message'] = 'Something went wrong'
        return Response(data, response_status)


        