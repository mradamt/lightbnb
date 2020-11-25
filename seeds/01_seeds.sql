INSERT INTO users (name,email,password) VALUES 
('Bobson Twobit','bobsont@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Hilbilly Thomson','hthomson@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Zinger Shmitz','zshmitz@webs.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Danger Robinson','dangerrobs@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Bazoo Zapow','bazoozapow@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_url, coverphoto_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES 
  ('1','FreakyFriday Mansion','description','thumbnail_url','coverphoto_url','100','2','2','5','Fakestan','Baloo ST','Zaboing','NS','a1a1a1'), 
  ('2','Hillbillers','description','thumbnail_url','coverphoto_url','80','0','1','1','Alsofakestan','Brandle Rd','Whoooozit','BA','c1b1c2'),
  ('3','Zingers place','description','thumbnail_url','coverphoto_url','40','2','3','3','Alsofakestan','Stamps Rd','Whoooozit','BA','b1b1a1');

INSERT INTO reservations (start_date,end_date,guest_id,property_id) VALUES 
  ('2020-10-01','2020-10-05','2','1'), 
  ('2020-10-21','2020-10-25','4','2'), 
  ('2020-12-26','2020-12-29','5','3');

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message) VALUES 
  ('2','1','1','5','FREAKY FRIDAY MANSION IS GREAT'), 
  ('4','2','2','4','Hillbillerssssgreat'),
  ('5','3','2','2','Zingers place is a mingers place');


