from django.db import models
from django.core.validators import MinValueValidator, RegexValidator
from django.urls import reverse
import json

# Note: User model is handled via SQL directly, not through Django ORM
# The User table exists in the database but is managed by our SQL classes

class Category(models.Model):
    """Component categories (CPU, GPU, etc.)"""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)  # Font Awesome class

    def __str__(self):
        return self.name

class Vendor(models.Model):
    """Hardware manufacturers and retailers"""
    name = models.CharField(max_length=100, unique=True)
    website = models.URLField()
    logo = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Component(models.Model):
    """Individual hardware components"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0)]
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    image = models.URLField()
    specs = models.JSONField(default=dict)  # e.g. {"clock_speed": "3.5GHz"}
    stock = models.IntegerField(default=100)  # Inventory tracking

    def get_absolute_url(self):
        return reverse('component-detail', args=[str(self.id)])

    def __str__(self):
        return f"{self.name} ({self.category})"

class Build(models.Model):
    """User-created PC configurations"""
    # Note: user field references the pcbuilder_user table managed by SQL
    user_id = models.IntegerField()  # References pcbuilder_user.id
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=True)
    total_price = models.DecimalField(
        max_digits=12, 
        decimal_places=2, 
        editable=False
    )

    def save(self, *args, **kwargs):
        # This is handled by SQL now, but keeping for reference
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Build {self.id}: {self.name}"

class BuildComponent(models.Model):
    """Through table for build-component relationships"""
    build = models.ForeignKey(Build, on_delete=models.CASCADE, related_name='components')
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    notes = models.CharField(max_length=200, blank=True)

    class Meta:
        unique_together = [['build', 'component']]

    def __str__(self):
        return f"{self.component.name} x{self.quantity} in {self.build.name}"

class CompatibilityRule(models.Model):
    """Component compatibility constraints"""
    source = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='source_rules'
    )
    target = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='target_rules'
    )
    condition = models.JSONField(
        help_text='Example: {"attribute": "socket", "operator": "equals"}'
    )

    def __str__(self):
        return f"{self.source} ↔ {self.target}: {json.dumps(self.condition)}"