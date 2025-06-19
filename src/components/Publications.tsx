import React, { useState } from 'react';
import { BookOpen, ExternalLink, Calendar, Users, Filter, Loader2, AlertCircle } from 'lucide-react';
import { usePublications } from '../hooks/usePublications';
import { useCategories } from '../hooks/useCategories';

const Publications = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { publications, loading: publicationsLoading, error: publicationsError } = usePublications({
    category: selectedCategory
  });
  
  const { categories, loading: categoriesLoading } = useCategories();

  const formatDate = (year: number | null | undefined) => {
    return year ? year.toString() : 'N/A';
  };

  const getCategoryColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      'Artificial Intelligence': 'bg-purple-100 text-purple-800',
      'Quantum Computing': 'bg-blue-100 text-blue-800',
      'Climate Science': 'bg-green-100 text-green-800',
      'Robotics': 'bg-orange-100 text-orange-800',
      'Biotechnology': 'bg-pink-100 text-pink-800',
      'Energy Systems': 'bg-yellow-100 text-yellow-800'
    };
    return colors[categoryName] || 'bg-gray-100 text-gray-800';
  };

  if (publicationsError) {
    return (
      <section id="publications" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Publications</h2>
            <p className="text-gray-600 mb-8">
              We're having trouble connecting to our database. Please make sure your PostgreSQL server is running and your connection settings are correct.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Troubleshooting:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Check your PostgreSQL server status and credentials in the <code>.env</code> file.</li>
                <li>Ensure the database tables are created (see migration SQL files).</li>
                <li>Restart the development server after updating environment variables.</li>
                <li>Check the server logs for detailed error messages.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="publications" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Publications & Research
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our researchers publish in top-tier journals and conferences, 
              contributing to the global body of scientific knowledge.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by Research Area:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Publications
              </button>
              {categoriesLoading ? (
                <div className="flex items-center gap-2 px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-gray-500">Loading categories...</span>
                </div>
              ) : (
                categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.slug
                        ? 'bg-blue-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Publications List */}
          {publicationsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading publications...</p>
              </div>
            </div>
          ) : publications.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Publications Found</h3>
              <p className="text-gray-600 mb-8">
                {selectedCategory === 'all' 
                  ? 'No publications have been added yet.' 
                  : `No publications found in the selected category.`
                }
              </p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Publications
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {publications.map((publication) => (
                <div
                  key={publication.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      {/* Publication Type & Year */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {publication.publication_type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(publication.publication_year)}
                        </span>
                        {publication.research_categories && (
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(publication.research_categories.name)}`}>
                            {publication.research_categories.name}
                          </span>
                        )}
                        {publication.is_featured && (
                          <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {publication.title}
                      </h3>

                      {/* Authors */}
                      {publication.publication_authors && publication.publication_authors.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-600 text-sm">
                            {publication.publication_authors
                              .sort((a, b) => a.author_order - b.author_order)
                              .map(pa => pa.authors.name)
                              .join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Journal */}
                      {publication.journal && (
                        <p className="text-blue-700 font-medium mb-3">
                          {publication.journal}
                        </p>
                      )}

                      {/* Abstract */}
                      {publication.abstract && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {publication.abstract}
                        </p>
                      )}

                      {/* DOI */}
                      {publication.doi && (
                        <p className="text-xs text-gray-500 mb-2">
                          DOI: {publication.doi}
                        </p>
                      )}
                    </div>

                    {/* Stats & Actions */}
                    <div className="lg:text-right">
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {publication.citations}
                        </div>
                        <div className="text-sm text-gray-600">Citations</div>
                      </div>
                      
                      <div className="flex lg:flex-col gap-2">
                        {publication.pdf_url && (
                          <a
                            href={publication.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors group/btn"
                          >
                            View PDF
                            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        )}
                        <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors group/btn">
                          View Details
                          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Admin Panel Link */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Publications</h3>
              <p className="text-gray-600 mb-6">
                Add, edit, and organize research publications through our admin interface.
              </p>
              <a
                href="/admin/publications"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open Admin Panel
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;