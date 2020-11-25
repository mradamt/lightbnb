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
  "active" BOOLEAN,
  "title" TEXT,
  "description" TEXT,
  "costpernight" INTEGER,
  "parking_spaces" INTEGER,
  "numberofbathrooms" INTEGER,
  "numberofbedrooms" INTEGER,
  "street_name_number" VARCHAR(255),
  "city" VARCHAR(255),
  "post_code" VARCHAR(10),
  "province_id" INTEGER REFERENCES provinces(id),
  "country_id" INTEGER REFERENCES countries(id),
  "thumbnail_url" VARCHAR(255),
  "coverphoto_url" VARCHAR(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "reservations" (
  "id" SERIAL,
  "user_id" INTEGER REFERENCES users(id),
  "property_id" INTEGER REFERENCES properties(id),
  "start_date" DATE,
  "end_date" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "property_reviews" (
  "id" SERIAL,
  "user_id" INTEGER REFERENCES users(id),
  "reservation_id" INTEGER REFERENCES reservtations(id),
  "message" TEXT,
  "rating" INTEGER,
  "property_id" INTEGER REFERENCES properties(id),
  PRIMARY KEY ("id")
);

CREATE TABLE "provinces" (
  "id" SERIAL,
  "province" VARCHAR(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "countries" (
  "id" SERIAL,
  "country" VARCHAR(255),
  PRIMARY KEY ("id")
);

