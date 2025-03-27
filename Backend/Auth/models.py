from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError

def validate_file_size(value):
    filesize = value.size
    
    if filesize > 5 * 1024 * 1024: 
        raise ValidationError("The maximum file size that can be uploaded is 5MB")

class Organization(models.Model):
    name = models.CharField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    website_link = models.URLField(blank=True, null=True)
    description = models.TextField()
    logo = models.ImageField(
        upload_to='organization_logos/', 
        validators=[
            FileExtensionValidator(['png', 'jpg', 'jpeg']),
            validate_file_size
        ],
        blank=True, 
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Organizations"
        ordering = ['-created_at']