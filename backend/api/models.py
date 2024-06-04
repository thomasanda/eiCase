from django.db import models


class Portfolio(models.Model):
    name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    geographic_region = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)


class Property(models.Model):
    portfolio = models.ForeignKey(
        Portfolio, related_name="properties", on_delete=models.CASCADE
    )
    address = models.CharField(max_length=255)
    estimated_value = models.DecimalField(max_digits=10, decimal_places=2)
    construction_year = models.PositiveIntegerField()
    square_footage = models.PositiveIntegerField()
    # representational_image = models.ImageField(
    #     upload_to="property_images/", null=True, blank=True
    # )

    def __str__(self):
        return str(self.address)
