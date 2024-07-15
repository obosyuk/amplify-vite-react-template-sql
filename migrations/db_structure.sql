CREATE TYPE valid_stages AS ENUM ('Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed_Won', 'Closed_Lost');


-- Customer Table
CREATE TABLE Customer (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
    --INDEX idx_customer_name_email (name, email)
);

-- Secondary Index on Customer
-- CREATE INDEX idx_customer_name_email ON Customer (name, email);



-- Opportunity Table
CREATE TABLE Opportunity (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stage valid_stages NOT NULL,
    amount INT NOT NULL,
    closeDate DATE,
    accountId VARCHAR(255) NOT NULL,
    customerId INT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customer(id)
);

-- Secondary Index on Opportunity
-- CREATE INDEX idx_opportunity_accountId_name ON Opportunity (accountId, name);


