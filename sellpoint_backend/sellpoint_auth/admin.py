from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Address
from django.utils.translation import ugettext_lazy as _


class AddressInline(admin.StackedInline):
    """
    Simple admin interface "inline" for a user's address
    """

    model = Address


class UserAdmin(BaseUserAdmin):
    """
    Modified UserAdmin to use email as "username" when authenticating. SellPoint
    has no username field.
    """

    # Inline so we can edit a user's address
    inlines = (AddressInline,)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "phone_number")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )

    list_display = ("email", "first_name", "last_name", "is_staff")
    search_fields = ("first_name", "last_name", "email")
    ordering = ("email",)


admin.site.register(User, UserAdmin)
