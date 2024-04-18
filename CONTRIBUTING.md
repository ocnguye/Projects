# CONTRIBUTING

## Running the Frontend

```bash
git clone https://github.com/AustinWheel/angel-trading-co.git
```

To run the app locally, you need to:

1. Set the required environment variables as shown in `./frontend/.env`.

2. `cd frontend`

3. `pnpm install` the required dependencies.

4. `npm run dev` to launch the development server.


## Running the Backend

1. Set the required environment variables for the backend as shown in `./backend/.env`.

2. Create a .venv, in VSCode you can do cmd + shift + p and search 'Python: Create Environment'

3. I think versions 3.9 + will work for this.

4. Go to the backend folder `cd backend`.

5. Run `python -m pip install -r requirements.txt`.

6. Run `python manage.py migrate` to perform the database migrations.

7. In your terminal run `python manage.py shell < scripts/upload_smiski.py`.

    This is to load in the valid smiski objects that we have.

8. In your terminal run `python manage.py shell < scripts/upload_featured.py`.

    This is to load in the valid featured objects that currently have we have.

9. Run `python manage.py runserver` to start the development server.


# Running the Chat Backend

1. Set the required environment variables for the chat backend as shown in `./chat_backend/.env`.

2. Go to the folder, `cd chat_backend`.

3. Run `npm install` to install all the dependencies, you should have node install btw.

4. To start the server run `npm run start`.

5. Congrats your backend and frontend are communicating like best buddies.

## Making Changes

So by now you should have both a frontend and backend up and running. 

1. First checkout a new branch where you will make your changes. You can run `git checkout -B feature/newFeature` to enter a new branch.

2. Make some changes:

    You can make changes to the frontend and those changes should automatically get updated by Vite and you can see what is happening.

    On the backend, if you make changes to a model, you will need to also run `python manage.py makemigrations`, this will generate the necessary database migrations inside of each apps 'migrations' folder. Now to apply those migrations locally you can run `python manage.py migrate` and those new attributes or tables will be generated.

    When adding dependecies to the frontend that should be done using the command `pnpm add {package}`

3. Test your changes and make sure everything is good. When you are ready to open a PR, run `git add [changes]` and then `git commit -m "Brief Description of Changes"` and then `git push origin feature/newFeature` to push your branch with new changes.

4. This will open a PR draft on github which you can go and review before publishing for review from the rest of the team before merging.

Good Luck ;)