DROP TABLE users;
DROP TABLE properties;
DROP TABLE reservations;
DROP TABLE property_reviews;


-- CREATE TABLEs in order of least dependent to most dependent
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "password" VARCHAR(255)
);

CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" INTEGER REFERENCES users(id),
  "title" TEXT,
  "description" TEXT,
  "thumbnail_url" VARCHAR(255),
  "coverphoto_url" VARCHAR(255),
  "cost_per_night" INTEGER,
  "parking_spaces" INTEGER,
  "number_of_bathrooms" INTEGER,
  "number_of_bedrooms" INTEGER,
  "country" VARCHAR(255),
  "street" VARCHAR(255),
  "city" VARCHAR(255),
  "province" VARCHAR(255),
  "post_code" VARCHAR(255),
  "active" BOOLEAN
);

CREATE TABLE "reservations" (
  "id" SERIAL PRIMARY KEY,
  "start_date" DATE,
  "end_date" DATE,
  "guest_id" INTEGER REFERENCES users(id),
  "property_id" INTEGER REFERENCES properties(id)
);

CREATE TABLE "property_reviews" (
  "id" SERIAL PRIMARY KEY,
  "guest_id" INTEGER REFERENCES users(id),
  "property_id" INTEGER REFERENCES properties(id),
  "reservation_id" INTEGER REFERENCES reservations(id),
  "rating" SMALLINT,
  "message" TEXT
);

