from rest_framework.test import APITestCase
from rest_framework import status
from .models import Portfolio
from django.urls import reverse


class PortfolioTest(APITestCase):
    def test_create_portfolio(self):
        url = reverse("portfolio-list")
        data = {
            "name": "Test Portfolio",
            "owner": "John Doe",
            "geographic_region": "Region",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Portfolio.objects.count(), 1)
        self.assertEqual(Portfolio.objects.get().name, "Test Portfolio")
        self.assertEqual(Portfolio.objects.get().owner, "John Doe")
        self.assertEqual(Portfolio.objects.get().geographic_region, "Region")

    def test_create_portfolio_invalid_data(self):
        url = reverse("portfolio-list")
        data = {"name": "", "owner": "", "geographic_region": ""}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)
        self.assertIn("owner", response.data)
        self.assertIn("geographic_region", response.data)

    def test_update_portfolio(self):
        portfolio = Portfolio.objects.create(
            name="Rudolf Nilsens Plass", owner="Thomas Anda", geographic_region="Oslo"
        )
        url = reverse("portfolio-detail", args=[portfolio.id])
        data = {
            "name": "Anders Nilsens Plass",
            "owner": "Updated Owner",
            "geographic_region": "Updated Region",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        portfolio.refresh_from_db()
        self.assertEqual(portfolio.name, "Anders Nilsens Plass")

    def test_delete_portfolio(self):
        portfolio = Portfolio.objects.create(
            name="Rudolf Nilsens Plass", owner="Thomas Anda", geographic_region="Oslo"
        )
        Portfolio.objects.create(
            name="Rudolf Nilsens Plass", owner="Thomas Anda", geographic_region="Oslo"
        )
        url = reverse("portfolio-detail", args=[portfolio.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Portfolio.objects.count(), 1)
