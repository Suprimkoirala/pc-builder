from django.contrib import admin
from .models import (
    Category,
    Vendor,
    Component,
    Build,
    BuildComponent,
    CompatibilityRule,
)

# Note: User admin is not needed since we're managing users via SQL directly

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'website')

@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'vendor', 'price', 'stock')
    list_filter = ('category', 'vendor')
    search_fields = ('name',)

@admin.register(Build)
class BuildAdmin(admin.ModelAdmin):
    list_display = ('name', 'user_id', 'total_price', 'created', 'is_public')
    list_filter = ('is_public', 'created')
    search_fields = ('name',)

@admin.register(BuildComponent)
class BuildComponentAdmin(admin.ModelAdmin):
    list_display = ('build', 'component', 'quantity')
    list_filter = ('build',)
    search_fields = ('component__name',)

@admin.register(CompatibilityRule)
class CompatibilityRuleAdmin(admin.ModelAdmin):
    list_display = ('source', 'target', 'condition')
