from django.conf import settings
from rest_framework.test import APITestCase, APIClient

class DataPointTests(APITestCase):

    client = APIClient()

    def setUp(self):
        self.url = 'http://127.0.0.1:8000/api/places'
        self.query = 'London'
        self.response = self.client.get(self.url, {'q': self.query}, format='json')

    def test_response_status_code(self):
        """
        Ensure we get a valid reponse code
        """
        self.assertEqual(self.response.status_code, 200)

    def test_respone_data(self):
        """
        Ensure we get valid response data
        """
        results_list = self.response.json()['results']
        self.assertIsInstance(results_list, list)
        results_object = results_list[0]
        self.assertIsInstance(results_object, dict)
        self.assertEqual(results_object['formatted_address'], 'London, UK')


