from rest_framework import serializers
from .models import Portfolio, Property


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            "id",
            "portfolio",
            "address",
            "estimated_value",
            "construction_year",
            "square_footage",
            # "representational_image",
        ]


class PortfolioSerializer(serializers.ModelSerializer):
    properties = PropertySerializer(many=True, read_only=True)

    class Meta:
        model = Portfolio
        fields = ["id", "properties", "name", "owner", "geographic_region"]
