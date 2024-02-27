from featured.models import Featured
content = {'Club House Atlanta': {'name': 'Club House Atlanta', 'description': 'Club House is a local children and toys store that is an authorized Smiski seller.', 'link': 'https://www.clubhousekidandcraft.com/collections/blind-boxes/products/smiski-living-series', 'address': '533A W Howard Ave.\r\nDecatur, GA 30030', 'image': 'https://angel-trading-direct-upload.s3.us-east-2.amazonaws.com/Club+House.png'}, 'Posman Books Meetup': {'name': 'Posman Books Meetup', 'description': 'Posman Books is hosting a Smiski and Sonny Angel meetup in Atlanta', 'link': 'https://www.eventbrite.com/e/meet-a-smiski-at-our-sonny-angelsmiski-trading-event-at-posman-books-atl-tickets-850445043017?aff=ebdssbdestsearch', 'address': '675 Ponce De Leon Avenue Northeast #C-197 Atlanta, GA 30308', 'image': 'https://angel-trading-direct-upload.s3.us-east-2.amazonaws.com/PosmanBooksATL.png'}, 'Smiski Touch Light': {'name': 'Smiski Touch Light', 'description': '"Smiski Daydreaming", which appeared in "Living Series", is now available as a touch light! Smiski is pondering with a small cat on his head that gently illuminates your room.', 'link': 'https://smiski.com/e/news/240205/', 'address': 'n/a', 'image': 'https://angel-trading-direct-upload.s3.us-east-2.amazonaws.com/smiski_light_banner01.jpg'}}

Featured.objects.all().delete()

for name, data in content.items():
    Featured.objects.create(
        name=data['name'],
        description=data['description'],
        link=data['link'],
        address=data['address'],
        image=data['image']
    )