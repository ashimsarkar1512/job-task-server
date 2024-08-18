
 Features

Product Listing API: Retrieve products with support for filtering by brand, category, price range, and search queries.
Sorting: Sort products by price (ascending or descending).
Pagination: Navigate through pages of products with pagination support.
Environment Variables: Securely manage database credentials and other configuration settings using environment variables.

Technologies Used

Node.js: JavaScript runtime for server-side programming.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for storing product data.
dotenv: Module to load environment variables from a `.env` file.


git clone github link
cd products-api-backend
npm install
PORT=5000
DB_USER=yourMongoDBUsername
DB_PASS=yourMongoDBPassword
