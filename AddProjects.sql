INSERT INTO Projects (title, imgSrc, code, projectLink, description, modalContent)
VALUES ('H.D.F.Player', 'project-imgs/Hdfplayer.png', 'https://github.com/AJ4200/H.D.F.Player', 'https://h-d-f-player.vercel.app/', 'Web browser emulator that lets you play flash, html5, and jsdos games in your browser', 'H.D.F.Player is a cutting-edge web browser emulator designed to provide users with a seamless gaming experience. With the ability to play a wide range of games, including flash, html5, and jsdos, directly in your browser, H.D.F.Player revolutionizes the way you enjoy gaming. Say goodbye to the hassle of downloading and installing multiple game clients or plugins – H.D.F.Player eliminates the need for additional software by offering a comprehensive platform that supports various game formats. Whether you%apos;re a fan of classic flash games, modern html5 titles, or nostalgic jsdos gems, H.D.F.Player has got you covered. Immerse yourself in a world of endless gaming possibilities with H.D.F.Player, where convenience meets entertainment.');
 -- Get the id of the project we just inserted
SELECT id FROM Projects WHERE title = 'H.D.F.Player';
 -- Assume the id is 1
INSERT INTO Technologies (project_id, tech)
VALUES 
(5, 'Nextjs'),
(5, 'Ruffle'),
(5, 'jsDOS'),
(5, 'HTML5');