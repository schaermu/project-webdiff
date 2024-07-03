import factory
from factory import fuzzy
from faker import Faker
from core.models import User

fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    first_name = factory.LazyAttribute(
        lambda obj: (
            fake.first_name_male() if obj._gender == "M" else fake.first_name_female()
        )
    )
    last_name = fake.last_name()
    email = factory.LazyAttribute(
        lambda obj: f"{obj.first_name}.{obj.last_name}@{fake.domain_name()}"
    )
    _gender = fuzzy.FuzzyChoice(("M", "F"))

    class Meta:
        exclude = ("_gender",)
        model = User
