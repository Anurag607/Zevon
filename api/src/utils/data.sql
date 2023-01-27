USE zevon;

INSERT INTO user (`user_id`, name, password, phone_number, email, user_type, token) VALUES (1, 'default', '12345', '1234567890', 'default@gamil.com', 'seller', '00010000001000001000');

INSERT INTO user_address (addr_id, `user_id`) VALUES (1, 1);

INSERT INTO seller (seller_id, addr_id) VALUES (1, 1);

INSERT INTO product (product_type, color, size, gender, `desc`, img_url, cost, quantity, seller_id) VALUES
('shirt', 'black', 's,m,l,xl,xxl', 'male', 'camp collared short sleeve', '/clothes/mens/shirts/camp_collared_short_sleeve_shirt.jpeg', 789.00, 6, 1),
('shirt', 'teal', 's,m,l,xl,xxl', 'male', 'chambray', '/clothes/mens/shirts/chambray.webp', 700.00, 6, 1),
('shirt', 'blue', 's,m,l,xl,xxl', 'male', 'denim shirt', '/clothes/mens/shirts/denim_shirt.webp', 459.00, 6, 1),
('shirt', 'blue', 's,m,l,xl,xxl', 'male', 'henley shirt', '/clothes/mens/shirts/henley_shirt.webp', 569.00, 6, 1),
('shirt', 'others', 's,m,l,xl,xxl', 'male', 'cuban collar shirt', '/clothes/mens/shirts/cuban_collar_shirt.webp', 889.00, 6, 1),
('shirt', 'black', 's,m,l,xl,xxl', 'male', 'plaid shirt', '/clothes/mens/shirts/plaid_shirt.webp', 689.00, 6, 1),
('shirt', 'blue', 's,m,l,xl,xxl', 'male', 'office shirt', '/clothes/mens/shirts/office_shirt.webp', 1089.00, 6, 1),
('shirt', 'orange', 's,m,l,xl,xxl', 'male', 'polo shirt', '/clothes/mens/shirts/polo_shirt.webp', 1129.00, 6, 1),
('shirt', 'others', 's,m,l,xl,xxl', 'male', 'rio shirt', '/clothes/mens/shirts/rio_shirt.webp', 1589.00, 0, 1),
('shirt', 'green', 's,m,l,xl,xxl', 'male', 'utility shirt', '/clothes/mens/shirts/utility_shirt.webp', 900.00, 6, 1),
('shirt', 'blue', 's,m,l,xl,xxl', 'male', 'flannel shirt', '/clothes/mens/shirts/flannel_shirt.jpg', 550.00, 6, 1),
('shirt', 'others', 's,m,l,xl,xxl', 'male', 'hawaiian shirt', '/clothes/mens/shirts/hawaiian_shirt.jpg', 1300.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'male', 'oxford button down shirt', '/clothes/mens/shirts/oxford_button_down_dress_shirt.jpg', 1479.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'male', 'tuxedo shirt', '/clothes/mens/shirts/tuxedo_shirt.jpg', 1135.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'male', 'mandarin collar shirt', '/clothes/mens/shirts/mandarin_collar_shirt.jpg', 1599.00, 6, 1),
('shirt', 'grey', 's,m,l,xl,xxl', 'male', 'linen shirt', '/clothes/mens/shirts/linen_shirt.jpg', 600.00, 6, 1),
('shoes', 'black', 's,m,l,xl', 'male', 'active sandals', '/clothes/mens/shoes/active_sandals.png', 489.00, 6, 1),
('shoes', 'grey', 's,m,l,xl', 'male', 'active sneakers', '/clothes/mens/shoes/active_sneakers.png', 799.00, 6, 1),
('shoes', 'grey', 's,m,l,xl', 'male', 'at home slippers', '/clothes/mens/shoes/at_home_slippers.png', 375.00, 6, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'casual lace up sneakers', '/clothes/mens/shoes/casual_lace_up_sneakers.png', 450.00, 6, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'casual slip on shoes', '/clothes/mens/shoes/casual_slip_on_shoes.png', 600.00, 6, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'chukkas', '/clothes/mens/shoes/chukkas.png', 889.00, 6, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'loafers', '/clothes/mens/shoes/loafers.png', 1299.00, 0, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'moccasins', '/clothes/mens/shoes/moccasins.png', 829.00, 6, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'oxfords', '/clothes/mens/shoes/oxfords.png', 535.00, 6, 1),
('shoes', 'brown', 's,m,l,xl', 'male', 'slide sandals', '/clothes/mens/shoes/slide_sandals.png', 300.00, 6, 1),
('shoes', 'black', 's,m,l,xl', 'male', 'toe post slippers', '/clothes/mens/shoes/toe_post_sandals.png', 175.00, 6, 1),
('shoes', 'grey', 's,m,l,xl', 'male', 'walking shoes', '/clothes/mens/shoes/walking_shoes.png', 520.00, 6, 1),
('lowers', 'brown', 's,m,l,xl,xxl', 'male', 'cargo pants', '/clothes/mens/lowers/cargo_pants.webp', 720.00, 6, 1),
('lowers', 'grey', 's,m,l,xl,xxl', 'male', 'chinos', '/clothes/mens/lowers/chinos.webp', 1250.00, 6, 1),
('lowers', 'blue', 's,m,l,xl,xxl', 'male', 'drawstring pants', '/clothes/mens/lowers/drawstring_pants.webp', 659.00, 6, 1),
('lowers', 'brown', 's,m,l,xl,xxl', 'male', 'khakis', '/clothes/mens/lowers/khakis.webp', 869.00, 6, 1),
('lowers', 'blue', 's,m,l,xl,xxl', 'male', 'pajamas', '/clothes/mens/lowers/pajamas.webp', 500.00, 6, 1),
('lowers', 'brown', 's,m,l,xl,xxl', 'male', 'sweatpants', '/clothes/mens/lowers/sweatpants.webp', 1055.00, 6, 1),
('lowers', 'brown', 's,m,l,xl,xxl', 'male', 'trousers', '/clothes/mens/lowers/trousers.webp', 1559.00, 6, 1),
('lowers', 'blue', 's,m,l,xl,xxl', 'male', 'jeans', '/clothes/mens/lowers/jeans.webp', 800.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'female', 'knot croped t shirt', '/clothes/women/shirts/knot_croped_t_shirt.jpeg', 779.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'female', 'cold shoulder t shirt', '/clothes/women/shirts/cold_shoulder_t_shirt.jpg', 1239.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'female', 'collared t shirt', '/clothes/women/shirts/collared_t_shirt.jpg', 859.00, 6, 1),
('shirt', 'white', 's,m,l,xl,xxl', 'female', 'graphic t shirt', '/clothes/women/shirts/graphic_t_shirt.jpg', 1035.00, 6, 1),
('shirt', 'brown', 's,m,l,xl,xxl', 'female', 'henley t shirt', '/clothes/women/shirts/henley_t_shirt.jpg', 1100.00, 6, 1),
('shirt', 'blue', 's,m,l,xl,xxl', 'female', 'oversized t shirt', '/clothes/women/shirts/oversized_t_shirt.jpg', 500.00, 6, 1),
('shirt', 'others', 's,m,l,xl,xxl', 'female', 'striped t shirt', '/clothes/women/shirts/striped_t_shirt.jpg', 625.00, 6, 1),
('shirt', 'black', 's,m,l,xl,xxl', 'female', 'half high neck t shirt', '/clothes/women/shirts/half_high_neck_t_shirt.jpg', 779.00, 6, 1),
('shirt', 'black', 's,m,l,xl,xxl', 'female', 'high neck t shirt', '/clothes/women/shirts/high_neck_t_shirt.jpg', 835.00, 6, 1),
('shirt', 'green', 's,m,l,xl,xxl', 'female', 'round neck t shirt', '/clothes/women/shirts/round_neck_t_shirt.jpg', 650.00, 6, 1),
('shirt', 'blue', 's,m,l,xl,xxl', 'female', 'v neck t shirt', '/clothes/women/shirts/v_neck_t_shirt.jpg', 700.00, 6, 1),
('lowers', 'blue', 's,m,l,xl,xxl', 'female', 'dungarees', '/clothes/women/lowers/dungarees.webp', 1020.00, 6, 1),
('lowers', 'blue', 's,m,l,xl,xxl', 'female', 'jeans', '/clothes/women/lowers/jeans.webp', 750.00, 6, 1),
('lowers', 'red', 's,m,l,xl,xxl', 'female', 'cropped pants', '/clothes/women/lowers/cropped_pants.webp', 850.00, 6, 1),
('lowers', 'orange', 's,m,l,xl,xxl', 'female', 'bell bottoms', '/clothes/women/lowers/bell_bottoms.jpg', 900.00, 6, 1),
('lowers', 'white', 's,m,l,xl,xxl', 'female', 'cargo pants', '/clothes/women/lowers/cargo_pants.jpg', 700.00, 6, 1),
('lowers', 'orange', 's,m,l,xl,xxl', 'female', 'culottes', '/clothes/women/lowers/cullotes.jpg', 1355.00, 6, 1),
('lowers', 'black', 's,m,l,xl,xxl', 'female', 'dress pants', '/clothes/women/lowers/dress_pants.jpg', 1200.00, 6, 1),
('lowers', 'orange', 's,m,l,xl,xxl', 'female', 'eastern pants', '/clothes/women/lowers/eastern_pants.jpg', 679.00, 6, 1),
('lowers', 'others', 's,m,l,xl,xxl', 'female', 'fatigue trousers', '/clothes/women/lowers/fatigue_trousers.jpg', 1075.00, 6, 1),
('lowers', 'others', 's,m,l,xl,xxl', 'female', 'harem pants', '/clothes/women/lowers/harem_pants.jpg', 650.00, 6, 1),
('lowers', 'brown', 's,m,l,xl,xxl', 'female', 'jodhpur pants', '/clothes/women/lowers/jodhpur_pants.jpg', 1200.00, 6, 1),
('lowers', 'green', 's,m,l,xl,xxl', 'female', 'jumpsuit', '/clothes/women/lowers/jumpsuit.jpg', 1500.00, 6, 1),
('lowers', 'black', 's,m,l,xl,xxl', 'female', 'leggings', '/clothes/women/lowers/leggings.jpg', 700.00, 6, 1),
('lowers', 'orange', 's,m,l,xl,xxl', 'female', 'peg leg pants', '/clothes/women/lowers/peg_leg_pants.jpg', 850.00, 6, 1),
('lowers', 'orange', 's,m,l,xl,xxl', 'female', 'stirrup pants', '/clothes/women/lowers/stirrup_pants.jpg', 900.00, 6, 1),
('shoes', 'red', 's,m,l', 'female', 'ankle boots', '/clothes/women/shoes/ankle_boots.webp', 1020.00, 6, 1),
('shoes', 'black', 's,m,l', 'female', 'ballerina boots', '/clothes/women/shoes/ballerina_flats.webp', 920.00, 6, 1),
('shoes', 'black', 's,m,l', 'female', 'chelsea boots', '/clothes/women/shoes/chelsea_boots.webp', 650.00, 6, 1),
('shoes', 'black', 's,m,l', 'female', 'clogs', '/clothes/women/shoes/clogs.webp', 700.00, 6, 1),
('shoes', 'black', 's,m,l', 'female', 'conbats_boots', '/clothes/women/shoes/combat_boots.webp', 800.00, 6, 1),
('shoes', 'brown', 's,m,l', 'female', 'ankle boots', '/clothes/women/shoes/cowboy_boots.webp', 750.00, 6, 1),
('shoes', 'white', 's,m,l', 'female', 'ankle boots', '/clothes/women/shoes/dorsay_shoes.webp', 1200.00, 6, 1),
('shoes', 'grey', 's,m,l', 'female', 'ankle boots', '/clothes/women/shoes/double_strap_mary_janes.webp', 885.00, 6, 1),
('shoes', 'pink', 's,m,l', 'female', 'ankle boots', '/clothes/women/shoes/espadrilles.webp', 775.00, 1);