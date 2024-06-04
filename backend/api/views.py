from rest_framework import viewsets
from .models import Portfolio, Property
from .seralizers import PortfolioSerializer, PropertySerializer


class PortfolioViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all().order_by("id")


class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()

        portfolio_id_str = self.request.query_params.get("portfolio_id")
        if portfolio_id_str is not None:
            cleaned_portfolio_id_str = "".join(
                filter(str.isdigit, portfolio_id_str)
            )  # Keep only digits
            portfolio_id = int(cleaned_portfolio_id_str)  # Convert to integer
            queryset = queryset.filter(portfolio_id=portfolio_id)

        return queryset
