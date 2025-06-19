-- Create research_categories table
CREATE TABLE research_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create authors table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    institution VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create publications table
CREATE TABLE publications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    abstract TEXT,
    journal VARCHAR(255),
    publication_year INTEGER NOT NULL,
    publication_type VARCHAR(50) NOT NULL,
    doi VARCHAR(255),
    pdf_url TEXT,
    citations INTEGER DEFAULT 0,
    category_id UUID REFERENCES research_categories(id),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create publication_authors table (junction table for many-to-many relationship)
CREATE TABLE publication_authors (
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    author_order INTEGER NOT NULL,
    PRIMARY KEY (publication_id, author_id)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_publications_updated_at
    BEFORE UPDATE ON publications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_categories_updated_at
    BEFORE UPDATE ON research_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 