const db = require('./dbIndex');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(`
  SELECT id, name, email, password
  FROM users
  WHERE email=$1
  `, [email])
  .then(res => res.rows[0])
  .catch(err => null)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(`
  SELECT id, name, email, password
  FROM users
  WHERE id=$1
  `, [id])
  .then(res => res.rows[0])
  .catch(err => null)
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return db.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => null)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
`, [guest_id, limit])
.then(res => res.rows)
.catch(err => null)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id=property_id
  `;

  // Check for city 
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  };

  // FOR NEXT 3 CONDITIONALS choose (AND || WHERE) based on prev params being (value || blank)
  // 1. Check for owner_id -- owner is viewing their own listings
  if (options.owner_id) {
    queryString += ` ${queryParams.length ? 'AND' : 'WHERE'} `
    queryParams.push(`${options.owner_id}`);
    queryString += `owner_id = $${queryParams.length}`;
  };

  // 2. Check for min_price ($ -> cents  =>  min_price*100)
  if (options.minimum_price_per_night) {
    queryString += ` ${queryParams.length ? 'AND' : 'WHERE'} `
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `cost_per_night >= $${queryParams.length}`;
  };

  // 3. Check for max_price ($ -> cents  =>  max_price*100)
   if (options.maximum_price_per_night) {
    queryString += ` ${queryParams.length ? 'AND' : 'WHERE'} `
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `cost_per_night <= $${queryParams.length}`;
  };

  // Add GROUP BY clause because this is where it fits
  queryString += `
    GROUP BY properties.id`

  // Check for avg_rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
      HAVING avg(rating) >= $${queryParams.length}`;
  };
  
  // Finalize queryString and queryParams
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length}`;

  // Return result of DB call using constructed string, params
  return db.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  })
  .catch(err => err);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return db.query(`
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms, 
      number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night * 100, // multiply by 100 to insert $ as cents
      property.street,
      property.city,
      property.province,
      property.post_code,
      property.country,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms])
  .then(res => res.rows[0])
  .catch(err => err)
}
exports.addProperty = addProperty;
