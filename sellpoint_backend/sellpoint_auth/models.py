from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from .user_manager import UserManager
from django.db.models.deletion import CASCADE
from sellpoint_project.maps import gmaps
import geopy.distance

# Simple regex validator for validating a phone number
PHONE_REGEX = RegexValidator(
    regex=r"^\+?1?\d{9,15}$",
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Modified user to use email as USERNAME_FIELD, instead of a separate username
    """

    class Meta:
        verbose_name = _("User")

    email = models.EmailField(
        _("email address"), unique=True, max_length=255, blank=False
    )
    first_name = models.CharField(
        _("first name"), null=False, blank=False, max_length=150
    )
    last_name = models.CharField(
        _("last name"), null=False, blank=False, max_length=150
    )

    phone_number = models.CharField(validators=[PHONE_REGEX], max_length=17, blank=True)

    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )

    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    # Overridden manager to allow for
    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]


class Address(models.Model):
    """
    A user's address, with a one-to-one relationship to User model
    """

    class Meta:
        verbose_name = _("Address")

    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)

    line1 = models.CharField(max_length=150)
    line2 = models.CharField(max_length=150, null=True, blank=True)
    postalcode = models.CharField(max_length=10)
    city = models.CharField(max_length=150)
    country = models.CharField(max_length=150)

    def get_geocode(self):
        address_parts = [self.line1]
        if self.line2:
            address_parts.append(self.line2)
        address_parts += [self.postalcode, self.city, self.country]

        geocode = gmaps.geocode(", ".join(address_parts))
        if not geocode:
            return None
        return geocode[0]["geometry"]["location"]

    def distance(self, other):
        self_geo = self.get_geocode()
        other_geo = other.get_geocode()

        if not (self_geo and other_geo):
            return -1

        return round(geopy.distance.geodesic(
            (self_geo["lat"], self_geo["lng"]), (other_geo["lat"], self_geo["lng"])
        ).km)
