CREATE TABLE "users" (
  "id" SERIAL,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "properties" (
  "id" SERIAL,
  "user_id" INTEGER REFERENCES users(id),
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
  "active" BOOLEAN,
  PRIMARY KEY ("id")
);

CREATE TABLE "reservations" (
  "id" SERIAL,
  "start_date" DATE,
  "end_date" DATE,
  "user_id" INTEGER REFERENCES users(id),
  "property_id" INTEGER REFERENCES properties(id),
  PRIMARY KEY ("id")
);

CREATE TABLE "property_reviews" (
  "id" SERIAL,
  "user_id" INTEGER REFERENCES users(id),
  "property_id" INTEGER REFERENCES properties(id),
  "reservation_id" INTEGER REFERENCES reservtations(id),
  "rating" SMALLINT,
  "message" TEXT,
  PRIMARY KEY ("id")
);

