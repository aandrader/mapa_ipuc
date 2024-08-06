CREATE TABLE temples (
    id SERIAL PRIMARY KEY,
    congregacion VARCHAR(255),
    distrito INTEGER,
    municipio VARCHAR(255),
    coordenadas decimal[],
    facebook VARCHAR(255),
    youtube VARCHAR(255),
    pagina VARCHAR(255),
    horarios JSON -- Esto almacenará un array de textos, ajusta según sea necesario
);

INSERT INTO temples (congregacion, distrito, municipio, coordenadas, facebook, youtube, pagina, horarios) 
VALUES 
('Iglesia Central', 1, 'San Salvador', '{13.7034, -89.2182}', 'facebook.com/iglesiacentral', 'youtube.com/iglesiacentral', 'iglesiacentral.org', '{"lunes": "8:00-17:00", "domingo": "9:00-12:00"}'),
('Iglesia San Juan', 2, 'Santa Ana', '{13.9906, -89.5606}', 'facebook.com/iglesiasanjuan', 'youtube.com/iglesiasanjuan', 'iglesiasanjuan.org', '{"martes": "8:00-17:00", "domingo": "10:00-13:00"}'),
('Iglesia El Redentor', 3, 'San Miguel', '{13.4811, -88.1914}', 'facebook.com/iglesiaelredentor', 'youtube.com/iglesiaelredentor', 'iglesiaelredentor.org', '{"miércoles": "8:00-17:00", "domingo": "11:00-14:00"}'),
('Iglesia La Esperanza', 1, 'San Salvador', '{13.7054, -89.2201}', 'facebook.com/iglesialapesanza', 'youtube.com/iglesialapesanza', 'iglesialapesanza.org', '{"jueves": "8:00-17:00", "domingo": "8:00-11:00"}'),
('Iglesia Cristo Rey', 4, 'La Paz', '{13.7872, -89.3218}', 'facebook.com/iglesiacristorey', 'youtube.com/iglesiacristorey', 'iglesiacristorey.org', '{"viernes": "8:00-17:00", "domingo": "9:00-12:00"}');
