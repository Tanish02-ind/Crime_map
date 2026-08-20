from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        CITIZEN = 'CITIZEN', _('Citizen')
        POLICE_SI = 'POLICE_SI', _('Sub-Inspector')
        POLICE_INSPECTOR = 'POLICE_INSPECTOR', _('Inspector')

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CITIZEN,
    )
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
