INSERT INTO Projects (title, imgSrc, code, projectLink, description, modalContent)
VALUES ('Portyfolio', 'project-imgs/Portyfolio.png', 'https://github.com/AJ4200/Portyfolio', 'https://portyfolio.vercel.app', 'I designed and built this website from so that one can present their resume visually. It was a birthday gift to myself', '<p>\nPortyfolio is a website that helps job seekers create an online portfolio to showcase their skills, experience, and achievements in a visually appealing way. The platform offers customizable templates and designs, allowing users to create a unique and professional-looking portfolio that reflects their personality and style. Users can add their work experience, education, skills, projects, and multimedia content to bring their portfolio to life. The platform's user-friendly interface makes it easy to edit and update the portfolio, ensuring it stays current and relevant as the user progresses in their career.\n</p>\n<p>\nPortyfolio is suitable for both recent graduates looking for their first job and experienced professionals seeking to switch careers. With the platform's visually-driven format and customizable templates, users can stand out in a crowded job market and create a compelling online brand. By signing up for Portyfolio, job seekers can take the first step towards landing their dream job by showcasing their talents and experience in a unique and creative way.\n</p>');
 -- Get the id of the project we just inserted
SELECT id FROM Projects WHERE title = 'Portyfolio';
 -- Assume the id is 1
INSERT INTO Technologies (project_id, tech)
VALUES 
(1, 'Nodejs(Next)'),
(1, 'Ruby On Rails'),
(1, 'PostgreSQL'),
(1, 'Express'),
(1, 'Axios');