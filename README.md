# PayUp Monorepo

A monorepo for managing a user-centric financial application, built using Next.js, Prisma, and Turborepo.

## Getting Started

Follow the steps below to set up the project locally.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/vikas-yadav2002/PayUp
cd PayUp
```

### 2. Install Dependencies
Install all necessary dependencies for the monorepo:

```bash
npm install
```
### 3. Set Up PostgreSQL
You can run PostgreSQL either locally or using a cloud provider like Neon.tech. To run PostgreSQL locally with Docker, use the following command:

```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
### 4. Configure Environment Variables
Copy all the .env.example files to .env for each app and package:


# Copy .env.example to .env for all apps and packages
```bash
cp apps/*/.env.example apps/*/.env
cp packages/*/.env.example packages/*/.env
```
Then, update each .env file with the correct database URL and other required environment variables.

### 5. Run Database Migrations
Navigate to the packages/db folder and apply the Prisma migrations:

```bash
cd packages/db
npx prisma migrate dev
npx prisma db seed
```
This will set up your database schema and seed the initial data.

### 6. Start the Development Server
Now, navigate to the apps/user-app folder and start the development server:

```bash
cd apps/user-app
npm run dev
```

The development server should now be running at http://localhost:3001.

### 7. Login Information
Once the app is running, you can try logging in using the following credentials (this data is seeded by Prisma):
```bash
Phone: 1111111111
Password: alice
```
You can find this login information in the seed.ts file.
