Project Overview:
You will develop a comprehensive solution including detailed database schema design, backend services and implement a GraphQL API.
Functional Requirements:
Fighter profiles with detailed personal information, statistics, fight history (wins, losses, draws, knockouts, submissions, etc.).
Event management: location, date, participating fighters, and fight cards.
Individual fight records within events, detailing fighter matchups and results.
Dynamic fighter rankings within respective weight classes, updated based on a well-defined algorithm, after every fight. Ranking must work once final results of the fight are published and should happen in the background.

Technical Requirements:
Database & ORM:
Design a robust and relational Database schema in PostgreSQL.
Use TypeORM for all interaction and database schema handling.
Provide your database schema accompanied by:
ERD diagram (use draw.io, Lucidchart, DBDesigner, or similar tools).
SQL Create statements for database tables.
Backend API:
Develop a structured and clean NestJS application.
Follow CLEAN Architecture principles, clearly separating your layers (Database, Business Logic, Routing, Domain, etc.).
API implementation must include GraphQL endpoints for:
CRUD operations on Fighters, Fights, Events, and Rankings.
Retrieval of fighter statistics and fight histories.
List upcoming events and respective fight cards, including fighters and event details.
Ranking Algorithm:
Provide and implement a clearly documented and understandable ranking calculation algorithm. (A simplistic example):

Example Ranking Algorithm (simple points-based system):
Win via Knockout or Submission = 4 points - 
Win via Decision = 3 points - 
Draw = 1 point - 
Loss = 0 point - 
Total points determine overall rank within each weight class. - 
Tiebreakers can be resolved via win percentage or most recent activity.

Rankings must automatically and immediately update after the completion and recording of a fight result. NOTE: Ranking must happen in the background and user shouldn’t wait for it.

Development Standards and Best Practices we expect:
Clean, modular, and reusable codebase.
Strong separation of concerns, making use of NestJS modules.
Comprehensive and informative error handling.
Validation and sanitization of all incoming and outgoing data.
Clearly written API documentation and structured commit history.
Well-organized folder structure and code architecture.

Evaluation Criteria:
Solution Architecture: Are best practices in design and CLEAN Architecture principles strictly followed?
Quality of Code & Documentation: How readable, cleanly coded, modular, and maintainable is the provided solution?
Database Schema: Does it accurately model described relationships and meet functional requirements?
API Functionality and Performance: Does the GraphQL API provide the required functionality and perform efficiently?
Ranking Algorithm Implementation: Is the ranking logic well-defined, clearly documented, and straightforward to maintain?

Submission Guidelines:
When applying, please provide:
Entity Relationship Diagram (ERD) for your designed database.
SQL DDL scripts to create tables.
Full source code repository (link preferable via GitHub or GitLab).
Documented ranking algorithm (within your repository documentation).
Brief API usage documentation with examples.

Looking forward to reviewing your application!
