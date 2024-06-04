from rest_framework import viewsets
from .models import Portfolio, Property
from .seralizers import PortfolioSerializer, PropertySerializer


class PortfolioViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all().order_by("id")


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
