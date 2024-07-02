import factory
from faker import Faker
from watches.models import Watch

fake = Faker()


class WatchFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Watch

    owner = factory.SubFactory("core.tests.factories.UserFactory")
    watch_url = fake.url()
    name = fake.name()
