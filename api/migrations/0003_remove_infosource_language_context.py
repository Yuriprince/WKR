# Generated by Django 3.0.3 on 2020-05-27 19:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200527_2207'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='infosource',
            name='language_context',
        ),
    ]
