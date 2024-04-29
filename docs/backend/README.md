# Documentation For Backend
The folder named `backend` contains the backend code for the project. The backend is built using Django and Django Rest Framework.

## Technologies
- Django
- Django Rest Framework
- Python
- SQLite / Postgres for Production
- Docker
- Fly

## Structure
The logic for the backend is divided into 4 main apps:
1. `collectibles` - This app contains the models and serializers for the collectibles.
2. `featured` - This app contains the models and serializers for the featured items / events.
3. `profiles` - This app contains the models and serializers for the user profiles.
4. `trades` - This app contains the models and serializers for the trades and listings.

There is also a scripts folder that contains the scripts for the backend, this includes things such as loading default data into the database.

In the `app_settings` directory there are the following important files:
- `middleware.py` - Contains the middleware for the backend. Specifically this validates the JWT token for the user with Clerk.
- `settings.py` - Contains the settings for the backend. This includes the database settings, authentication settings, and the rest framework settings.
- `urls.py` - Contains the urls for the backend APIs. This is where you can add a new API endpoint.
- `views.py` - These are the API views that don't apply to a model, such as the `S3UrlView`.
- The `wsgi.py` and `asgi.py` files are the entry points for the backend, you shouldn't need to worry about these.

There are other important files in the root directory of the backend:
- `Dockerfile` - This is the Dockerfile for the backend. This is used to build the Docker image for the backend, as well as indicate the specifications for gunicorn.
    1. `gunicorn` manages the workers for the backend. This is used to handle the incoming requests to the backend. The number of workers can be adjusted in the `Dockerfile`.
- `fly.toml` - This is the configuration file for Fly. This is used to deploy the backend to Fly. This file contains the configuration for the backend, such as the number of instances, the region, and the name of the backend. You can deploy to fly with the command `fly deploy`.
- `requirements.txt` - This file contains the python packages that are required for the backend. This is used to install the required packages when building the Docker image. When adding a new package, make sure to add it to this file using `pip freeze > requirements.txt`.

## Adding a new App
Use the command `python manage.py startapp <app_name>` to create a new app. This will create the necessary files for the app. Make sure to add the app to the `INSTALLED_APPS` in the `settings.py` file.
Also make sure to register the App in the admin in the `admin.py` file.

## Adding a new Model
You can reference the Django documentation for creating a model, and which fields/types are available. Additionally there are examples in the other `**/models.py` files which you can reference. Once you have added a field or model, to update the database schema run `python manage.py makemigrations` and then to apply those migrations run `python manage.py migrate`. The `makemigrations` command will create a migration file in the `migrations` folder of the app, which should be included in your commits so that other users recieve your changes.

## Adding a new Serializer
Serialiers are used to convert the model data into JSON format. You can reference the Django Rest Framework documentation for creating a new serializer. Once you have created the serializer, you can use it in the API views to convert the model data into JSON format. These should be stored in the respective `**/serializers.py` file.

## Adding a new API
APIs can be added in the respective `**/views.py` file. You can reference the Django Rest Framework documentation for creating a new API. Once you have created the API, you can add the URL to the `urls.py` file in the root directory of the backend. This will allow the API to be accessed at the specified URL.

Some key things to note:
- The API should be a class based view that inherits from `APIView`.
- The API should have `permission_classes = [IsAuthenticated]` in order to require the user to be authenticated.
- You can retrieve the profile of the user making the request by accessing `request.user`. ie: `profile = Profile.objects.get(user=request.user)`.
- You can access the data sent in the request by using `request.data`. ie: `data = request.data["someField"]`.
- You can access the query parameters of the request by using `request.query_params.get()`. ie: `param = request.query_params.get("someParam")`.
- You can return a response from the API by using the `Response` class from `rest_framework.response`. ie: `return Response(data, status=status.HTTP_200_OK)`.