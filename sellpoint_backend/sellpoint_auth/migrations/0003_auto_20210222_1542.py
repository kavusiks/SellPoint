# Generated by Django 3.1.6 on 2021-02-22 15:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("sellpoint_auth", "0002_address"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="address",
            options={"verbose_name": "Address"},
        ),
        migrations.AlterModelOptions(
            name="user",
            options={"verbose_name": "User"},
        ),
    ]
